// ============================================================================
// 🚀 SCRIPT DE TRANSFORMACIÓN DE IMÁGENES INTELIGENTE v2.2 - ASTRO FUSION
// ============================================================================
// CARACTERÍSTICAS:
// 1. Optimización ultra-avanzada con Sharp
// 2. Generación automática de formatos AVIF y WebP
// 3. Sistema de cache inteligente en raíz del proyecto
// 4. Generación de iconos PWA optimizados
// 5. Detección automática de tipos de imagen
// 6. Placeholders y BlurHash para lazy loading
// 7. Procesamiento directo desde src/assets/images
// 8. Salida optimizada en public/assets/img-op
// 9. Spinner de progreso elegante con ora
// 10. Optimización SVG con SVGO
// ============================================================================

import sharp from 'sharp';
import path from 'path';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import { glob } from 'glob';
import { encode } from 'blurhash';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import ora from 'ora'; // Spinner de progreso elegante
import { optimize as svgoOptimize } from 'svgo'; // Optimización SVG

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ProcessResult {
  successCount: number;
  errorCount: number;
  errors?: string[];
}

export interface PwaIconDef {
  src?: string;
  sizes: string;
  type: string;
  purpose?: string;
}

export interface ProcessedImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
  sources: Record<string, string>;
  placeholder: string | null;
  blurhash: string | null;
  metadata?: Record<string, unknown>;
  pwaIcons?: PwaIconDef[];
}

export interface ImageTypeConfig {
  formats: string[];
  quality: Record<string, number>;
}

export interface PwaConfig {
  iconSizes: number[];
  maskableSizes: number[];
  appleTouchSizes: number[];
  faviconSizes: number[];
}

export interface OptimizationConfig {
  inputDir: string;
  outputDir: string;
  cacheDir: string; // Cache en raíz del proyecto
  formats: {
    avif: { quality: number; effort: number };
    webp: { quality: number };
  };
  defaultSize: ImageDimensions;
  imageTypes: Record<string, ImageTypeConfig>;
  pwa: PwaConfig;
}

export interface CacheEntry {
  hash: string;
  outputFiles: string[];
  timestamp: number;
}

export interface Cache {
  [key: string]: CacheEntry;
}

export interface FormatStats {
  format: string;
  count: number;
  totalSize: number;
  averageSize: number;
}

export interface SpaceSavings {
  originalSize: number;
  optimizedSize: number;
  savings: number;
  savingsPercentage: number;
}

// ============================================================================
// CONFIGURACIÓN ADAPTADA PARA ASTRO
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const CONFIG: OptimizationConfig = {
  inputDir: path.join(PROJECT_ROOT, 'src/assets/images'),
  outputDir: path.join(PROJECT_ROOT, 'public/assets/img-op'),
  cacheDir: path.join(PROJECT_ROOT, '.cache'), // Cache en raíz del proyecto
  formats: {
    avif: { quality: 30, effort: 9 }, // ULTRA OPTIMIZADA
    webp: { quality: 50 }, // Más comprimida
  },
  defaultSize: { width: 800, height: 600 },
  // Configuración avanzada para diferentes tipos de imagen
  imageTypes: {
    hero: { formats: ['avif', 'webp'], quality: { avif: 30, webp: 50 } },
    thumbnail: { formats: ['webp', 'avif'], quality: { webp: 50, avif: 30 } },
    icon: { formats: ['webp', 'avif'], quality: { webp: 50, avif: 30 } },
    background: { formats: ['avif', 'webp'], quality: { avif: 30, webp: 50 } },
  },
  // Configuración de PWA ULTRA-OPTIMIZADA (menos tamaños)
  pwa: {
    iconSizes: [128, 192, 512], // Reducido de 8 a 3 tamaños
    maskableSizes: [192, 512], // Mantener solo 2
    appleTouchSizes: [120, 180], // Reducido de 9 a 2 tamaños
    faviconSizes: [32, 48], // Reducido de 3 a 2 tamaños
  },
};

// ============================================================================
// ORQUESTADOR PRINCIPAL
// ============================================================================

/**
 * Función principal de optimización de imágenes
 */
export async function optimizeImages(): Promise<void> {
  const mainSpinner = ora('🚀 Iniciando optimización ultra-avanzada de imágenes...').start();
  const startTime = Date.now();

  try {
    // Verificar directorios
    if (!existsSync(CONFIG.inputDir)) {
      mainSpinner.info(`📁 Creando directorio de entrada: ${CONFIG.inputDir}`);
      await fs.mkdir(CONFIG.inputDir, { recursive: true });
    }

    if (!existsSync(CONFIG.outputDir)) {
      mainSpinner.info(`📁 Creando directorio de salida: ${CONFIG.outputDir}`);
      await fs.mkdir(CONFIG.outputDir, { recursive: true });
    }

    // Crear directorio de cache si no existe
    if (!existsSync(CONFIG.cacheDir)) {
      await fs.mkdir(CONFIG.cacheDir, { recursive: true });
    }

    // Cargar cache
    const cache = await loadCache();
    mainSpinner.succeed(`💾 Cache cargado: ${Object.keys(cache).length} entradas`);

    // Procesar todas las imágenes
    const result = await processAllImages(cache);

    // Guardar cache
    await saveCache(cache);

    // Generar reporte
    await generateOptimizationReport(result, cache, startTime);

    // Validar resultados
    await validateAllOptimizedImages();

    const duration = Date.now() - startTime;
    mainSpinner.succeed(`✅ Optimización completada exitosamente en ${duration}ms!`);
  } catch (error) {
    mainSpinner.fail('❌ Error durante la optimización');
    console.error(error);
    throw error;
  }
}

// ============================================================================
// PROCESAMIENTO DE IMÁGENES
// ============================================================================

/**
 * Procesa todas las imágenes en el directorio de entrada
 */
async function processAllImages(cache: Cache): Promise<ProcessResult> {
  const result: ProcessResult = { successCount: 0, errorCount: 0, errors: [] };

  try {
    // Buscar todas las imágenes
    const imageFiles = await glob('**/*.{jpg,jpeg,png,gif,svg,webp,avif}', {
      cwd: CONFIG.inputDir,
      absolute: true,
    });

    const spinner = ora(`📸 Encontradas ${imageFiles.length} imágenes para procesar`).start();

    // Procesar cada imagen
    for (const [index, filePath] of imageFiles.entries()) {
      try {
        const relativePath = path.relative(CONFIG.inputDir, filePath);
        const baseName = path.basename(filePath, path.extname(filePath));
        const ext = path.extname(filePath).toLowerCase();

        spinner.text = `[${index + 1}/${imageFiles.length}] Procesando: ${relativePath}`;

        // Verificar si ya está cacheada
        if (await isFileCached(filePath, cache)) {
          continue;
        }

        // Extraer dimensiones del nombre del archivo
        const dimensions = extractDimensionsFromName(baseName) || CONFIG.defaultSize;

        // Detectar tipo de imagen
        const imageType = detectImageType(baseName, dimensions);

        // Generar asset key
        const assetKey = cleanBaseName(baseName);

        // Procesar según el tipo
        if (ext === '.svg') {
          await processSvg(filePath, baseName, dimensions, assetKey, cache);
        } else {
          await processRasterImage(filePath, baseName, dimensions, assetKey, imageType, cache);
        }

        result.successCount++;
      } catch (error) {
        const errorMsg = `Error procesando ${path.relative(CONFIG.inputDir, filePath)}: ${error}`;
        result.errorCount++;
        result.errors?.push(errorMsg);
      }
    }

    spinner.stop();
    return result;
  } catch (error) {
    console.error('❌ Error durante el procesamiento:', error);
    throw error;
  }
}

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Limpia el nombre base removiendo dimensiones
 */
const cleanBaseName = (name: string): string => {
  return name.replace(/-(\d+)[xX](\d+)$/, '');
};

/**
 * Extrae dimensiones del nombre del archivo
 */
const extractDimensionsFromName = (name: string): ImageDimensions | null => {
  const match = name.match(/-(\d+)[xX](\d+)$/);
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  return null;
};

/**
 * Detecta el tipo de imagen basado en el nombre y dimensiones
 */
const detectImageType = (fileName: string, dimensions: ImageDimensions): string => {
  const lowerName = fileName.toLowerCase();

  if (lowerName.includes('hero') || lowerName.includes('banner')) {
    return 'hero';
  }
  if (lowerName.includes('thumb') || lowerName.includes('preview')) {
    return 'thumbnail';
  }
  if (lowerName.includes('icon') || lowerName.includes('logo')) {
    return 'icon';
  }
  if (lowerName.includes('bg') || lowerName.includes('background')) {
    return 'background';
  }

  // Detección por dimensiones
  if (dimensions.width >= 1200 || dimensions.height >= 800) {
    return 'hero';
  }
  if (dimensions.width <= 200 || dimensions.height <= 200) {
    return 'icon';
  }

  return 'general';
};

// ============================================================================
// PROCESAMIENTO DE IMÁGENES RASTER
// ============================================================================

/**
 * Procesa imágenes raster (JPG, PNG, etc.)
 */
async function processRasterImage(
  filePath: string,
  baseName: string,
  dimensions: ImageDimensions,
  assetKey: string,
  imageType: string,
  cache: Cache
): Promise<void> {
  const outputFiles: string[] = [];
  const imageTypeConfig = CONFIG.imageTypes[imageType] || CONFIG.imageTypes.general;

  try {
    // Cargar imagen con Sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Generar formatos optimizados
    for (const format of imageTypeConfig.formats) {
      const outputPath = path.join(CONFIG.outputDir, `${assetKey}.${format}`);
      
      let processedImage = image.clone();

      // Aplicar optimizaciones específicas por formato
      if (format === 'avif') {
        processedImage = processedImage.avif({
          quality: imageTypeConfig.quality.avif || CONFIG.formats.avif.quality,
          effort: CONFIG.formats.avif.effort,
        });
      } else if (format === 'webp') {
        processedImage = processedImage.webp({
          quality: imageTypeConfig.quality.webp || CONFIG.formats.webp.quality,
        });
      }

      // Guardar imagen optimizada
      await processedImage.toFile(outputPath);
      outputFiles.push(outputPath);

      console.log(`  ✅ Generado: ${path.basename(outputPath)}`);
    }

    // Generar placeholder y blurhash
    const placeholder = await generatePlaceholder(image);
    const blurhash = await generateBlurHash(image);

    // Actualizar cache
    await updateCache(filePath, outputFiles, cache);

  } catch (error) {
    console.error(`❌ Error procesando imagen raster ${baseName}:`, error);
    throw error;
  }
}

// ============================================================================
// PROCESAMIENTO DE SVG
// ============================================================================

/**
 * Procesa archivos SVG con optimización SVGO
 */
async function processSvg(
  filePath: string,
  baseName: string,
  dimensions: ImageDimensions,
  assetKey: string,
  cache: Cache
): Promise<void> {
  try {
    const outputPath = path.join(CONFIG.outputDir, `${assetKey}.svg`);
    
    // Leer contenido SVG
    const svgContent = await fs.readFile(filePath, 'utf-8');
    
    // Optimizar con SVGO
    const result = svgoOptimize(svgContent, { 
      path: filePath,
      plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeEditorsNSData',
        'cleanupAttrs',
        'mergeStyles',
        'inlineStyles',
        'minifyStyles',
        'cleanupIds',
        'removeUselessDefs',
        'cleanupNumericValues',
        'convertColors',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        'removeUselessStrokeAndFill',
        'removeViewBox',
        'cleanupEnableBackground',
        'removeHiddenElems',
        'removeEmptyText',
        'convertShapeToPath',
        'convertEllipseToCircle',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        'convertPathData',
        'convertTransform',
        'removeEmptyAttrs',
        'removeEmptyContainers',
        'mergePaths',
        'removeUnusedNS',
        'sortDefsChildren',
        'removeTitle',
        'removeDesc'
      ]
    });
    
    // Guardar SVG optimizado
    await fs.writeFile(outputPath, result.data);
    
    // Actualizar cache
    await updateCache(filePath, [outputPath], cache);
  } catch (error) {
    console.error(`❌ Error procesando SVG ${baseName}:`, error);
    throw error;
  }
}

// ============================================================================
// GENERACIÓN DE ICONOS PWA
// ============================================================================

/**
 * Genera iconos PWA optimizados
 */
async function processPwaIcons(sourcePath: string): Promise<void> {
  try {
    const baseName = path.basename(sourcePath, path.extname(sourcePath));
    const image = sharp(sourcePath);

    // Generar iconos de diferentes tamaños
    for (const size of CONFIG.pwa.iconSizes) {
      const outputPath = path.join(CONFIG.outputDir, `icons/icon-${size}x${size}.webp`);
      
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      
      await image
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 80 })
        .toFile(outputPath);
    }

    // Generar iconos maskable
    for (const size of CONFIG.pwa.maskableSizes) {
      const outputPath = path.join(CONFIG.outputDir, `icons/icon-${size}x${size}-maskable.webp`);
      
      await image
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 80 })
        .toFile(outputPath);
    }

    // Generar iconos Apple Touch
    for (const size of CONFIG.pwa.appleTouchSizes) {
      const outputPath = path.join(CONFIG.outputDir, `icons/apple-touch-icon-${size}x${size}.webp`);
      
      await image
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 80 })
        .toFile(outputPath);
    }

    // Generar favicons
    for (const size of CONFIG.pwa.faviconSizes) {
      const outputPath = path.join(CONFIG.outputDir, `icons/favicon-${size}x${size}.webp`);
      
      await image
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 80 })
        .toFile(outputPath);
    }

    console.log(`  ✅ Iconos PWA generados para: ${baseName}`);
  } catch (error) {
    console.error(`❌ Error generando iconos PWA:`, error);
    throw error;
  }
}

// ============================================================================
// SISTEMA DE CACHE
// ============================================================================

/**
 * Carga el cache desde archivo en la raíz del proyecto
 */
async function loadCache(): Promise<Cache> {
  const cachePath = path.join(CONFIG.cacheDir, 'image-optimization-cache.json');
  
  try {
    if (existsSync(cachePath)) {
      const cacheData = await fs.readFile(cachePath, 'utf-8');
      return JSON.parse(cacheData);
    }
  } catch (error) {
    console.warn('⚠️  Error cargando cache, iniciando nuevo:', error);
  }
  
  return {};
}

/**
 * Guarda el cache en archivo en la raíz del proyecto
 */
async function saveCache(cache: Cache): Promise<void> {
  const cachePath = path.join(CONFIG.cacheDir, 'image-optimization-cache.json');
  
  try {
    await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
    console.log('💾 Cache guardado exitosamente en la raíz del proyecto');
  } catch (error) {
    console.error('❌ Error guardando cache:', error);
  }
}

/**
 * Calcula el hash de un archivo
 */
async function getFileHash(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Verifica si un archivo está cacheado
 */
async function isFileCached(sourcePath: string, cache: Cache): Promise<boolean> {
  const relativePath = path.relative(CONFIG.inputDir, sourcePath);
  const entry = cache[relativePath];
  
  if (!entry) return false;
  
  // Verificar que el hash del archivo original coincida
  const currentHash = await getFileHash(sourcePath);
  if (entry.hash !== currentHash) return false;
  
  // Verificar que todos los archivos de salida existan físicamente
  for (const outputFile of entry.outputFiles) {
    const outputPath = path.join(CONFIG.outputDir, outputFile);
    try {
      await fs.access(outputPath);
    } catch {
      // Si algún archivo de salida no existe, no está cacheado
      return false;
    }
  }
  
  return true;
}

/**
 * Actualiza el cache con nuevos archivos
 */
async function updateCache(sourcePath: string, outputFiles: string[], cache: Cache): Promise<void> {
  const relativePath = path.relative(CONFIG.inputDir, sourcePath);
  const hash = await getFileHash(sourcePath);
  
  cache[relativePath] = {
    hash,
    outputFiles: outputFiles.map(f => path.relative(CONFIG.outputDir, f)),
    timestamp: Date.now(),
  };
}

// ============================================================================
// GENERACIÓN DE PLACEHOLDERS Y BLURHASH
// ============================================================================

/**
 * Genera un placeholder base64
 */
async function generatePlaceholder(image: sharp.Sharp): Promise<string | null> {
  try {
    const buffer = await image
      .resize(20, 20, { fit: 'cover' })
      .jpeg({ quality: 30 })
      .toBuffer();
    
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.warn('⚠️  Error generando placeholder:', error);
    return null;
  }
}

/**
 * Genera un blurhash
 */
async function generateBlurHash(image: sharp.Sharp): Promise<string | null> {
  try {
    const { data, info } = await image
      .resize(32, 32, { fit: 'cover' })
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    const hash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
    return hash;
  } catch (error) {
    console.warn('⚠️  Error generando blurhash:', error);
    return null;
  }
}

// ============================================================================
// REPORTES Y ESTADÍSTICAS
// ============================================================================

/**
 * Genera reporte de optimización
 */
async function generateOptimizationReport(
  finalResult: ProcessResult,
  cache: Cache,
  startTime: number
): Promise<void> {
  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log('\n' + '='.repeat(50));
  console.log('📊 REPORTE FINAL DE OPTIMIZACIÓN 📊');
  console.log('='.repeat(50));
  console.log(`⏱️  Duración total: ${(duration / 1000).toFixed(2)}s`);
  console.log(`✅ Imágenes procesadas: ${finalResult.successCount}`);
  console.log(`❌ Errores encontrados: ${finalResult.errorCount}`);
  console.log(`💾 Entradas en cache: ${Object.keys(cache).length}`);

  if (finalResult.errors && finalResult.errors.length > 0) {
    console.log('\n❌ Detalle de errores:');
    finalResult.errors.forEach(error => console.log(`  - ${error}`));
  }

  // Calcular estadísticas de formatos
  const formatStats = await calculateFormatStats();
  console.log('\n📈 Estadísticas por formato:');
  formatStats.forEach(stat => {
    console.log(`  ${stat.format.toUpperCase()}: ${stat.count} archivos, ${formatBytes(stat.totalSize)} total`);
  });

  // Calcular ahorro de espacio
  const spaceSavings = await calculateSpaceSavings();
  console.log('\n💾 Ahorro de espacio:');
  console.log(`  Original: ${formatBytes(spaceSavings.originalSize)}`);
  console.log(`  Optimizado: ${formatBytes(spaceSavings.optimizedSize)}`);
  console.log(`  Ahorro: ${formatBytes(spaceSavings.savings)} (${spaceSavings.savingsPercentage.toFixed(1)}%)`);
  console.log('='.repeat(50) + '\n');
}

/**
 * Calcula estadísticas por formato
 */
async function calculateFormatStats(): Promise<FormatStats[]> {
  const stats: FormatStats[] = [];
  const formats = ['avif', 'webp', 'svg'];

  for (const format of formats) {
    const files = await glob(`**/*.${format}`, { cwd: CONFIG.outputDir, absolute: true });
    let totalSize = 0;

    for (const file of files) {
      const stat = await fs.stat(file);
      totalSize += stat.size;
    }

    stats.push({
      format,
      count: files.length,
      totalSize,
      averageSize: files.length > 0 ? totalSize / files.length : 0,
    });
  }

  return stats;
}

/**
 * Calcula ahorro de espacio
 */
async function calculateSpaceSavings(): Promise<SpaceSavings> {
  const inputFiles = await glob('**/*.{jpg,jpeg,png,gif,svg}', {
    cwd: CONFIG.inputDir,
    absolute: true,
  });

  const outputFiles = await glob('**/*.{avif,webp,svg}', {
    cwd: CONFIG.outputDir,
    absolute: true,
  });

  let originalSize = 0;
  let optimizedSize = 0;

  for (const file of inputFiles) {
    const stat = await fs.stat(file);
    originalSize += stat.size;
  }

  for (const file of outputFiles) {
    const stat = await fs.stat(file);
    optimizedSize += stat.size;
  }

  const savings = originalSize - optimizedSize;
  const savingsPercentage = (savings / originalSize) * 100;

  return {
    originalSize,
    optimizedSize,
    savings,
    savingsPercentage,
  };
}

/**
 * Formatea bytes en formato legible
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ============================================================================
// VALIDACIÓN
// ============================================================================

/**
 * Valida todas las imágenes optimizadas
 */
async function validateAllOptimizedImages(): Promise<void> {
  const validationSpinner = ora('🔍 Validando imágenes optimizadas...').start();
  
  try {
    const optimizedFiles = await glob('**/*.{avif,webp,svg}', {
      cwd: CONFIG.outputDir,
      absolute: true,
    });

    let validCount = 0;
    let invalidCount = 0;

    for (const file of optimizedFiles) {
      try {
        const image = sharp(file);
        await image.metadata();
        validCount++;
      } catch (error) {
        console.error(`❌ Imagen inválida: ${path.relative(CONFIG.outputDir, file)}`);
        invalidCount++;
      }
    }

    validationSpinner.succeed(`✅ Validación completada: ${validCount} válidas, ${invalidCount} inválidas`);
  } catch (error) {
    validationSpinner.fail('❌ Error durante la validación');
    console.error(error);
  }
}

// ============================================================================
// EXPORTACIÓN PRINCIPAL
// ============================================================================

export default optimizeImages;

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeImages().catch(console.error);
} 