declare global {
  interface WindowEventMap {
    'sw:update-available': CustomEvent<void>;
    'sw:updated': CustomEvent<void>;
    'sw:page-updated': CustomEvent<{ url: string }>;
    'sw:asset-updated': CustomEvent<{ url: string }>;
    'sw:error': CustomEvent<{ error: string; url?: string }>;
  }
}
export {};

