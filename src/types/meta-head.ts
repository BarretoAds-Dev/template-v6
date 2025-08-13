import type {
  AdvancedPropertyData,
  AdvancedGeoData,
  AdvancedArticleData,
  UserIntent,
  SearchIntent,
} from '@/config/globalSEOconfig';
import type { PageType } from '@/types/layout';

export interface MetaHeadProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  pageType?: PageType;

  articleData?: AdvancedArticleData;
  serviceData?: {
    type: string;
    category?: string;
    location?: string;
    features?: string[];
    benefits?: string[];
    price?: string;
    duration?: string;
    targetAudience?: string[];
  };
  propertyData?: AdvancedPropertyData;
  geoData?: AdvancedGeoData;
  userIntent?: UserIntent;
  searchIntent?: SearchIntent;

  aiConfig?: {
    enableAllEngines?: boolean;
    customInstructions?: Record<string, string>;
    allowTraining?: boolean;
    optimizationLevel?: 'basic' | 'advanced' | 'ultra';
    intentOptimization?: boolean;
  };
  performanceConfig?: {
    preloadCriticalCSS?: boolean;
    preloadFonts?: boolean;
    preloadImages?: boolean;
    enableCriticalInline?: boolean;
    optimizeImages?: boolean;
  };
  serpFeatures?: {
    enableFeaturedSnippets?: boolean;
    enablePeopleAlsoAsk?: boolean;
    enableLocalPack?: boolean;
    enableKnowledgeGraph?: boolean;
    enableRichResults?: boolean;
  };
  eeatConfig?: {
    highlightExperience?: boolean;
    showcaseExpertise?: boolean;
    demonstrateAuthority?: boolean;
    buildTrust?: boolean;
  };
  semanticConfig?: {
    enableEntityLinking?: boolean;
    optimizeTopicClusters?: boolean;
    enhanceSemanticKeywords?: boolean;
  };
}

