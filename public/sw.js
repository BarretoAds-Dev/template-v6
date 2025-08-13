/*
===============================================================================
🛰️  SERVICE WORKER v4 (EDICIÓN PROFESIONAL) – COMPLETO
===============================================================================
Integra:
- Router declarativo con condiciones robustas.
- Estrategias: SWR (HTML), CacheFirst (Assets), NetworkFirst (API).
- Gestión de límites de caché (LRU) y limpieza proactiva.
- Deduplicación de peticiones fetch para optimizar la red.
- Monitoreo de rendimiento (hit rate, errores) con PerformanceTracker.
- Error handling granular para diagnóstico.
- Validación de respuestas antes de cachear (previene cache poisoning).
- Actualizaciones condicionales de caché (ETag + Last-Modified).
- Soporte para PeriodicSync para mantenimiento en background.
- Manifiesto de precaché flexible (inyectado en build).
===============================================================================
*/

// --- CONFIGURACIÓN Y CONSTANTES ---

const scopeUrl = new URL(self.registration?.scope || self.location.origin);
// La versión se inyecta desde el script de registro. Fallback a 'dev' para desarrollo local.
const SW_VERSION = `vt-swr-v4.0-${scopeUrl.searchParams.get('v') || 'dev'}`;
const CACHE_PREFIX = 'vt-cache';

const CACHES = {
  pages: `${CACHE_PREFIX}-pages-${SW_VERSION}`,
  assets: `${CACHE_PREFIX}-assets-${SW_VERSION}`,
  images: `${CACHE_PREFIX}-images-${SW_VERSION}`,
  api: `${CACHE_PREFIX}-api-${SW_VERSION}`,
};

// REFINAMIENTO: El manifest se inyecta en el build. Esto es un fallback.
const PRECACHE_ASSETS = self.__PRECACHE_MANIFEST || [
  '/',
  '/offline.html',
  '/favicon.svg',
];

const CACHE_LIMITS = {
  pages: 50,
  assets: 200,
  images: 100,
  api: 30
};

const TTL = {
  page: 24 * 60 * 60 * 1000,           // 1 día para páginas (SWR)
  asset: 30 * 24 * 60 * 60 * 1000,    // 30 días para assets
  image: 7 * 24 * 60 * 60 * 1000,     // 7 días para imágenes
  api: 5 * 60 * 1000,                 // 5 minutos para respuestas de API
  prefetch: 10 * 60 * 1000            // 10 min para prefetch de páginas
};

// --- MONITOREO Y OPTIMIZACIÓN ---

class PerformanceTracker {
  constructor() {
    this.metrics = { cacheHits: 0, cacheMisses: 0, networkFallbacks: 0, errors: 0 };
  }
  track(type) {
    this.metrics[type]++;
    // Notifica al cliente periódicamente para diagnóstico.
    if ((this.metrics.cacheHits + this.metrics.cacheMisses) > 0 && (this.metrics.cacheHits + this.metrics.cacheMisses) % 50 === 0) {
      const hitRate = this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses);
      broadcastMessage({ type: 'SW_PERFORMANCE', hitRate, ...this.metrics });
    }
  }
}
const tracker = new PerformanceTracker();

const pendingRequests = new Map();
function fetchWithDedup(request) {
  const key = `${request.method}:${request.url}`;
  if (pendingRequests.has(key)) return pendingRequests.get(key).then(r => r.clone());
  const p = fetch(request)
    .then(res => { pendingRequests.delete(key); return res; })
    .catch(err => { pendingRequests.delete(key); throw err; });
  pendingRequests.set(key, p);
  return p.then(r => r.clone());
}

// --- UTILIDADES DE CACHÉ Y RED ---

async function putWithTimestamp(cache, request, response) {
  if (response.headers.has('set-cookie')) return; // no cache auth/set-cookie
  const headers = new Headers(response.headers);
  headers.set('x-sw-cache-time', String(Date.now()));
  const body = await response.clone().arrayBuffer();
  await cache.put(request, new Response(body, { status: response.status, statusText: response.statusText, headers }));
}

function isExpired(response, maxAgeMs) {
  if (!response) return true;
  const ts = Number(response.headers.get('x-sw-cache-time') || 0);
  return (Date.now() - ts) > maxAgeMs;
}

async function broadcastMessage(data) {
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(client => client.postMessage({ source: 'sw', ...data }));
}

async function enforceCacheLimit(cacheName, limit) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= limit) return;

  const entries = await Promise.all(
    keys.map(async key => {
      const res = await cache.match(key);
      const timestamp = Number(res?.headers.get('x-sw-cache-time') || 0);
      return { key, timestamp };
    })
  );

  entries.sort((a, b) => a.timestamp - b.timestamp);
  const toDelete = entries.slice(0, entries.length - limit);
  await Promise.all(toDelete.map(entry => cache.delete(entry.key)));
}

function handleNetworkError(error, request, fallbackResponse) {
  const errorType = error.name === 'TypeError' ? 'network' : error.name === 'AbortError' ? 'timeout' : 'unknown';
  tracker.track('errors');
  broadcastMessage({ type: 'SW_ERROR', error: errorType, url: request.url });
  return fallbackResponse;
}

function isValidToCache(response, expectedType = '') {
  if (!response || !response.ok || response.status === 206) return false;
  if (expectedType && !response.headers.get('Content-Type')?.includes(expectedType)) return false;
  return true;
}

async function shouldUpdateCache(cachedResponse, networkResponse) {
  if (!cachedResponse) return true;
  const cachedETag = cachedResponse.headers.get('etag');
  const networkETag = networkResponse.headers.get('etag');
  const cachedLastModified = cachedResponse.headers.get('last-modified');
  const networkLastModified = networkResponse.headers.get('last-modified');

  if (cachedETag && networkETag) return cachedETag !== networkETag;
  if (cachedLastModified && networkLastModified) return cachedLastModified !== networkLastModified;
  
  // Fallback: comparar tamaños si no hay cabeceras fiables
  const cachedSize = cachedResponse.headers.get('content-length');
  const networkSize = networkResponse.headers.get('content-length');
  if (cachedSize && networkSize) return cachedSize !== networkSize;

  return true; // Asumir que hay que actualizar si no podemos comparar
}

// --- MANEJADORES DE ESTRATEGIA (ROUTER) ---

async function handleNavigationRequest({ event, request }) {
  const cache = await caches.open(CACHES.pages);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) tracker.track('cacheHits');
  else tracker.track('cacheMisses');

  const preloadPromise = event.preloadResponse ? event.preloadResponse.catch(() => undefined) : Promise.resolve(undefined);
  const networkPromise = (async () => {
    try {
      const preloadResponse = await preloadPromise;
      const networkResponse = preloadResponse || await fetchWithDedup(request);
      if (isValidToCache(networkResponse, 'text/html')) {
        if (await shouldUpdateCache(cachedResponse, networkResponse)) {
          event.waitUntil(putWithTimestamp(cache, request, networkResponse.clone()));
          broadcastMessage({ type: 'PAGE_UPDATED', url: request.url });
        }
      }
      return networkResponse;
    } catch (error) {
      tracker.track('networkFallbacks');
      return handleNetworkError(error, request);
    }
  })();

  if (cachedResponse && !isExpired(cachedResponse, TTL.page)) {
    // Vincula también el preload para evitar el warning de cancelación
    event.waitUntil(Promise.allSettled([networkPromise, preloadPromise]));
    return cachedResponse;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;
  
  if (cachedResponse) return cachedResponse; // Devolver el expirado si la red falló

  const offlinePage = await caches.match('/offline.html');
  if (offlinePage) return offlinePage;

  return new Response("Estás sin conexión y no hay contenido disponible.", { status: 503, headers: { 'Content-Type': 'text/html' } });
}

async function handleAssetRequest({ request }) {
  const url = new URL(request.url);
  const isImg = request.destination === 'image';
  const cache = await caches.open(isImg ? CACHES.images : CACHES.assets);
  const maxAge = isImg ? TTL.image : TTL.asset;

  const cachedResponse = await cache.match(request);
  if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
    tracker.track('cacheHits');
    return cachedResponse;
  }
  tracker.track('cacheMisses');

  try {
    const networkResponse = await fetchWithDedup(request);
    if (isValidToCache(networkResponse)) {
      await putWithTimestamp(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    tracker.track('networkFallbacks');
    if (cachedResponse) return cachedResponse; // Devolver expirado si la red falla
    if (isImg) {
      const placeholder = await caches.match('/images/placeholder.svg');
      if (placeholder) return placeholder;
    }
    return handleNetworkError(error, request, Response.error());
  }
}

async function handleApiRequest({ request }) {
  const cache = await caches.open(CACHES.api);
  
  try {
    const networkResponse = await fetchWithDedup(request);
    if (isValidToCache(networkResponse)) {
      await putWithTimestamp(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    tracker.track('networkFallbacks');
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isExpired(cachedResponse, TTL.api)) {
      tracker.track('cacheHits');
      return cachedResponse;
    }
    return handleNetworkError(error, request, new Response(JSON.stringify({ error: 'offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
}

async function handlePrefetchRequest({ request }) {
    const cache = await caches.open(CACHES.pages);
    const cached = await cache.match(request);
    if (cached && !isExpired(cached, TTL.prefetch)) return cached;
    try {
        const resp = await fetchWithDedup(request);
        if (isValidToCache(resp)) await putWithTimestamp(cache, request, resp.clone());
        return resp;
    } catch {
        return cached || Response.error();
    }
}


// --- ROUTER Y EVENT LISTENERS PRINCIPALES ---

const routes = [
  { name: 'prefetch', condition: req => (req.headers.get('Purpose') || req.headers.get('purpose'))?.toLowerCase() === 'prefetch', handler: handlePrefetchRequest },
  { name: 'navigation', condition: req => req.mode === 'navigate', handler: handleNavigationRequest },
  { name: 'api', condition: req => new URL(req.url).pathname.startsWith('/api/'), handler: handleApiRequest },
  { name: 'assets', condition: req => ['style', 'script', 'font', 'image'].includes(req.destination), handler: handleAssetRequest }
];

self.addEventListener('fetch', (event) => {
  if (new URL(event.request.url).origin !== self.location.origin) return;

  const { request } = event;
  const route = routes.find(r => r.condition(request));
  
  if (route) {
    event.respondWith(route.handler({ event, request }));
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHES.pages);
      const tasks = PRECACHE_ASSETS.map(async (url) => {
        try {
          const req = new Request(url, { cache: 'reload' });
          const resp = await fetch(req);
          if (resp && resp.ok) await cache.put(req, resp.clone());
        } catch {}
      });
      await Promise.allSettled(tasks);
    } finally {
      await self.skipWaiting();
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // 1. Limpieza de cachés de versiones antiguas
    const keys = await caches.keys();
    await Promise.all(keys.map(key => {
      if (!Object.values(CACHES).includes(key) && key.startsWith(CACHE_PREFIX)) {
        return caches.delete(key);
      }
    }));
    
    // 2. Aplicar límites de tamaño a los cachés activos
    await Promise.all(Object.entries(CACHE_LIMITS).map(([cacheKey, limit]) => 
      enforceCacheLimit(CACHES[cacheKey], limit)
    ));

    // 3. Registrar sync periódico si está disponible
    if ('periodicSync' in self.registration) {
      try {
        await self.registration.periodicSync.register('cache-cleanup', {
          minInterval: 24 * 60 * 60 * 1000,
        });
      } catch (e) { /* Ignorar error si el usuario no da permiso */ }
    }
    
    if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
    await self.clients.claim();
    await broadcastMessage({ type: 'SW_READY', version: SW_VERSION });
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'PREFETCH_URL') {
    const urlToPrefetch = event.data.url;
    event.waitUntil(handlePrefetchRequest({ request: new Request(urlToPrefetch) }));
  }
});

self.addEventListener('controllerchange', () => {
  broadcastMessage({ type: 'SW_UPDATED' });
});

self.addEventListener('periodicsync', event => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(
      Promise.all(Object.entries(CACHE_LIMITS).map(([cacheKey, limit]) => 
        enforceCacheLimit(CACHES[cacheKey], limit)
      ))
    );
  }
});