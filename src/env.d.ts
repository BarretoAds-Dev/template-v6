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
  
  interface AnchorHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface ImgHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface DivHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface H1HTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface H2HTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface PHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface CodeHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface FigureHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface HtmlHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
  
  interface MainHTMLAttributes {
    'transition:name'?: string;
    'transition:animate'?: 'fade' | 'slide' | 'scale' | 'persist' | 'none';
    'transition:persist'?: boolean;
    'transition:scope'?: string;
    'transition:duration'?: string;
    'transition:delay'?: string;
    'transition:easing'?: string;
  }
}
