// ============================================================================
// 🚀 PROACTIVE SW ORCHESTRATOR v2.0 - con Detección Activa de Cambios
// ============================================================================
// Autor: Barreto Dev (Inspirado y mejorado)
//
// Esta versión transforma el registrador pasivo en un orquestador inteligente
// que busca activamente nuevas versiones del sitio.
//
// MEJORAS CLAVE:
// 1. **Chequeo Proactivo**: Busca actualizaciones cuando el usuario vuelve a la pestaña.
// 2. **Polling Periódico**: Busca actualizaciones cada 30 minutos para pestañas de larga duración.
// 3. **Control Explícito**: Usa `registration.update()` para forzar la comprobación en el servidor.
// 4. **Arquitectura Limpia**: Encapsula toda la lógica para evitar conflictos globales.
// 5. **Utilidad de Depuración**: Expone `window.forceSWUpdateCheck()` para pruebas manuales.
// ============================================================================

(function () {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const CONFIG = {
    SW_URL: '/sw.js',
    SCOPE: '/',
    BUILD_ID_VAR: '__BUILD_ID__',
    CHECK_INTERVAL_MS: 30 * 60 * 1000, // 30 minutos
  };

  /**
   * El Orquestador gestiona el ciclo de vida y la comprobación de actualizaciones del Service Worker.
   */
  const swOrchestrator = {
    registration: null as ServiceWorkerRegistration | null,

    /**
     * Inicializa todo el sistema.
     */
    init() {
      // 1. Registro inicial en la carga de la página.
      window.addEventListener('load', () => this.register(), { once: true });
      this.setupEventListeners();
    },

    /**
     * Registra el Service Worker y configura el listener 'updatefound'.
     */
    async register() {
      const buildId = (window as any)[CONFIG.BUILD_ID_VAR] || Date.now();
      const swUrl = `${CONFIG.SW_URL}?v=${encodeURIComponent(buildId)}`;

      try {
        console.log('[SW Orchestrator] Registrando Service Worker...');
        this.registration = await navigator.serviceWorker.register(swUrl, { scope: CONFIG.SCOPE });
        console.log('[SW Orchestrator] Service Worker registrado con éxito.');

        this.registration.addEventListener('updatefound', () => {
          console.log('[SW Orchestrator] Nueva versión del Service Worker encontrada.');
          const newWorker = this.registration?.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            // Si el nuevo worker se ha instalado y ya había uno controlando la página,
            // es una actualización lista para ser aplicada.
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[SW Orchestrator] Actualización lista. Despachando evento: sw:update-available');
              window.dispatchEvent(new CustomEvent('sw:update-available'));
            }
          });
        });
      } catch (error) {
        console.error('[SW Orchestrator] Fallo en el registro del Service Worker:', error);
      }
    },
    
    /**
     * Configura los listeners para la detección proactiva y comunicación.
     */
    setupEventListeners() {
      // MEJORA: Buscar actualizaciones cuando el usuario vuelve a la pestaña.
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.registration) {
          console.log('[SW Orchestrator] Tab visible, buscando actualizaciones...');
          this.checkForUpdate();
        }
      });

      // MEJORA: Buscar actualizaciones periódicamente.
      setInterval(() => {
        if (this.registration) {
          console.log('[SW Orchestrator] Chequeo periódico de actualizaciones...');
          this.checkForUpdate();
        }
      }, CONFIG.CHECK_INTERVAL_MS);
      
      // La lógica original sigue siendo válida y necesaria.
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW Orchestrator] Nuevo SW ha tomado el control. Despachando evento: sw:updated');
        window.dispatchEvent(new CustomEvent('sw:updated'));
      });

      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, ...detail } = event.data || {};
        if (!type) return;
        
        console.log(`[SW Orchestrator] Mensaje recibido del SW: ${type}`, detail);
        window.dispatchEvent(new CustomEvent(`sw:${type.toLowerCase()}`, { detail }));
      });

      // MEJORA: Exponer una función de depuración global.
      (window as any).forceSWUpdateCheck = () => this.checkForUpdate();
    },

    /**
     * MEJORA: Llama explícitamente a `registration.update()` para forzar al navegador
     * a buscar una nueva versión del script sw.js en el servidor.
     */
    async checkForUpdate() {
      if (!this.registration) {
        console.warn('[SW Orchestrator] No se puede buscar actualización, el SW no está registrado.');
        return;
      }
      try {
        await this.registration.update();
      } catch (error) {
        console.error('[SW Orchestrator] Fallo al buscar actualización:', error);
      }
    }
  };

  swOrchestrator.init();

})();