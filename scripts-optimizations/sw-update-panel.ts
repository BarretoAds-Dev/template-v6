// scripts-optimizations/sw-update-panel.ts (Versión Ultra Mejorada)

const PANEL_ID = 'sw-update-panel';

function createPanel(): HTMLDivElement {
  if (document.getElementById(PANEL_ID)) {
    return document.getElementById(PANEL_ID) as HTMLDivElement;
  }

  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  // Estilos mejorados para feedback visual
  panel.innerHTML = `
    <div style="position:fixed; left:50%; bottom:24px; transform:translateX(-50%); z-index:10001; transition: transform 0.4s ease-out;">
      <div style="backdrop-filter:blur(10px) saturate(1.5); background:rgba(23, 31, 42, 0.9); color:#e5e7eb; padding:1em 1.2em; border-radius:14px; box-shadow:0 10px 40px rgba(0,0,0,.3); display:flex; align-items:center; gap:1em; max-width:calc(100vw - 40px); border:1px solid rgba(255,255,255,.1);">
        <div id="sw-icon-wrapper" style="flex-shrink:0;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#2dd4bf" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14v-2h2v2h-2zm0-4V7h2v5h-2z"/></svg>
        </div>
        <span style="font-size:15px; line-height:1.45; user-select:none">Hay una nueva versión de la web disponible.</span>
        <div style="display:flex; gap:.7em; margin-left:auto;">
          <a id="sw-refresh" style="font-size:14px; background:#14b8a6; color:#f0fdfa; border:0; border-radius:10px; padding:0.6em 1em; font-weight:700; cursor:pointer; text-decoration:none; display:inline-block; transition: all 0.2s ease;">Actualizar</a>
          <a id="sw-later" style="font-size:14px; background:transparent; color:#9ca3af; border:1px solid #4b5563; border-radius:10px; padding:0.6em 1em; cursor:pointer; text-decoration:none; display:inline-block; transition: all 0.2s ease;">Más tarde</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(panel);
  return panel as HTMLDivElement;
}

function wirePanel(panel: HTMLDivElement): void {
  const refreshBtn = panel.querySelector<HTMLAnchorElement>('#sw-refresh');
  const laterBtn = panel.querySelector<HTMLAnchorElement>('#sw-later');
  const iconWrapper = panel.querySelector<HTMLDivElement>('#sw-icon-wrapper');

  const handleRefreshClick = async (e: MouseEvent) => {
    e.preventDefault();
    if (refreshBtn?.classList.contains('is-loading')) return;

    // --- MEJORA: Feedback Visual ---
    refreshBtn?.classList.add('is-loading');
    refreshBtn!.textContent = 'Actualizando...';
    laterBtn?.setAttribute('style', `${laterBtn.style.cssText}; opacity:0.5; pointer-events:none;`);
    if (iconWrapper) {
      iconWrapper.innerHTML = `<svg style="animation:spin 1s linear infinite;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"></path><style>@keyframes spin{to{transform:rotate(360deg)}}</style></svg>`;
    }
    
    try {
      // --- MEJORA: La responsabilidad de limpieza se movió al SW. El cliente solo pide la activación. ---
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg?.waiting) {
        // Le decimos al nuevo SW que tome el control.
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        // La recarga de la página se gestionará con el evento 'controllerchange'.
      } else {
        // Caso raro: el SW 'waiting' desapareció. Forzamos recarga.
        window.location.reload();
      }
    } catch (err) {
      console.error('Fallo al solicitar SKIP_WAITING:', err);
      // En caso de error, simplemente recargamos como fallback.
      window.location.reload();
    }
  };

  const handleLaterClick = (e: MouseEvent) => {
    e.preventDefault();
    panel.style.transform = "translateX(-50%) translateY(200px)";
    setTimeout(() => panel.remove(), 400);
  };
  
  // --- MEJORA: Se eliminó { passive: true } porque se usa preventDefault ---
  refreshBtn?.addEventListener('click', handleRefreshClick);
  laterBtn?.addEventListener('click', handleLaterClick);
}

function showUpdatePanel(): void {
  const panel = createPanel();
  wirePanel(panel);
  panel.style.transform = "translateX(-50%) translateY(0)"; // Dispara la animación de entrada
}

// --- Event Listeners ---
window.addEventListener('sw:update-available', showUpdatePanel);

window.addEventListener('sw:updated', () => {
    // El nuevo SW ha tomado el control. Es hora de recargar.
    location.reload();
});