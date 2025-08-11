/**
 * Script de optimización para View Transitions
 * Reduce solicitudes repetidas y mejora el rendimiento
 */

// Cache global para evitar duplicaciones
const loadedResources = new Set<string>();
const prefetchedPages = new Set<string>();

// Optimización de cache para View Transitions
function optimizeViewTransitionsCache(): void {
  // Preload recursos críticos que se usan en múltiples páginas
  const criticalResources: string[] = [
    '/assets/img-op/astro.svg',
    '/assets/img-op/background.svg'
  ];

  criticalResources.forEach((resource: string) => {
    // Evitar duplicaciones
    if (loadedResources.has(resource)) return;
    loadedResources.add(resource);

    const link: HTMLLinkElement = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = resource;
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  });
}

// Optimización de navegación para View Transitions
function optimizeViewTransitionsNavigation(): void {
  // Interceptar clicks en enlaces para optimizar transiciones
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    const link = target.closest('a') as HTMLAnchorElement;
    if (!link || !link.href || link.target === '_blank') return;

    // Prefetch de la página de destino
    const url = new URL(link.href);
    if (url.origin === window.location.origin) {
      // Evitar prefetch duplicado
      if (prefetchedPages.has(link.href)) return;
      prefetchedPages.add(link.href);

      // Prefetch solo para navegación interna
      const prefetchLink: HTMLLinkElement = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = link.href;
      document.head.appendChild(prefetchLink);
    }
  }, { passive: true });
}

// Optimización de recursos para View Transitions
function optimizeViewTransitionsResources(): void {
  // Cache de recursos críticos en sessionStorage
  const criticalResources: string[] = [
    '/assets/img-op/astro.svg',
    '/assets/img-op/background.svg'
  ];

  criticalResources.forEach((resource: string) => {
    // Verificar si ya está en cache
    if (sessionStorage.getItem(`cached_${resource}`)) return;
    
    // Evitar fetch duplicado
    if (loadedResources.has(`fetch_${resource}`)) return;
    loadedResources.add(`fetch_${resource}`);

    fetch(resource)
      .then((response: Response) => response.blob())
      .then((blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            sessionStorage.setItem(`cached_${resource}`, reader.result as string);
          }
        };
        reader.readAsDataURL(blob);
      })
      .catch((error: Error) => console.error(error));
  });
}

// Inicializar optimizaciones cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    optimizeViewTransitionsCache();
    optimizeViewTransitionsNavigation();
    optimizeViewTransitionsResources();
  });
} else {
  optimizeViewTransitionsCache();
  optimizeViewTransitionsNavigation();
  optimizeViewTransitionsResources();
}

// Optimización específica para View Transitions
if (typeof document.startViewTransition === 'function') {
  // Configuración avanzada de View Transitions
  document.addEventListener('astro:page-load', () => {
    // Solo optimizar recursos, no duplicar cache
    optimizeViewTransitionsResources();
  });
}

export {
  optimizeViewTransitionsCache,
  optimizeViewTransitionsNavigation,
  optimizeViewTransitionsResources
}; 