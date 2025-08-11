/**
 * Ultra Optimizador para View Transitions v3.0
 * 
 * Combina las mejores estrategias:
 * 1. Interceptación de APIs nativas para prevenir duplicaciones
 * 2. Cache API persistente para recursos críticos
 * 3. Prefetch inteligente multi-trigger
 * 4. Gestión avanzada de memoria y limpieza
 * 5. Monitoreo de rendimiento en tiempo real
 */

// --- TIPOS Y CONFIGURACIÓN ---

interface CacheEntry {
  data: string;
  timestamp: number;
  size: number;
  hitCount: number;
}

interface PerformanceMetrics {
  cacheHits: number;
  cacheMisses: number;
  interceptedRequests: number;
  prefetchedPages: number;
  resourcesSaved: number;
}

interface OptimizationConfig {
  CACHE_NAME: string;
  CACHE_VERSION: string;
  CACHE_EXPIRY: number;
  MAX_CACHE_SIZE: number;
  MAX_PREFETCH_CONCURRENT: number;
  CRITICAL_RESOURCES: readonly string[];
  PREFETCH_DELAY: number;
  PERFORMANCE_LOGGING: boolean;
}

const CONFIG: OptimizationConfig = {
  CACHE_NAME: 'vt-ultra-cache',
  CACHE_VERSION: 'v3.1', // Incrementar versión para limpiar cache
  CACHE_EXPIRY: 60 * 60 * 1000, // 1 hora
  MAX_CACHE_SIZE: 5 * 1024 * 1024, // Reducir a 5MB para evitar consumo excesivo
  MAX_PREFETCH_CONCURRENT: 1, // Reducir concurrencia para evitar duplicaciones
  CRITICAL_RESOURCES: [
    '/assets/img-op/astro.svg',
    '/assets/img-op/background.svg'
  ] as const,
  PREFETCH_DELAY: 300, // Aumentar delay para evitar prefetch agresivo
  PERFORMANCE_LOGGING: false // Desactivar logs para production
} as const;

// --- CACHE GLOBAL AVANZADO ---

declare global {
  interface Window {
    __vt_ultra_cache: {
      loadedResources: Set<string>;
      prefetchedPages: Set<string>;
      fetchedAssets: Map<string, Response>;
      interceptedRequests: Set<string>;
      performanceMetrics: PerformanceMetrics;
      isInitialized: boolean;
    };
  }
}

// Inicializar cache global mejorado
const initGlobalCache = (): void => {
  if (!window.__vt_ultra_cache) {
    window.__vt_ultra_cache = {
      loadedResources: new Set(),
      prefetchedPages: new Set(),
      fetchedAssets: new Map(),
      interceptedRequests: new Set(),
      performanceMetrics: {
        cacheHits: 0,
        cacheMisses: 0,
        interceptedRequests: 0,
        prefetchedPages: 0,
        resourcesSaved: 0
      },
      isInitialized: false
    };
  }
};

// --- CLASE PRINCIPAL ULTRA OPTIMIZADOR ---

class UltraViewTransitionsOptimizer {
  private cache!: Cache;
  private observer: IntersectionObserver | null = null;
  private prefetchQueue: Array<{ url: string; priority: number }> = [];
  private activePrefetches = 0;
  private performanceObserver: PerformanceObserver | null = null;
  private cleanupInterval: number | null = null;

  constructor() {
    initGlobalCache();
    this.init();
  }

  private async init(): Promise<void> {
    if (window.__vt_ultra_cache.isInitialized) {
      this.logPerformance('Ya inicializado, omitiendo...');
      return;
    }

    try {
      // Inicializar Cache API
      await this.initCacheAPI();
      
      // Configurar interceptaciones
      this.setupAdvancedInterceptions();
      
      // Configurar prefetch inteligente
      this.setupIntelligentPrefetch();
      
      // Configurar monitoreo de rendimiento
      this.setupPerformanceMonitoring();
      
      // Configurar limpieza automática
      this.setupAutomaticCleanup();
      
      // Precargar recursos críticos
      await this.preloadAndCacheCriticalResources();
      
      window.__vt_ultra_cache.isInitialized = true;
      this.logPerformance('Ultra Optimizador inicializado correctamente');
      
    } catch (error) {
      console.error('Error inicializando Ultra Optimizador:', error);
    }
  }

  // --- INICIALIZACIÓN DE CACHE API ---
  
  private async initCacheAPI(): Promise<void> {
    if (!('caches' in window)) {
      console.warn('Cache API no disponible, usando fallback');
      return;
    }

    try {
      this.cache = await caches.open(`${CONFIG.CACHE_NAME}-${CONFIG.CACHE_VERSION}`);
      await this.cleanupOldCaches();
    } catch (error) {
      console.error('Error inicializando Cache API:', error);
    }
  }

  private async cleanupOldCaches(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name.startsWith(CONFIG.CACHE_NAME) && !name.includes(CONFIG.CACHE_VERSION)
      );
      
      await Promise.all(oldCaches.map(name => caches.delete(name)));
      
      if (oldCaches.length > 0) {
        this.logPerformance(`Limpiadas ${oldCaches.length} cachés antiguas`);
      }
    } catch (error) {
      console.error('Error limpiando cachés antiguas:', error);
    }
  }

  // --- INTERCEPTACIONES AVANZADAS ---

  private setupAdvancedInterceptions(): void {
    this.interceptFetch();
    this.interceptXMLHttpRequest();
    this.interceptImageCreation();
    this.interceptLinkCreation();
    this.interceptResourceHints();
  }

  private interceptFetch(): void {
    if ((window.fetch as any).__vt_intercepted) return;
    
    const originalFetch = window.fetch;
    
    window.fetch = async (...args): Promise<Response> => {
      const url = this.extractURL(args[0]);
      
      if (this.shouldInterceptResource(url)) {
        // Verificar cache en memoria primero
        if (window.__vt_ultra_cache.fetchedAssets.has(url)) {
          window.__vt_ultra_cache.performanceMetrics.cacheHits++;
          this.logPerformance(`🚀 Fetch cache hit: ${url}`);
          return window.__vt_ultra_cache.fetchedAssets.get(url)!.clone();
        }
        
        // Verificar Cache API
        if (this.cache) {
          const cachedResponse = await this.cache.match(url);
          if (cachedResponse) {
            window.__vt_ultra_cache.performanceMetrics.cacheHits++;
            window.__vt_ultra_cache.fetchedAssets.set(url, cachedResponse.clone());
            this.logPerformance(`🚀 Cache API hit: ${url}`);
            return cachedResponse;
          }
        }
        
        window.__vt_ultra_cache.performanceMetrics.cacheMisses++;
        window.__vt_ultra_cache.performanceMetrics.interceptedRequests++;
      }
      
      const response = await originalFetch.apply(this, args);
      
      // Cachear respuesta si es un recurso crítico
      if (this.shouldInterceptResource(url) && response.ok) {
        window.__vt_ultra_cache.fetchedAssets.set(url, response.clone());
        if (this.cache) {
          this.cache.put(url, response.clone()).catch(console.error);
        }
      }
      
      return response;
    };

    (window.fetch as any).__vt_intercepted = true;
  }

  private interceptXMLHttpRequest(): void {
    if ((XMLHttpRequest.prototype.open as any).__vt_intercepted) return;
    
    const originalOpen = XMLHttpRequest.prototype.open;
    
    XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...args: any[]) {
      const urlString = typeof url === 'string' ? url : url.toString();
      
      if (window.__vt_ultra_cache && 
          window.__vt_ultra_cache.interceptedRequests.has(urlString)) {
        window.__vt_ultra_cache.performanceMetrics.cacheHits++;
        console.log('🚀 XHR interceptado:', urlString);
        return;
      }
      
      if (urlString.includes('/assets/') || 
          CONFIG.CRITICAL_RESOURCES.some(res => urlString.includes(res))) {
        window.__vt_ultra_cache?.interceptedRequests.add(urlString);
        window.__vt_ultra_cache.performanceMetrics.interceptedRequests++;
      }
      
      return originalOpen.call(this, method, url, args[0], args[1], args[2]);
    };

    (XMLHttpRequest.prototype.open as any).__vt_intercepted = true;
  }

  private interceptImageCreation(): void {
    if ((window.Image as any).__vt_intercepted) return;
    
    const originalImage = window.Image;
    const optimizer = this;
    
    window.Image = function(this: HTMLImageElement, width?: number, height?: number) {
      const img = new originalImage(width, height);
      const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
      
      if (originalSrcDescriptor) {
        Object.defineProperty(img, 'src', {
          set: function(value: string) {
            if (optimizer.shouldInterceptResource(value)) {
              if (window.__vt_ultra_cache.loadedResources.has(value)) {
                window.__vt_ultra_cache.performanceMetrics.cacheHits++;
                optimizer.logPerformance(`🚀 Image cache hit: ${value}`);
                return;
              }
              window.__vt_ultra_cache.loadedResources.add(value);
              window.__vt_ultra_cache.performanceMetrics.resourcesSaved++;
            }
            return originalSrcDescriptor.set?.call(this, value);
          },
          get: originalSrcDescriptor.get,
          configurable: true
        });
      }
      
      return img;
    } as any;

    (window.Image as any).__vt_intercepted = true;
  }

  private interceptLinkCreation(): void {
    if ((document.createElement as any).__vt_intercepted) return;
    
    const originalCreateElement = document.createElement;
    const optimizer = this;
    
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(this, tagName);
      
      if (tagName.toLowerCase() === 'link') {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function(name: string, value: string) {
          if (name === 'href' && (this as HTMLLinkElement).rel === 'prefetch') {
            if (window.__vt_ultra_cache.prefetchedPages.has(value)) {
              window.__vt_ultra_cache.performanceMetrics.cacheHits++;
              optimizer.logPerformance(`🚀 Prefetch evitado: ${value}`);
              return element;
            }
            window.__vt_ultra_cache.prefetchedPages.add(value);
            window.__vt_ultra_cache.performanceMetrics.prefetchedPages++;
          }
          return originalSetAttribute.call(this, name, value);
        };
      }
      
      return element;
    };

    (document.createElement as any).__vt_intercepted = true;
  }

  private interceptResourceHints(): void {
    // Evitar duplicación de resource hints
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'LINK') {
              const link = element as HTMLLinkElement;
              const key = `${link.rel}-${link.href}`;
              
              if (window.__vt_ultra_cache.loadedResources.has(key)) {
                element.remove();
                window.__vt_ultra_cache.performanceMetrics.resourcesSaved++;
                this.logPerformance(`🚀 Resource hint duplicado removido: ${key}`);
              } else {
                window.__vt_ultra_cache.loadedResources.add(key);
              }
            }
          }
        });
      });
    });

    observer.observe(document.head, { childList: true, subtree: true });
  }

  // --- PREFETCH INTELIGENTE MULTI-TRIGGER ---

  private setupIntelligentPrefetch(): void {
    this.setupIntersectionObserver();
    this.setupHoverPrefetch();
    this.setupTouchPrefetch();
    this.setupKeyboardPrefetch();
    this.processPrefetchQueue();
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            this.queuePrefetch(link.href, 1); // Prioridad baja
            this.observer?.unobserve(link);
          }
        });
      },
      { 
        rootMargin: '200px',
        threshold: 0.1
      }
    );

    // Observar enlaces existentes
    this.observeLinks();
    
    // Re-observar en cambios del DOM
    new MutationObserver(() => {
      this.observeLinks();
    }).observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private observeLinks(): void {
    if (!this.observer) return;
    
    document.querySelectorAll('a[href]').forEach(link => {
      if (this.isValidInternalLink(link as HTMLAnchorElement)) {
        this.observer!.observe(link);
      }
    });
  }

  private setupHoverPrefetch(): void {
    let hoverTimeout: number;
    
    document.addEventListener('mouseenter', (event) => {
      const link = (event.target as HTMLElement).closest('a') as HTMLAnchorElement;
      if (!this.isValidInternalLink(link)) return;
      
      hoverTimeout = window.setTimeout(() => {
        this.queuePrefetch(link.href, 3); // Prioridad alta
      }, CONFIG.PREFETCH_DELAY);
    }, { passive: true, capture: true });

    document.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
    }, { passive: true, capture: true });
  }

  private setupTouchPrefetch(): void {
    document.addEventListener('touchstart', (event) => {
      const link = (event.target as HTMLElement).closest('a') as HTMLAnchorElement;
      if (this.isValidInternalLink(link)) {
        this.queuePrefetch(link.href, 4); // Prioridad muy alta
      }
    }, { passive: true, capture: true });
  }

  private setupKeyboardPrefetch(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        const focusedElement = document.activeElement as HTMLAnchorElement;
        if (this.isValidInternalLink(focusedElement)) {
          this.queuePrefetch(focusedElement.href, 2); // Prioridad media
        }
      }
    }, { passive: true });
  }

  private queuePrefetch(url: string, priority: number): void {
    if (window.__vt_ultra_cache.prefetchedPages.has(url)) return;
    
    // Evitar duplicados en la cola
    if (this.prefetchQueue.some(item => item.url === url)) return;
    
    this.prefetchQueue.push({ url, priority });
    this.prefetchQueue.sort((a, b) => b.priority - a.priority);
  }

  private async processPrefetchQueue(): Promise<void> {
    setInterval(async () => {
      if (this.activePrefetches >= CONFIG.MAX_PREFETCH_CONCURRENT || 
          this.prefetchQueue.length === 0) return;

      const { url } = this.prefetchQueue.shift()!;
      this.activePrefetches++;

      try {
        await this.performPrefetch(url);
      } finally {
        this.activePrefetches--;
      }
    }, 50);
  }

  private async performPrefetch(url: string): Promise<void> {
    if (window.__vt_ultra_cache.prefetchedPages.has(url)) return;
    
    window.__vt_ultra_cache.prefetchedPages.add(url);
    window.__vt_ultra_cache.performanceMetrics.prefetchedPages++;

    // Prefetch using link element
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    
    return new Promise<void>((resolve) => {
      link.onload = () => resolve();
      link.onerror = () => resolve(); // No bloquear en errores
      document.head.appendChild(link);
      
      // Timeout de seguridad
      setTimeout(resolve, 3000);
    });
  }

  // --- PRECARGA Y CACHÉ DE RECURSOS CRÍTICOS ---

  private async preloadAndCacheCriticalResources(): Promise<void> {
    const promises = CONFIG.CRITICAL_RESOURCES.map(async (resource) => {
      // Verificar si ya está cargado
      if (window.__vt_ultra_cache.loadedResources.has(resource)) {
        return;
      }

      try {
        // Preload para la página actual
        await this.addPreloadLink(resource);
        
        // Cache para futuras visitas
        if (this.cache) {
          const cached = await this.cache.match(resource);
          if (!cached) {
            await this.cache.add(resource);
          }
        }
        
        window.__vt_ultra_cache.loadedResources.add(resource);
        window.__vt_ultra_cache.performanceMetrics.resourcesSaved++;
        
      } catch (error) {
        console.warn(`Error precargando ${resource}:`, error);
      }
    });

    await Promise.allSettled(promises);
    this.logPerformance(`Recursos críticos procesados: ${CONFIG.CRITICAL_RESOURCES.length}`);
  }

  private async addPreloadLink(resource: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      // Detectar tipo automáticamente
      const extension = resource.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'svg':
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'webp':
          link.as = 'image';
          if (extension === 'svg') link.type = 'image/svg+xml';
          break;
        case 'css':
          link.as = 'style';
          break;
        case 'js':
          link.as = 'script';
          break;
        default:
          link.as = 'fetch';
          link.crossOrigin = 'anonymous';
      }

      link.onload = () => resolve();
      link.onerror = () => resolve();
      document.head.appendChild(link);
    });
  }

  // --- MONITOREO DE RENDIMIENTO ---

  private setupPerformanceMonitoring(): void {
    if (!CONFIG.PERFORMANCE_LOGGING || !('PerformanceObserver' in window)) return;

    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.logPerformanceMetrics();
          }
        });
      });
      
      this.performanceObserver.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      console.warn('Error configurando PerformanceObserver:', error);
    }
  }

  private logPerformanceMetrics(): void {
    if (!CONFIG.PERFORMANCE_LOGGING) return;
    
    const metrics = window.__vt_ultra_cache.performanceMetrics;
    console.group('🚀 Ultra View Transitions - Métricas de Rendimiento');
    console.log(`Cache Hits: ${metrics.cacheHits}`);
    console.log(`Cache Misses: ${metrics.cacheMisses}`);
    console.log(`Requests Interceptados: ${metrics.interceptedRequests}`);
    console.log(`Páginas Prefetched: ${metrics.prefetchedPages}`);
    console.log(`Recursos Ahorrados: ${metrics.resourcesSaved}`);
    console.log(`Hit Rate: ${((metrics.cacheHits / (metrics.cacheHits + metrics.cacheMisses)) * 100).toFixed(2)}%`);
    console.groupEnd();
  }

  // --- LIMPIEZA AUTOMÁTICA ---

  private setupAutomaticCleanup(): void {
    // Limpieza periódica cada 5 minutos
    this.cleanupInterval = window.setInterval(() => {
      this.performCleanup();
    }, 5 * 60 * 1000);

    // Limpieza al cambiar de página
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  private performCleanup(): void {
    // Limpiar cache en memoria si está muy grande
    if (window.__vt_ultra_cache.fetchedAssets.size > 100) {
      const entries = Array.from(window.__vt_ultra_cache.fetchedAssets.entries());
      entries.slice(0, 50).forEach(([key]) => {
        window.__vt_ultra_cache.fetchedAssets.delete(key);
      });
    }

    // Resetear métricas si están muy altas
    const metrics = window.__vt_ultra_cache.performanceMetrics;
    if (metrics.cacheHits + metrics.cacheMisses > 1000) {
      Object.keys(metrics).forEach(key => {
        (metrics as any)[key] = 0;
      });
    }

    this.logPerformance('Limpieza automática ejecutada');
  }

  private cleanup(): void {
    this.observer?.disconnect();
    this.performanceObserver?.disconnect();
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.prefetchQueue.length = 0;
  }

  // --- UTILIDADES ---

  private extractURL(input: RequestInfo | URL): string {
    if (typeof input === 'string') return input;
    if (input instanceof URL) return input.href;
    if (input instanceof Request) return input.url;
    return String(input);
  }

  private shouldInterceptResource(url: string): boolean {
    // Solo interceptar recursos específicos para evitar duplicaciones
    return CONFIG.CRITICAL_RESOURCES.some(resource => url.includes(resource)) ||
           (url.includes('/assets/img-op/') && (url.includes('astro.svg') || url.includes('background.svg')));
  }

  private isValidInternalLink(link: HTMLAnchorElement | null): boolean {
    if (!link?.href || link.target === '_blank') return false;
    if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return false;
    
    try {
      const url = new URL(link.href);
      return url.origin === window.location.origin && 
             url.pathname !== window.location.pathname &&
             !url.href.includes('#');
    } catch {
      return false;
    }
  }

  private logPerformance(message: string): void {
    if (CONFIG.PERFORMANCE_LOGGING) {
      console.log(`🚀 ${message}`);
    }
  }

  // --- API PÚBLICA ---

  public getMetrics(): PerformanceMetrics {
    return { ...window.__vt_ultra_cache.performanceMetrics };
  }

  public clearCache(): void {
    window.__vt_ultra_cache.fetchedAssets.clear();
    window.__vt_ultra_cache.loadedResources.clear();
    window.__vt_ultra_cache.prefetchedPages.clear();
    if (this.cache) {
      caches.delete(`${CONFIG.CACHE_NAME}-${CONFIG.CACHE_VERSION}`);
    }
    this.logPerformance('Cache limpiado manualmente');
  }

  public async exportMetrics(): Promise<string> {
    const metrics = this.getMetrics();
    const data = {
      timestamp: new Date().toISOString(),
      metrics,
      config: CONFIG
    };
    return JSON.stringify(data, null, 2);
  }
}

// --- INICIALIZACIÓN E INTEGRACIÓN ---

let optimizerInstance: UltraViewTransitionsOptimizer | null = null;

const UltraOptimizer = {
  init(): UltraViewTransitionsOptimizer {
    if (!optimizerInstance) {
      optimizerInstance = new UltraViewTransitionsOptimizer();
    }
    return optimizerInstance;
  },
  
  getInstance(): UltraViewTransitionsOptimizer | null {
    return optimizerInstance;
  }
};

// Auto-inicialización
function autoInit(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UltraOptimizer.init());
  } else {
    UltraOptimizer.init();
  }
}

// Inicialización para entornos normales
if (typeof document !== 'undefined') {
  autoInit();

  // Integración específica con Astro
  if ('startViewTransition' in document) {
    document.addEventListener('astro:page-load', () => {
      const instance = UltraOptimizer.getInstance();
      if (instance) {
        // Solo refrescar observadores, no reinicializar todo
        (instance as any).observeLinks();
        (instance as any).logPerformance('Astro page-load: Enlaces re-observados');
      }
    });

    document.addEventListener('astro:before-preparation', () => {
      const instance = UltraOptimizer.getInstance();
      if (instance) {
        (instance as any).logPerformanceMetrics();
      }
    });
  }
}

// Exportaciones
export default UltraOptimizer;
export { UltraViewTransitionsOptimizer, CONFIG };

// Exportaciones para retrocompatibilidad
export const initializeViewTransitionsOptimization = () => UltraOptimizer.init();
export const optimizeViewTransitionsCache = () => UltraOptimizer.getInstance()?.clearCache();
export const optimizeViewTransitionsNavigation = () => UltraOptimizer.init();
export const optimizeViewTransitionsResources = () => UltraOptimizer.init();