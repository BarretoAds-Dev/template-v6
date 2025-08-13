// Cliente: registro del SW + broadcasting de eventos. La UI la maneja sw-update-panel.ts
if ('serviceWorker' in navigator) {
  const registerSW = async () => {
    const buildId = (window as any).__BUILD_ID__ || Date.now();
    const swUrl = `/sw.js?v=${encodeURIComponent(buildId)}`;
    try {
      const reg = await navigator.serviceWorker.register(swUrl, { scope: '/' });
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            window.dispatchEvent(new CustomEvent('sw:update-available'));
          }
        });
      });
    } catch (error) {
      console.error('Fallo en el registro del Service Worker:', error);
    }
  };

  window.addEventListener('load', registerSW, { once: true });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.dispatchEvent(new CustomEvent('sw:updated'));
  });

  navigator.serviceWorker.addEventListener('message', (event) => {
    const { type, url, error } = event.data || {};
    if (!type) return;
    if (type === 'PAGE_UPDATED') window.dispatchEvent(new CustomEvent('sw:page-updated', { detail: { url } }));
    if (type === 'ASSET_UPDATED') window.dispatchEvent(new CustomEvent('sw:asset-updated', { detail: { url } }));
    if (type === 'SW_ERROR') window.dispatchEvent(new CustomEvent('sw:error', { detail: { error, url } }));
  });
}