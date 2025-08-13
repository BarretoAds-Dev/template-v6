/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}

// Tipos personalizados para View Transitions
declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }

}
