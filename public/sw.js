/* Ultra SW for Astro + View Transitions
 * - Cache-first for static assets (/_astro, /assets)
 * - Network-only for documents to keep SPA/VT in sync (with offline fallback)
 * - Navigation Preload enabled
 * - Update flow: broadcast prompt; "Actualizar ahora" triggers skipWaiting+claim
 * - Hard refresh option: purge all caches and unregister
 */

const SW_VERSION = `v${Date.now()}`; // bump on each deploy
const STATIC_CACHE = `static-${SW_VERSION}`;
const RUNTIME_CACHE = `runtime-${SW_VERSION}`;
const OFFLINE_URL = '/offline.html';

const STATIC_PATTERNS = [
  /^\/_astro\//,             // built assets
  /^\/assets\//,             // public assets
  /\.woff2?$|\.ttf$|\.eot$/i,
  /\.css$/i,
  /\.js$/i,
  /\.svg$|\.png$|\.jpe?g$|\.webp$|\.avif$/i,
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(STATIC_CACHE);
      // Precache mínimo (sin fingerprint para evitar roturas en dev)
      await cache.addAll([OFFLINE_URL, '/favicon.svg']);
    } catch {}
    // Permite que la nueva versión quede lista
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Navigation preload acelera navigations cuando el SW toma control
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch {}
    }
    // Purga cachés antiguas
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => ![STATIC_CACHE, RUNTIME_CACHE].includes(k)).map((k) => caches.delete(k)));
    // Toma control inmediato
    await self.clients.claim();
  })());
});

// Utilidad: determina si es estático
function matchStatic(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  return STATIC_PATTERNS.some((p) => p.test(path));
}

// Mensajería (update / hard clear)
self.addEventListener('message', async (event) => {
  const { type } = event.data || {};
  if (type === 'SW_SKIP_WAITING') {
    await self.skipWaiting();
    return;
  }
  if (type === 'SW_HARD_CLEAR') {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    // No se puede "borrar" el SW desde el SW; el cliente debe llamar unregister()
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach((c) => c.postMessage({ type: 'SW_CLEARED' }));
  }
});

// Estrategias de fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Evitar interferir con HMR/dev y llamadas internas
  if (url.origin !== location.origin) return;

  // 1) Documentos: NetworkOnly con fallback offline (no cachear para VT/SPA)
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = event.preloadResponse ? await event.preloadResponse : null;
        if (preload) return preload;
        return await fetch(request);
      } catch (err) {
        const cached = await caches.match(OFFLINE_URL);
        return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  // 2) Estáticos: CacheFirst
  if (matchStatic(request)) {
    event.respondWith((async () => {
      const cache = await caches.open(STATIC_CACHE);
      const hit = await cache.match(request, { ignoreSearch: true });
      if (hit) return hit;
      const res = await fetch(request);
      if (res && res.ok) { cache.put(request, res.clone()); }
      return res;
    })());
    return;
  }

  // 3) Resto: Stale-While-Revalidate en runtime
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    const networkPromise = fetch(request).then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    }).catch(() => cached);
    return cached || networkPromise;
  })());
});

// Broadcast cuando hay update disponible
// Nota: en muchos navegadores "updatefound" vive en la página. Aquí avisamos a los clientes tras activar
(async () => {
  try {
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach((c) => c.postMessage({ type: 'SW_READY', version: SW_VERSION }));
  } catch {}
})();

