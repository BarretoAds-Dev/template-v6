// =============================================================================
// 🚀 VIEW TRANSITIONS MANAGER - ULTRA OPTIMIZADO v5.0 - GALACTIC ENHANCED
// =============================================================================
// MEJORAS v5.0:
// 1. Cache inteligente con compresión
// 2. Prefetch predictivo basado en patrones
// 3. Analytics ultra-ligero con compresión
// 4. Configuración adaptativa por dispositivo
// 5. Integración mejorada con Service Worker
// 6. Performance optimizado para velocidad luz
// 7. Mantiene todas las animaciones personalizadas
// =============================================================================

// =============================================================================
// 🎯 CONFIGURACIÓN GALÁCTICA MEJORADA
// =============================================================================

const GALACTIC_CONFIG = {
  prefetch: {
    enabled: false,
    intersectionThreshold: 0.01,
    rootMargin: '200px',
    hoverDelay: 120,
    maxConcurrent: 3,
    maxTotalPerSession: 30,
    priority: 'high',
    timeout: 2000,
    prefetchImages: false,
  },
  cache: {
    maxEntries: 100,
    ttl: 300000,
    preloadCritical: true,
    compressResponses: true,
  },
  performance: {
    measureTransitions: true,
    optimizeForSpeed: true,
    disableAnimations: false,
    useNativeTransitions: true,
  },
  analytics: {
    enabled: true,
    sampling: 0.1,
    batchSize: 10,
    endpoint: '/api/vt-metrics',
    compression: true,
  },
} as const;

// =============================================================================
// 📊 ANALYTICS Y MÉTRICAS DE VIEW TRANSITIONS
// =============================================================================

interface TransitionMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  from: string;
  to: string;
  success: boolean;
  fallbackUsed: boolean;
  performance: {
    lcp: number;
    fid: number;
    cls: number;
  };
  userAgent: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
}

interface PreloadStrategy {
  type: 'intersection' | 'hover' | 'viewport' | 'manual';
  priority: 'high' | 'medium' | 'low';
  delay: number;
}

// =============================================================================
// 🧠 CACHE INTELIGENTE GALÁCTICO
// =============================================================================

// Eliminado el cache interno: ahora el SW es la única fuente de caché

class ViewTransitionsAnalytics {
  private metrics: TransitionMetrics[] = [];
  private currentTransition: Partial<TransitionMetrics> | null = null;
  private performanceObserver: PerformanceObserver | null = null;
  private batchQueue: any[] = [];

  constructor() {
    this.initializeEventListeners();
    this.initializePerformanceObserver();
    this.setupBatchSending();
  }

  private initializePerformanceObserver() {
    if ('PerformanceObserver' in window) {
      try {
        this.performanceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              this.updateCurrentTransitionLCP(entry.startTime);
            }
          }
        });
        this.performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('⚠️ [ViewTransitions] PerformanceObserver no disponible:', error);
      }
    }
  }

  private updateCurrentTransitionLCP(lcp: number) {
    if (this.currentTransition && this.currentTransition.performance) {
      this.currentTransition.performance = {
        lcp,
        fid: this.currentTransition.performance.fid || 0,
        cls: this.currentTransition.performance.cls || 0,
      };
    }
  }

  private initializeEventListeners() {
    document.addEventListener('astro:before-preparation', (event: any) => {
      this.currentTransition = {
        startTime: performance.now(),
        from: event.detail?.from?.pathname || 'unknown',
        to: event.detail?.to?.pathname || 'unknown',
        success: false,
        fallbackUsed: false,
        performance: { lcp: 0, fid: 0, cls: 0 },
        userAgent: navigator.userAgent,
        deviceType: this.detectDeviceType(),
      };
      console.log('🚀 [ViewTransitions] Preparando transición:', {
        from: this.currentTransition.from,
        to: this.currentTransition.to,
        fallback: 'native',
        deviceType: this.currentTransition.deviceType,
      });
    });

    document.addEventListener('astro:after-preparation', () => {
      console.log('⚡ [ViewTransitions] Página preparada');
    });
    document.addEventListener('astro:before-swap', () => {
      console.log('🔄 [ViewTransitions] Iniciando swap');
    });
    document.addEventListener('astro:after-swap', () => {
      if (this.currentTransition) {
        this.currentTransition.endTime = performance.now();
        this.currentTransition.duration = this.currentTransition.endTime - (this.currentTransition.startTime || 0);
        this.currentTransition.success = true;
        this.captureFinalPerformanceMetrics();
        this.metrics.push(this.currentTransition as TransitionMetrics);
        const compressedMetrics = this.compressMetrics(this.currentTransition as TransitionMetrics);
        this.addToBatch(compressedMetrics);
        this.sendMetricsToAnalytics(this.currentTransition as TransitionMetrics);
        this.currentTransition = null;
      }
    });
    document.addEventListener('astro:page-load', () => {
      console.log('✅ [ViewTransitions] Página cargada');
      // Aplicar autoclasificado de animaciones a elementos con atributos transition
      try { (window as any).viewTransitionsManager?.applyAutoEnhancements?.(); } catch {}
    });
  }

  private setupBatchSending() {
    setInterval(() => {
      this.sendBatch();
    }, 30000);
    window.addEventListener('beforeunload', () => {
      this.sendBatch(true);
    });
  }
  private addToBatch(metrics: any) {
    this.batchQueue.push(metrics);
    if (this.metrics.length > 100) this.metrics.shift();
  }
  private async sendBatch(immediate = false) {
    if (this.batchQueue.length === 0) return;
    const batch = [...this.batchQueue];
    this.batchQueue = [];
    try {
      const payload = { version: 'v5.0-galactic-enhanced', batch, timestamp: Date.now(), url: window.location.href };
      const finalPayload = GALACTIC_CONFIG.analytics.compression ? this.compressPayload(payload) : payload;
      if (immediate && 'sendBeacon' in navigator) {
        navigator.sendBeacon(GALACTIC_CONFIG.analytics.endpoint, JSON.stringify(finalPayload));
      } else {
        await fetch(GALACTIC_CONFIG.analytics.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalPayload) });
      }
      console.log(`📊 [VT-Analytics] Sent batch: ${batch.length} metrics`);
    } catch (error) {
      console.warn('⚠️ [VT-Analytics] Send failed:', error);
      this.batchQueue.unshift(...batch);
    }
  }
  private compressPayload(payload: any) {
    return { v: payload.version, b: payload.batch.map((m: any) => ({ d: m.duration, f: m.from.substring(0, 20), t: m.to.substring(0, 20), dt: m.deviceType[0], ts: m.timestamp })), ts: payload.timestamp, u: payload.url.substring(0, 50) };
  }
  private compressMetrics(metrics: TransitionMetrics) {
    return { duration: Math.round(metrics.duration), from: metrics.from.substring(0, 20), to: metrics.to.substring(0, 20), deviceType: metrics.deviceType, timestamp: Date.now() };
  }
  private detectDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      return /tablet|ipad/i.test(userAgent) ? 'tablet' : 'mobile';
    }
    return 'desktop';
  }
  private captureFinalPerformanceMetrics() {
    if (this.currentTransition && this.currentTransition.performance) {
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-input') {
              const firstInput = entry as any;
              if (this.currentTransition && this.currentTransition.performance) {
                this.currentTransition.performance.fid = firstInput.processingStart - firstInput.startTime;
              }
            }
          }
        }).observe({ entryTypes: ['first-input'] });
      }
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((list) => {
          let cls = 0;
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              const layoutShift = entry as any;
              if (!layoutShift.hadRecentInput) cls += layoutShift.value;
            }
          }
          if (this.currentTransition && this.currentTransition.performance) {
            this.currentTransition.performance.cls = cls;
          }
        }).observe({ entryTypes: ['layout-shift'] });
      }
    }
  }
  private sendMetricsToAnalytics(metrics: TransitionMetrics) {
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'view_transition', {
        event_category: 'navigation',
        event_label: `${metrics.from} -> ${metrics.to}`,
        value: Math.round(metrics.duration),
        custom_parameter_1: metrics.fallbackUsed ? 'fallback' : 'native',
        custom_parameter_2: metrics.deviceType,
        custom_parameter_3: Math.round(metrics.performance.lcp),
        custom_parameter_4: Math.round(metrics.performance.fid),
        custom_parameter_5: Math.round(1000 * metrics.performance.cls),
      });
    }
    if (typeof (window as any).plausible !== 'undefined') {
      (window as any).plausible('View Transition', { props: { from: metrics.from, to: metrics.to, duration: Math.round(metrics.duration), device: metrics.deviceType, lcp: Math.round(metrics.performance.lcp) } });
    }
  }
  public getMetrics(): TransitionMetrics[] { return this.metrics; }
  public getAverageDuration(): number { if (this.metrics.length === 0) return 0; const total = this.metrics.reduce((s, m) => s + m.duration, 0); return total / this.metrics.length; }
  public getPerformanceStats() {
    if (this.metrics.length === 0) return null;
    const lcpValues = this.metrics.map((m) => m.performance.lcp).filter((l) => l > 0);
    const fidValues = this.metrics.map((m) => m.performance.fid).filter((f) => f > 0);
    const clsValues = this.metrics.map((m) => m.performance.cls).filter((c) => c > 0);
    return {
      averageLCP: lcpValues.length > 0 ? lcpValues.reduce((a, b) => a + b, 0) / lcpValues.length : 0,
      averageFID: fidValues.length > 0 ? fidValues.reduce((a, b) => a + b, 0) / fidValues.length : 0,
      averageCLS: clsValues.length > 0 ? clsValues.reduce((a, b) => a + b, 0) / clsValues.length : 0,
      totalTransitions: this.metrics.length,
      successRate: this.metrics.filter((m) => m.success).length / this.metrics.length,
    };
  }
}

// =============================================================================
// 🚀 PREFETCH PREDICTIVO GALÁCTICO
// =============================================================================

class ViewTransitionsOptimizer {
  private preloadQueue: Map<string, Promise<void>> = new Map();
  private intersectionObserver: IntersectionObserver | null = null;
  private hoverTimeout: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private preloadStrategy: PreloadStrategy;
  private accessPatterns: Map<string, any> = new Map();
  private currentConcurrent: number = 0;
  private cache: any;
  private prefetchedOnce: Set<string> = new Set();
  private totalPrefetched: number = 0;

  constructor(strategy: PreloadStrategy = { type: 'intersection', priority: 'medium', delay: 100 }, cache: any) {
    this.preloadStrategy = strategy;
    this.cache = cache;
    this.initializePreloading();
  }

  private initializePreloading() {
    if (!(GALACTIC_CONFIG.prefetch as any).enabled) return;
    switch (this.preloadStrategy.type) {
      case 'intersection': this.setupIntersectionObserver(); break;
      case 'hover': this.setupHoverPreloading(); break;
      case 'viewport': this.setupViewportPreloading(); break;
    }
    this.setupPredictivePrefetch();
    this.prefetchViewportLinks();
  }

  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target as HTMLAnchorElement;
          const href = link.href;
          if (this.shouldPrefetch(href)) {
            this.schedulePrefetch(href, 'intersection', 8);
          }
        }
      });
    }, { rootMargin: GALACTIC_CONFIG.prefetch.rootMargin, threshold: GALACTIC_CONFIG.prefetch.intersectionThreshold });
    this.observeAllLinks();
  }

  private setupHoverPreloading() {
    document.addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;
      const link = target?.closest('a[href^="/"], a[href^="./"], a[href^="../"]') as HTMLAnchorElement;
      if (!link) return;
      const href = link.href;
      if (!this.shouldPrefetch(href)) return;
      const timeout = setTimeout(() => { this.schedulePrefetch(href, 'hover', 9); this.hoverTimeout.delete(href); }, GALACTIC_CONFIG.prefetch.hoverDelay);
      this.hoverTimeout.set(href, timeout);
    }, { passive: true });
    document.addEventListener('mouseout', (event) => {
      const target = event.target as HTMLElement;
      const link = target?.closest('a[href^="/"], a[href^="./"], a[href^="../"]') as HTMLAnchorElement;
      if (!link) return;
      const timeout = this.hoverTimeout.get(link.href);
      if (timeout) { clearTimeout(timeout); this.hoverTimeout.delete(link.href); }
    }, { passive: true });
  }

  private setupViewportPreloading() {
    const currentPath = window.location.pathname;
    const visibleLinks = Array.from(document.querySelectorAll('a[href^="/"]')).filter((link) => {
      const rect = (link as HTMLAnchorElement).getBoundingClientRect();
      const href = (link as HTMLAnchorElement).href;
      const linkPath = new URL(href, window.location.origin).pathname;
      return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth && linkPath !== currentPath;
    });
    visibleLinks.forEach((link, index) => { setTimeout(() => { this.schedulePrefetch((link as HTMLAnchorElement).href, 'viewport', 7); }, index * 100); });
  }

  private setupPredictivePrefetch() { setInterval(() => { this.analyzePatternsAndPrefetch(); }, 30000); }

  private prefetchViewportLinks() {
    const visibleLinks = this.getVisibleLinks();
    visibleLinks.forEach((link, index) => { setTimeout(() => { this.schedulePrefetch(link.href, 'viewport', 7); }, index * 100); });
  }

  private getVisibleLinks(): HTMLAnchorElement[] {
    const links = Array.from(document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]')) as HTMLAnchorElement[];
    const currentPath = window.location.pathname;
    return links.filter((link) => {
      const rect = link.getBoundingClientRect();
      const href = link.href;
      const linkPath = new URL(href, window.location.origin).pathname;
      return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth && linkPath !== currentPath;
    });
  }

  private observeAllLinks() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    links.forEach((link) => {
      const linkPath = new URL((link as HTMLAnchorElement).href, window.location.origin).pathname;
      if (linkPath !== currentPath) this.intersectionObserver?.observe(link);
    });
  }

  private shouldPrefetch(href: string): boolean {
    try {
      if (!(GALACTIC_CONFIG.prefetch as any).enabled) return false;
      const url = new URL(href, window.location.origin);
      const currentPath = window.location.pathname;
      if (url.pathname === currentPath) return false;
      if (this.preloadQueue.has(href)) return false;
      if (this.prefetchedOnce.has(url.href)) return false;
      if (url.origin !== window.location.origin) return false;
      if (this.currentConcurrent >= GALACTIC_CONFIG.prefetch.maxConcurrent) return false;
      if (this.totalPrefetched >= (GALACTIC_CONFIG.prefetch as any).maxTotalPerSession) return false;
      if (this.isResourceAlreadyLoaded(url.href)) return false;
      return true;
    } catch { return false; }
  }

  private isResourceAlreadyLoaded(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const currentOrigin = window.location.origin;
      if (urlObj.origin === currentOrigin) {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        const scriptUrls = scripts.map((s) => { const src = s.getAttribute('src'); return src ? new URL(src, currentOrigin).href : null; });
        if (scriptUrls.includes(url)) { console.log(`🚫 [VT-Prefetch] Skipping already loaded script: ${url}`); return true; }
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const cssUrls = stylesheets.map((l) => { const href = l.getAttribute('href'); return href ? new URL(href, currentOrigin).href : null; });
        if (cssUrls.includes(url)) { console.log(`🚫 [VT-Prefetch] Skipping already loaded CSS: ${url}`); return true; }
        const images = Array.from(document.querySelectorAll('img[src]'));
        const imageUrls = images.map((i) => { const src = i.getAttribute('src'); return src ? new URL(src, currentOrigin).href : null; });
        if (imageUrls.includes(url)) { console.log(`🚫 [VT-Prefetch] Skipping already loaded image: ${url}`); return true; }
      }
      return false;
    } catch { return false; }
  }

  private async schedulePrefetch(href: string, source: string, priority: number) {
    if (this.preloadQueue.has(href)) return;
    const prefetchPromise = this.executePrefetch(href, source, priority);
    this.preloadQueue.set(href, prefetchPromise);
    this.currentConcurrent++;
    try {
      await prefetchPromise;
      console.log(`🚀 [VT-Prefetch] Success: ${href} (${source}, p${priority})`);
    } catch (error) {
      console.warn(`⚠️ [VT-Prefetch] Failed: ${href}`, error);
    } finally {
      this.preloadQueue.delete(href);
      this.currentConcurrent--;
    }
  }

  private async executePrefetch(href: string, source: string, priority: number) {
    const startTime = performance.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort(); }, GALACTIC_CONFIG.prefetch.timeout);
    try {
      // Delegar prefetch al Service Worker
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'PREFETCH_URL', url: href });
        this.prefetchedOnce.add(new URL(href, window.location.origin).href);
        this.totalPrefetched++;
        this.updateAccessPattern(href, source);
        const duration = performance.now() - startTime;
        console.log(`⚡ [VT-Prefetch] Delegated to SW: ${href} (${duration.toFixed(2)}ms)`);
      } else {
        console.warn('⚠️ [VT-Prefetch] SW not controlling the page; skipping prefetch');
      }
    } finally { clearTimeout(timeout); }
  }

  private async prefetchCriticalResources(html: string, baseUrl: string) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const base = new URL(baseUrl, window.location.origin);
      const criticalCSS = doc.querySelectorAll('link[rel="stylesheet"]');
      const cssPromises = Array.from(criticalCSS).slice(0, 3).map((link) => {
        const href = link.getAttribute('href');
        if (href) {
          const absoluteUrl = new URL(href, base).href;
          if (!this.isResourceAlreadyLoaded(absoluteUrl)) return this.prefetchResource(absoluteUrl, 'style');
        }
      });
      const criticalJS = doc.querySelectorAll('script[src]');
      const jsPromises = Array.from(criticalJS).slice(0, 2).map((script) => {
        const src = script.getAttribute('src');
        if (src) {
          const absoluteUrl = new URL(src, base).href;
          if (!this.isResourceAlreadyLoaded(absoluteUrl)) return this.prefetchResource(absoluteUrl, 'script');
        }
      });
      let imgPromises: (Promise<void> | undefined)[] = [];
      if (GALACTIC_CONFIG.prefetch.prefetchImages) {
        const heroImages = doc.querySelectorAll('img[data-vt-preload="true"]');
        imgPromises = Array.from(heroImages).slice(0, 2).map((img) => {
          const src = img.getAttribute('src') || img.getAttribute('data-src');
          if (src) {
            const absoluteUrl = new URL(src, base).href;
            if (!this.isResourceAlreadyLoaded(absoluteUrl)) return this.prefetchResource(absoluteUrl, 'image');
          }
        });
      }
      const validPromises = [...cssPromises.filter(Boolean), ...jsPromises.filter(Boolean), ...imgPromises.filter(Boolean)];
      if (validPromises.length > 0) {
        await Promise.allSettled(validPromises as Promise<void>[]);
        console.log(`⚡ [VT-Prefetch] Critical resources prefetched: ${validPromises.length}`);
      } else {
        console.log('🚫 [VT-Prefetch] No critical resources to prefetch (already loaded)');
      }
    } catch (error) {
      console.warn('⚠️ [VT-Prefetch] Critical resources failed:', error);
    }
  }

  private async prefetchResource(url: string, type: 'style' | 'script' | 'image') {
    try {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = type;
      if (type === 'style') link.onload = () => document.head.removeChild(link);
      document.head.appendChild(link);
    } catch (error) {
      console.warn(`⚠️ [VT-Prefetch] Resource failed: ${url}`, error);
    }
  }

  private updateAccessPattern(href: string, source: string) {
    const pattern = this.accessPatterns.get(href) || { count: 0, sources: new Set<string>(), lastAccess: 0, intervals: [] as number[] };
    const now = Date.now();
    if (pattern.lastAccess > 0) {
      const interval = now - pattern.lastAccess;
      pattern.intervals.push(interval);
      if (pattern.intervals.length > 5) pattern.intervals.shift();
    }
    pattern.count++;
    pattern.sources.add(source);
    pattern.lastAccess = now;
    this.accessPatterns.set(href, pattern);
  }

  private analyzePatternsAndPrefetch() {
    const hotLinks = Array.from(this.accessPatterns.entries()).filter(([, p]: any) => p.count >= 2).sort((a, b) => b[1].count - a[1].count).slice(0, 5);
    hotLinks.forEach(([url]) => { if (this.shouldPrefetch(url)) this.schedulePrefetch(url, 'predictive', 9); });
    if (hotLinks.length > 0) console.log(`🧠 [VT-Prefetch] Predictive prefetch: ${hotLinks.length} hot links`);
  }

  public updateStrategy(newStrategy: PreloadStrategy) { this.preloadStrategy = newStrategy; this.cleanup(); this.initializePreloading(); }
  public reinitialize() { this.cleanup(); this.initializePreloading(); }
  private cleanup() { this.intersectionObserver?.disconnect(); this.hoverTimeout.forEach((t) => clearTimeout(t)); this.hoverTimeout.clear(); this.preloadQueue.clear(); }
  getMetrics() { return { queueSize: this.preloadQueue.size, currentConcurrent: this.currentConcurrent, accessPatterns: this.accessPatterns.size, hoverTimeouts: this.hoverTimeout.size, observedLinks: document.querySelectorAll('a[href^="/"]').length }; }
}

// =============================================================================
// 🎨 ANIMACIONES CUSTOM AVANZADAS
// =============================================================================

class ViewTransitionsAnimations {
  private customAnimations: Map<string, string> = new Map();
  private animationStyles: HTMLStyleElement | null = null;
  constructor() { this.setupCustomAnimations(); this.initializeAnimationStyles(); }
  private setupCustomAnimations() {
    this.customAnimations.set('hero-fade', 'hero-fade-animation');
    this.customAnimations.set('content-slide', 'content-slide-animation');
    this.customAnimations.set('card-flip', 'card-flip-animation');
    this.customAnimations.set('morph', 'morph-animation');
    this.customAnimations.set('zoom', 'zoom-animation');
    this.customAnimations.set('slide-up', 'slide-up-animation');
    this.customAnimations.set('slide-down', 'slide-down-animation');
    this.customAnimations.set('rotate', 'rotate-animation');
    this.customAnimations.set('scale-in', 'scale-in-animation');
    this.customAnimations.set('blur-transition', 'blur-transition-animation');
  }
  private initializeAnimationStyles() {
    this.animationStyles = document.createElement('style');
    this.animationStyles.textContent = `
      .hero-fade-animation{view-transition-name:hero-fade;transition:opacity .28s cubic-bezier(.2,.7,.2,1)}
      .content-slide-animation{view-transition-name:content-slide;transition:transform .32s cubic-bezier(.2,.7,.2,1)}
      .card-flip-animation{view-transition-name:card-flip;transition:transform .34s cubic-bezier(.2,.7,.2,1);transform-style:preserve-3d}
      .morph-animation{view-transition-name:morph;transition:all .30s cubic-bezier(.2,.7,.2,1)}
      .zoom-animation{view-transition-name:zoom;transition:transform .28s cubic-bezier(.2,.7,.2,1)}
      .slide-up-animation{view-transition-name:slide-up;transition:transform .30s cubic-bezier(.2,.7,.2,1)}
      .slide-down-animation{view-transition-name:slide-down;transition:transform .30s cubic-bezier(.2,.7,.2,1)}
      .rotate-animation{view-transition-name:rotate;transition:transform .30s cubic-bezier(.2,.7,.2,1)}
      .scale-in-animation{view-transition-name:scale-in;transition:transform .28s cubic-bezier(.2,.7,.2,1)}
      .blur-transition-animation{view-transition-name:blur-transition;transition:filter .26s cubic-bezier(.2,.7,.2,1)}
      .hero-fade-animation.fade-out{opacity:0}
      .content-slide-animation.slide-out{transform:translateX(-100%)}
      .card-flip-animation.flip-out{transform:rotateY(180deg)}
      .morph-animation.morph-out{transform:scale(.8) rotate(5deg);opacity:.5}
      .zoom-animation.zoom-out{transform:scale(.7);opacity:0}
      .slide-up-animation.slide-up-out{transform:translateY(-60%)}
      .slide-down-animation.slide-down-out{transform:translateY(60%)}
      .rotate-animation.rotate-out{transform:rotate(360deg)}
      .scale-in-animation.scale-in-out{transform:scale(.8)}
      .blur-transition-animation.blur-out{filter:blur(8px);opacity:0}
      @media (prefers-reduced-motion: reduce){.hero-fade-animation,.content-slide-animation,.card-flip-animation,.morph-animation,.zoom-animation,.slide-up-animation,.slide-down-animation,.rotate-animation,.scale-in-animation,.blur-transition-animation{transition:none!important;animation:none!important}}
      @media (max-width:768px){.hero-fade-animation{transition-duration:.22s}.content-slide-animation{transition-duration:.26s}}
      @media (prefers-color-scheme: dark){.blur-transition-animation{filter:blur(4px) brightness(.8)}}`;
    document.head.appendChild(this.animationStyles);
  }
  public addCustomAnimation(element: HTMLElement, animationType: string) { const cls = this.customAnimations.get(animationType); if (cls) { element.classList.add(cls); return true; } return false; }
  public removeCustomAnimation(element: HTMLElement, animationType: string) { const cls = this.customAnimations.get(animationType); if (cls) { element.classList.remove(cls); return true; } return false; }
  public createCustomAnimation(name: string, cssRules: string) { if (this.animationStyles) { this.animationStyles.textContent += `\n/* Custom Animation: ${name} */\n${cssRules}\n`; this.customAnimations.set(name, `${name}-animation`); } }
  public getAvailableAnimations(): string[] { return Array.from(this.customAnimations.keys()); }
}

// =============================================================================
// 🔧 UTILIDADES Y MANAGER
// =============================================================================

export class ViewTransitionsManager {
  private analytics!: ViewTransitionsAnalytics;
  private animations!: ViewTransitionsAnimations;
  private optimizer!: ViewTransitionsOptimizer;
  private cache!: any;
  private isInitialized = false;
  constructor(options?: { preloadStrategy?: PreloadStrategy; enableAnalytics?: boolean; enableOptimizations?: boolean; enableCustomAnimations?: boolean; }) { this.initialize(options); }
  private initialize(options?: { preloadStrategy?: PreloadStrategy; enableAnalytics?: boolean; enableOptimizations?: boolean; enableCustomAnimations?: boolean; }) {
    if (this.isInitialized) return;
    const { preloadStrategy = { type: 'intersection', priority: 'medium', delay: 100 }, enableAnalytics = true, enableOptimizations = true, enableCustomAnimations = true } = options || {};
    this.cache = null;
    const toggle = (window as any).__VT_TELEMETRY__;
    const telemetryOn = typeof toggle === 'boolean' ? toggle : GALACTIC_CONFIG.analytics.enabled;
    const sampled = Math.random() < ((GALACTIC_CONFIG.analytics as any).sampling ?? 1);
    if (enableAnalytics && telemetryOn && sampled) this.analytics = new ViewTransitionsAnalytics();
    if (enableCustomAnimations) this.animations = new ViewTransitionsAnimations();
    if (enableOptimizations) this.optimizer = new ViewTransitionsOptimizer(preloadStrategy, this.cache);
    this.isInitialized = true;
    console.log('🚀 [ViewTransitions] Manager v5.0 Galactic Enhanced inicializado');
    // Primera pasada de mejoras automáticas
    this.applyAutoEnhancements();
  }
  public navigateTo(url: string, options?: { history?: 'auto' | 'push' | 'replace'; info?: any; animation?: string; }) {
    if (options?.animation && this.animations) { const main = document.querySelector('main'); if (main) { this.animations.addCustomAnimation(main as HTMLElement, options.animation); } }
    window.location.href = url;
  }
  public getMetrics() { return this.analytics?.getMetrics() || []; }
  public getAverageDuration() { return this.analytics?.getAverageDuration() || 0; }
  public getPerformanceStats() { return this.analytics?.getPerformanceStats() || null; }
  public getCacheMetrics() { return (this as any).cache?.getMetrics?.() || null; }
  public getPrefetcherMetrics() { return (this as any).optimizer?.getMetrics?.() || null; }
  public addCustomAnimation(element: HTMLElement, animationType: string) { return this.animations?.addCustomAnimation(element, animationType) || false; }
  public removeCustomAnimation(element: HTMLElement, animationType: string) { return this.animations?.removeCustomAnimation(element, animationType) || false; }
  public createCustomAnimation(name: string, cssRules: string) { this.animations?.createCustomAnimation(name, cssRules); }
  public getAvailableAnimations(): string[] { return this.animations?.getAvailableAnimations() || []; }
  public updatePreloadStrategy(strategy: PreloadStrategy) { (this as any).optimizer?.updateStrategy?.(strategy); }
  public reinitialize() { (this as any).optimizer?.reinitialize?.(); }
  public isSupported(): boolean { return 'startViewTransition' in (document as any) || 'ViewTransition' in (window as any); }
  public getCurrentFallback(): string { return this.isSupported() ? 'native' : 'animate'; }
  public getCapabilities() { return { supported: this.isSupported(), fallback: this.getCurrentFallback(), animations: this.getAvailableAnimations(), preloadStrategy: (this as any).optimizer ? 'enabled' : 'disabled', analytics: (this as any).analytics ? 'enabled' : 'disabled', cache: (this as any).cache ? 'enabled' : 'disabled' }; }
  public integrateWithPWA() { if (typeof window !== 'undefined' && (window as any).pwaManagerFooter) { const pwaManagerFooter = (window as any).pwaManagerFooter; const performanceStats = this.getPerformanceStats(); if (performanceStats && pwaManagerFooter.updatePerformanceMetrics) { pwaManagerFooter.updatePerformanceMetrics(performanceStats); } } }
  public async prefetchUrl(url: string, priority: number = 8) { if ((this as any).optimizer) { return (this as any).optimizer['schedulePrefetch']?.(url, 'manual', priority); } }
  public clearCache() { if ((this as any).cache) { (this as any).cache['cache']?.clear(); console.log('🗑️ [VT-Manager] Cache cleared'); } }
  public getStatus() { return { initialized: this.isInitialized, version: 'v5.0-galactic-enhanced', supported: this.isSupported(), cacheSize: (this as any).cache ? (this as any).cache['cache']?.size || 0 : 0, prefetchQueue: (this as any).optimizer ? (this as any).optimizer['preloadQueue']?.size || 0 : 0, metricsCount: (this as any).analytics ? (this as any).analytics['metrics']?.length || 0 : 0 }; }
  public updateConfig(newConfig: any) { Object.assign(GALACTIC_CONFIG as any, newConfig); console.log('🔧 [VT-Manager] Galactic configuration updated'); }
  public reportElement(data: { transitionName: string; animationType: string; priority: string; preload: boolean; element: HTMLElement; }) {
    const safeName = (data.transitionName || 'vt').replace(/[^a-z0-9_-]/gi, '_');
    if ((this as any).analytics) { console.log(`📊 [VT-Manager] Element reported: ${safeName} (${data.animationType}, ${data.priority})`); }
    if (data.preload && (this as any).optimizer) {
      const links = data.element.querySelectorAll('a[href^="/"]');
      links.forEach((link) => { const href = (link as HTMLAnchorElement).href; const pr = data.priority === 'high' ? 9 : data.priority === 'medium' ? 5 : 1; (this as any).optimizer['schedulePrefetch']?.(href, 'wrapper-preload', pr); });
    }
  }

  // Escanea el DOM y aplica animaciones/clasificación automática
  public applyAutoEnhancements() {
    try {
      const elements = Array.from(document.querySelectorAll('[transition\\:name]')) as HTMLElement[];
      for (const el of elements) {
        const explicit = el.getAttribute('data-vt-animation');
        const transitionAnim = el.getAttribute('transition:animate');
        const name = el.getAttribute('transition:name') || 'element';
        let chosen: string | null = null;
        if (explicit) {
          chosen = explicit;
        } else if (transitionAnim) {
          // Mapeo simple de animaciones nativas a nuestras clases
          const map: Record<string, string> = {
            fade: 'hero-fade',
            slide: 'content-slide',
            zoom: 'zoom',
            rotate: 'rotate',
          };
          chosen = map[transitionAnim] || 'hero-fade';
        }
        if (chosen) {
          this.addCustomAnimation(el, chosen);
          // Reportar elemento para métricas
          this.reportElement({ transitionName: name, animationType: chosen, priority: 'medium', preload: false, element: el });
        }
      }
    } catch {}
  }
}

// =============================================================================
// 🚀 INICIALIZACIÓN AUTOMÁTICA
// =============================================================================

if (typeof document !== 'undefined') {
  if (!(window as any).viewTransitionsManager) {
    document.addEventListener('DOMContentLoaded', () => {
      const isMobile = window.innerWidth < 768;
      const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || (navigator as any).connection?.effectiveType === '2g';
      (window as any).viewTransitionsManager = new ViewTransitionsManager({
        preloadStrategy: { type: isMobile ? 'hover' as const : 'intersection', priority: isSlowConnection ? 'low' : 'medium', delay: isSlowConnection ? 200 : 100 },
        enableAnalytics: true,
        enableOptimizations: true,
        enableCustomAnimations: true,
      });
      console.log('🌌 View Transitions Manager v5.0 Galactic Enhanced - LIGHT SPEED ACTIVATED! ⚡');
    });
  }
  document.addEventListener('astro:page-load', () => {
    setTimeout(() => { (window as any).viewTransitionsManager?.reinitialize(); }, 100);
  });
}

if (typeof window !== 'undefined') {
  (window as any).getVTMetrics = () => (window as any).viewTransitionsManager?.getMetrics();
  (window as any).getVTStatus = () => (window as any).viewTransitionsManager?.getStatus();
  (window as any).getVTCacheMetrics = () => (window as any).viewTransitionsManager?.getCacheMetrics();
  (window as any).getVTPrefetcherMetrics = () => (window as any).viewTransitionsManager?.getPrefetcherMetrics();
  (window as any).clearVTCache = () => (window as any).viewTransitionsManager?.clearCache();
  (window as any).prefetchVTUrl = (url: string, priority: number) => (window as any).viewTransitionsManager?.prefetchUrl(url, priority);
}

export default ViewTransitionsManager;

