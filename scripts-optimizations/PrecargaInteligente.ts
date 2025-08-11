// ============================================================================
// 🚀 SCRIPT DE PRELOADS ULTRA OPTIMIZADO v3.1 - ASTRO TAILWIND FUSION
// ============================================================================
// MEJORAS v3.1:
// 1. Eliminación de duplicaciones innecesarias
// 2. Orden estratégico optimizado: CSS crítico → CSS → JS → Fuentes
// 3. Sin preconnect interno, sin meta description
// 4. Sin prefetch duplicados de preloads
// 5. CSS crítico inline como primera prioridad
// 6. Eliminación de preloads de imágenes eager
// 7. Comunicación SW ultra minificada
// 8. Estrategias diferenciadas por tipo de recurso
// 9. Optimizado para Astro + Tailwind CSS
// 10. Spinner de progreso elegante con ora
// 11. Colores y reportes mejorados con chalk
// 12. Parsing HTML como respaldo con cheerio
// ============================================================================

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import ora from 'ora'; // Spinner de progreso elegante
import chalk from 'chalk'; // Colores y reportes mejorados
import * as cheerio from 'cheerio'; // Parsing HTML como respaldo

// ============================================================================
// 🏗️ TIPOS E INTERFACES
// ============================================================================

export interface DetectedResources {
  css: string[];
  js: string[];
  pageJs: string[];
  fonts: string[];
}

export type PreloadStrategy = 'aggressive' | 'moderate' | 'conservative';

export interface FontConfig {
  family: string;
  weights: string[];
  subsets: string[];
  style: 'normal' | 'italic';
}

export interface Logger {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
}

export interface DirectoryConfig {
  project: string;
  dist: string;
  possibleAstroPaths: string[];
}

export interface FontSourceConfig {
  targetFonts: FontConfig[];
}

export interface PreloadConfig {
  directories: DirectoryConfig;
  targetFile: string;
  fontSource: FontSourceConfig;
  preloadStrategy: PreloadStrategy;
}

export interface PreloadMarkers {
  start: string;
  end: string;
}

export interface PreloadConstants {
  preloadMarkers: PreloadMarkers;
}

// ============================================================================
// 🛠️ CONFIGURACIÓN ULTRA OPTIMIZADA PARA ASTRO
// ============================================================================

const logger: Logger = {
  log: (...args) => console.log(chalk.blue('⚡ [LOG]'), ...args),
  warn: (...args) => console.warn(chalk.yellow('⚠️ [WARN]'), ...args),
  error: (...args) => console.error(chalk.red('❌ [ERROR]'), ...args),
  debug: (...args) => console.log(chalk.gray('🔍 [DEBUG]'), ...args),
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const CONFIG: PreloadConfig = {
  directories: {
    project: PROJECT_ROOT,
    dist: path.join(PROJECT_ROOT, 'dist'),
    possibleAstroPaths: [
      path.join(PROJECT_ROOT, 'dist', '_astro'),
      path.join(PROJECT_ROOT, 'dist', 'assets'),
      path.join(PROJECT_ROOT, 'dist'),
    ],
  },
  targetFile: path.join(PROJECT_ROOT, 'src', 'layouts', 'MetaHead.astro'),
  fontSource: {
    targetFonts: [
      {
        family: 'inter',
        weights: ['400', '500', '600', '700'],
        subsets: ['latin'],
        style: 'normal',
      },
    ],
  },
  preloadStrategy: 'moderate',
};

const CONSTANTS: PreloadConstants = {
  preloadMarkers: {
    start: '{/* 🚀🚀🚀 Preloads Content Optimizations Start 🚀🚀🚀 */}',
    end: '{/* 🚀 Preloads Content Optimizations End 🚀 */}',
  },
};

// ============================================================================
// 🔍 DETECCIÓN DE RECURSOS OPTIMIZADA PARA ASTRO
// ============================================================================

/**
 * Encuentra el directorio válido de Astro con archivos CSS/JS
 */
async function findValidAstroDirectory(): Promise<string | null> {
  logger.debug('🔍 Buscando directorio con archivos CSS/JS...');

  for (const astroPath of CONFIG.directories.possibleAstroPaths) {
    try {
      const files = await glob('**/*.{css,js}', { cwd: astroPath, absolute: false });
      if (files.length > 0) {
        logger.log(`✅ Directorio válido encontrado: ${astroPath}`);
        return astroPath;
      }
    } catch (error) {
      logger.debug(`❌ Directorio no válido: ${astroPath}`);
    }
  }

  logger.warn('⚠️ No se encontró directorio válido de Astro');
  return null;
}

/**
 * Detecta archivos CSS críticos
 */
async function detectCriticalCssFiles(astroDir: string): Promise<string[]> {
  try {
    const cssFiles = await glob('**/*.css', { cwd: astroDir, absolute: false });
    logger.log(`📄 CSS detectados: ${cssFiles.length} archivos`);
    return cssFiles;
  } catch (error) {
    logger.error('❌ Error detectando archivos CSS:', error);
    return [];
  }
}

/**
 * Detecta archivos JavaScript críticos
 */
async function detectCriticalJsFiles(astroDir: string): Promise<string[]> {
  try {
    const jsFiles = await glob('**/*.js', { cwd: astroDir, absolute: false });
    logger.log(`📜 JS detectados: ${jsFiles.length} archivos`);
    return jsFiles;
  } catch (error) {
    logger.error('❌ Error detectando archivos JS:', error);
    return [];
  }
}

/**
 * Detecta archivos JavaScript de página específicos
 */
async function detectPageJsFiles(astroDir: string): Promise<string[]> {
  try {
    const pageJsFiles = await glob('**/page.*.js', { cwd: astroDir, absolute: false });
    logger.log(`📄 JS de página detectados: ${pageJsFiles.length} archivos`);
    return pageJsFiles;
  } catch (error) {
    logger.error('❌ Error detectando archivos JS de página:', error);
    return [];
  }
}

/**
 * Detecta archivos de fuentes de Fontsource
 */
async function detectFontsourceFiles(astroDir: string): Promise<string[]> {
  try {
    const fontFiles = await glob('**/*.{woff2,woff,ttf}', { cwd: astroDir, absolute: false });
    
    // Filtrar fuentes específicas de Fontsource
    const fontsourceFiles = fontFiles.filter(file => {
      const fileName = path.basename(file);
      return CONFIG.fontSource.targetFonts.some(font => 
        fileName.includes(font.family.toLowerCase())
      );
    });

    logger.log(`🔤 Fuentes Fontsource detectadas: ${fontsourceFiles.length} archivos`);
    return fontsourceFiles;
  } catch (error) {
    logger.error('❌ Error detectando archivos de fuentes:', error);
    return [];
  }
}

/**
 * Detecta recursos desde HTML como respaldo
 */
async function detectFromHtml(htmlPath: string): Promise<DetectedResources> {
  try {
    const htmlContent = await fs.readFile(htmlPath, 'utf-8');
    const $ = cheerio.load(htmlContent);
    const resources: DetectedResources = { css: [], js: [], pageJs: [], fonts: [] };

    // Encontrar todos los stylesheets principales
    $('link[rel="stylesheet"]').each((_, el) => {
      const href = $(el).attr('href');
      if (href) resources.css.push(href);
    });

    // Encontrar todos los scripts de tipo módulo
    $('script[type="module"]').each((_, el) => {
      const src = $(el).attr('src');
      if (src) {
        if (src.includes('page.')) {
          resources.pageJs.push(src);
        } else {
          resources.js.push(src);
        }
      }
    });
    
    // Encontrar todas las precargas de fuentes
    $('link[rel="preload"][as="font"]').each((_, el) => {
      const href = $(el).attr('href');
      if (href) resources.fonts.push(href);
    });

    logger.log(chalk.green('✅ Recursos detectados desde HTML de respaldo'));
    return resources;
  } catch (error) {
    logger.error('❌ Error detectando recursos desde HTML:', error);
    return { css: [], js: [], pageJs: [], fonts: [] };
  }
}

/**
 * Detecta todos los recursos críticos
 */
async function detectCriticalResources(): Promise<DetectedResources> {
  logger.log('🔍 Iniciando detección de recursos críticos...');

  const astroDir = await findValidAstroDirectory();
  if (!astroDir) {
    logger.warn('⚠️ No se pudo encontrar directorio de Astro, intentando parsing HTML...');
    const htmlPath = path.join(CONFIG.directories.dist, 'index.html');
    return await detectFromHtml(htmlPath);
  }

  const [cssFiles, jsFiles, pageJsFiles, fontFiles] = await Promise.all([
    detectCriticalCssFiles(astroDir),
    detectCriticalJsFiles(astroDir),
    detectPageJsFiles(astroDir),
    detectFontsourceFiles(astroDir),
  ]);

  const resources: DetectedResources = {
    css: cssFiles,
    js: jsFiles,
    pageJs: pageJsFiles,
    fonts: fontFiles,
  };

  logger.log('📊 Resumen de recursos detectados:');
  logger.log(`  📄 CSS: ${resources.css.length}`);
  logger.log(`  📜 JS: ${resources.js.length}`);
  logger.log(`  📄 JS de página: ${resources.pageJs.length}`);
  logger.log(`  🔤 Fuentes: ${resources.fonts.length}`);

  return resources;
}

// ============================================================================
// 🚀 GENERACIÓN DE PRELOADS ULTRA OPTIMIZADOS
// ============================================================================

/**
 * Genera preloads ultra optimizados
 */
function generateUltraOptimizedPreloads(resources: DetectedResources): string {
  logger.log('🚀 Generando preloads ultra optimizados...');

  const preloads: string[] = [];

  // 1. CSS CRÍTICO INLINE - MÁXIMA PRIORIDAD
  preloads.push(`{/* 🎨 CSS CRÍTICO INLINE - MÁXIMA PRIORIDAD */}`);
  preloads.push(`<style is:inline id="critical-css">`);
  preloads.push(`  *, *::before, *::after {`);
  preloads.push(`    box-sizing: border-box;`);
  preloads.push(`    -ms-overflow-style: none;`);
  preloads.push(`    scrollbar-width: none;`);
  preloads.push(`  }`);
  preloads.push(`  ::-webkit-scrollbar {`);
  preloads.push(`    display: none;`);
  preloads.push(`  }`);
  preloads.push(`  html {`);
  preloads.push(`    min-height: 100%;`);
  preloads.push(`    scroll-behavior: smooth;`);
  preloads.push(`    scrollbar-gutter: stable;`);
  preloads.push(`    background-color: #f4f4f5;`);
  preloads.push(`    color: #020618;`);
  preloads.push(`    text-size-adjust: 100%;`);
  preloads.push(`    font-size: clamp(1rem, 1vw, 2rem);`);
  preloads.push(`    -webkit-tap-highlight-color: transparent;`);
  preloads.push(`    font-variant-alternates: normal;`);
  preloads.push(`    font-stretch: normal;`);
  preloads.push(`    font-display: swap;`);
  preloads.push(`    text-rendering: optimizeSpeed;`);
  preloads.push(`    font-weight: 400;`);
  preloads.push(`    font-size-adjust: 0.5;`);
  preloads.push(`    ascent-override: 90%;`);
  preloads.push(`    descent-override: 20%;`);
  preloads.push(`    line-gap-override: 0%;`);
  preloads.push(`  }`);
  preloads.push(`  ::selection {`);
  preloads.push(`    background-color: rgb(59 130 246);`);
  preloads.push(`    color: white;`);
  preloads.push(`  }`);
  preloads.push(`  main {`);
  preloads.push(`    container-type: inline-size;`);
  preloads.push(`    container-name: main-layout;`);
  preloads.push(`  }`);
  preloads.push(`</style>`);

  // 2. JavaScript Crítico (index*.js)
  if (resources.js.length > 0) {
    const indexJs = resources.js.find(file => file.includes('index'));
    if (indexJs) {
      preloads.push(`{/* ⚡ JavaScript Crítico (index*.js) */}`);
      preloads.push(`<link rel="modulepreload" href="/_astro/${indexJs}" as="script" fetchpriority="high">`);
      preloads.push(`<script type="module" src="/_astro/${indexJs}" fetchpriority="high"></script>`);
    }
  }

  // 3. JavaScript de Página (page*.js)
  if (resources.pageJs.length > 0) {
    preloads.push(`{/* 📄 JavaScript de Página (page*.js) */}`);
    resources.pageJs.forEach(pageJs => {
      preloads.push(`<script type="module" src="/_astro/${pageJs}" defer></script>`);
    });
  }

  // 4. CSS no crítico
  if (resources.css.length > 0) {
    preloads.push(`{/* 🎨 CSS no crítico */}`);
    resources.css.forEach(cssFile => {
      preloads.push(`<link rel="preload" href="/_astro/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'">`);
    });
  }

  // 5. Fuentes críticas
  if (resources.fonts.length > 0) {
    preloads.push(`{/* 🔤 Fuentes críticas */}`);
    resources.fonts.forEach(fontFile => {
      const ext = path.extname(fontFile);
      const format = ext === '.woff2' ? 'woff2' : ext === '.woff' ? 'woff' : 'truetype';
      preloads.push(`<link rel="preload" href="/_astro/${fontFile}" as="font" type="font/${format}" crossorigin>`);
    });
  }

  return preloads.join('\n');
}

// ============================================================================
// 🔧 FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Escapa caracteres especiales para regex
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Genera reporte final con colores
 */
function generateFinalReport(resources: DetectedResources, duration: number): void {
  console.log(chalk.bold.green('\n' + '='.repeat(60)));
  console.log(chalk.bold.green('✅ OPTIMIZACIÓN DE PRELOADS COMPLETADA ✅'));
  console.log(chalk.bold.green('='.repeat(60)));
  console.log(chalk.bold('Recursos inyectados en el Head:'));
  
  if(resources.css.length > 0) console.log(chalk.cyan(`  🎨 ${resources.css.length} Stylesheet(s)`));
  if(resources.js.length > 0) console.log(chalk.yellow(`  ⚡ ${resources.js.length} Script(s)`));
  if(resources.pageJs.length > 0) console.log(chalk.magenta(`  📄 ${resources.pageJs.length} Script(s) de página`));
  if(resources.fonts.length > 0) console.log(chalk.green(`  🔤 ${resources.fonts.length} Fuente(s)`));
  
  console.log(chalk.gray(`\n⏱️  Duración: ${(duration / 1000).toFixed(2)}s`));
  console.log(chalk.gray('🎯 Estrategia: Ultra optimizada para Astro + Tailwind'));
  console.log(chalk.bold.green('='.repeat(60) + '\n'));
}

/**
 * Inyecta preloads en el archivo MetaHead.astro
 */
async function injectPreloads(filePath: string, preloadHtml: string): Promise<void> {
  try {
    logger.log(`📝 Inyectando preloads en: ${path.basename(filePath)}`);

    // Leer archivo
    const content = await fs.readFile(filePath, 'utf-8');

    // Crear marcadores de inicio y fin
    const startMarker = CONSTANTS.preloadMarkers.start;
    const endMarker = CONSTANTS.preloadMarkers.end;

    // Buscar marcadores existentes
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);

    let newContent: string;

    if (startIndex !== -1 && endIndex !== -1) {
      // Reemplazar contenido existente
      const beforePreloads = content.substring(0, startIndex);
      const afterPreloads = content.substring(endIndex + endMarker.length);
      
      newContent = `${beforePreloads}${startMarker}\n${preloadHtml}\n${endMarker}${afterPreloads}`;
      
      logger.log('✅ Preloads existentes actualizados');
    } else {
      // Insertar después del primer <head>
      const headIndex = content.indexOf('<head>');
      if (headIndex !== -1) {
        const insertIndex = headIndex + '<head>'.length;
        const beforeHead = content.substring(0, insertIndex);
        const afterHead = content.substring(insertIndex);
        
        newContent = `${beforeHead}\n  ${startMarker}\n  ${preloadHtml}\n  ${endMarker}\n  ${afterHead}`;
        
        logger.log('✅ Nuevos preloads insertados');
      } else {
        throw new Error('No se encontró la etiqueta <head> en el archivo');
      }
    }

    // Escribir archivo
    await fs.writeFile(filePath, newContent, 'utf-8');
    logger.log('✅ Archivo actualizado exitosamente');

  } catch (error) {
    logger.error('❌ Error inyectando preloads:', error);
    throw error;
  }
}

// ============================================================================
// 🎯 FUNCIÓN PRINCIPAL
// ============================================================================

/**
 * Ejecuta la optimización ultra de preloads
 */
export async function runUltraPreloadOptimization(): Promise<void> {
  console.log(chalk.bold.yellow('\n' + '='.repeat(60)));
  console.log(chalk.bold.yellow('🚀 INICIANDO OPTIMIZACIÓN DE PRELOADS v3.1 🚀'));
  console.log(chalk.bold.yellow('='.repeat(60)));

  const mainSpinner = ora('Analizando recursos críticos...').start();
  const startTime = Date.now();

  try {
    // 1. Detectar recursos críticos
    mainSpinner.text = '🔍 Detectando recursos críticos...';
    const resources = await detectCriticalResources();
    mainSpinner.succeed(chalk.green('Recursos críticos detectados'));

    // 2. Generar preloads optimizados
    const preloadSpinner = ora('🚀 Generando preloads ultra optimizados...').start();
    const preloadHtml = generateUltraOptimizedPreloads(resources);
    preloadSpinner.succeed(chalk.green('Preloads generados'));

    // 3. Inyectar en MetaHead.astro
    const injectSpinner = ora(`📝 Inyectando en ${chalk.cyan(path.basename(CONFIG.targetFile))}...`).start();
    await injectPreloads(CONFIG.targetFile, preloadHtml);
    injectSpinner.succeed(chalk.green('Inyección completada'));

    // 4. Reporte final
    const duration = Date.now() - startTime;
    generateFinalReport(resources, duration);

  } catch (error) {
    mainSpinner.fail(chalk.red('Error durante la optimización'));
    logger.error('❌ Error durante la optimización:', error);
    throw error;
  }
}

// ============================================================================
// EXPORTACIÓN PRINCIPAL
// ============================================================================

export default runUltraPreloadOptimization;

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runUltraPreloadOptimization().catch(console.error);
} 