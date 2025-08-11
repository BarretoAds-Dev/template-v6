// ============================================================================
// 🚀 MASTER SEO CONFIG - ULTRA HYPER ADVANCED TEMPLATE (v7.0)
// ============================================================================
// 
// 🎯 CONFIGURACIÓN ULTRA-AVANZADA PARA SEO, AEO, GSO, INTENT, IA, AIO
// 
// 📋 INSTRUCCIONES DE CONFIGURACIÓN:
// 1. MODIFICA SOLO LA SECCIÓN "CONFIGURACIÓN EDITABLE" (líneas 20-200)
// 2. NO TOQUES NADA DESPUÉS DE LA LÍNEA 200
// 3. CAMBIA IS_PRODUCTION_READY A 'true' CUANDO ESTÉS LISTO PARA PRODUCCIÓN
// 
// 🎯 OPTIMIZACIONES INCLUIDAS:
// - User Intent Detection avanzado con ML
// - Search Intent Mapping preciso
// - AEO (Answer Engine Optimization) ultra-agresivo
// - GSO (Generative Search Optimization) con LLM específico
// - SERP Features targeting avanzado
// - Schema Markup dinámico y contextual
// - Performance SEO con Core Web Vitals
// - Local SEO con geolocalización avanzada
// - E-E-A-T (Experience, Expertise, Authority, Trust) optimization
// - Semantic SEO con entity linking
// ============================================================================

// ============================================================================
// 🎯 CONFIGURACIÓN EDITABLE - MODIFICA SOLO ESTA SECCIÓN
// ============================================================================
// 
// ⚠️  IMPORTANTE: Solo modifica las líneas de abajo. NO toques nada después de la línea 200
// 
// ============================================================================

// ============================================================================
// 1. 🎯 CONTROL DE PRODUCCIÓN
// ============================================================================
// Cambia a 'true' cuando estés listo para producción
export const IS_PRODUCTION_READY = false; // ← 🎯 CAMBIAR A 'true' PARA PRODUCCIÓN

// ============================================================================
// 2. 🏢 INFORMACIÓN DEL NEGOCIO - MODIFICA TODO ESTO
// ============================================================================
// Reemplaza toda esta información con los datos de tu negocio
export const BUSINESS_INFO = {
  // ============================================================================
  // INFORMACIÓN BÁSICA DEL NEGOCIO
  // ============================================================================
  name: 'Your Business Name', // ← 🎯 CAMBIAR: Nombre de tu negocio
  type: 'Organization' as const,
  description:
    'Professional services company providing expert solutions with cutting-edge technology and personalized customer service. Industry leader with proven track record of success.', // ← 🎯 CAMBIAR: Descripción de tu negocio
  slogan: 'Expert Solutions + Advanced Technology', // ← 🎯 CAMBIAR: Slogan de tu negocio

  // ============================================================================
  // 📞 INFORMACIÓN DE CONTACTO
  // ============================================================================
  email: 'contact@yourbusiness.com', // ← 🎯 CAMBIAR: Tu email
  phone: '+1 (555) 123-4567', // ← 🎯 CAMBIAR: Tu teléfono
  whatsappNumber: '+15551234567', // ← 🎯 CAMBIAR: Tu WhatsApp
  whatsappUrl: 'https://wa.me/15551234567?text=Hello', // ← 🎯 CAMBIAR: Tu URL de WhatsApp

  // ============================================================================
  // 👤 INFORMACIÓN DEL FUNDADOR/CEO
  // ============================================================================
  founder: {
    name: 'John Smith', // ← 🎯 CAMBIAR: Tu nombre
    title: 'CEO & Founder - Technology Expert', // ← 🎯 CAMBIAR: Tu título
    bio: 'Experienced professional with expertise in advanced technology solutions and industry leadership. Proven track record of delivering exceptional results for clients across multiple sectors.', // ← 🎯 CAMBIAR: Tu biografía
    credentials: [
      'Industry Certification', // ← 🎯 CAMBIAR: Tus certificaciones
      'Technology Specialist',
      'Business Leadership',
      'Customer Success Expert',
      'Innovation Leader',
    ],
    expertise: [
      'Advanced technology solutions', // ← 🎯 CAMBIAR: Tus áreas de expertise
      'Business strategy',
      'Customer experience',
      'Industry analysis',
      'Digital transformation',
      'Process optimization',
    ],
  },

  // ============================================================================
  // 📍 INFORMACIÓN DE UBICACIÓN
  // ============================================================================
  address: {
    street: '123 Business Street, Suite 100', // ← 🎯 CAMBIAR: Tu dirección
    city: 'Business City', // ← 🎯 CAMBIAR: Tu ciudad
    state: 'Business State', // ← 🎯 CAMBIAR: Tu estado/provincia
    postalCode: '12345', // ← 🎯 CAMBIAR: Tu código postal
    country: 'US', // ← 🎯 CAMBIAR: Tu país
    neighborhood: 'Business District', // ← 🎯 CAMBIAR: Tu barrio
    municipality: 'City Municipality', // ← 🎯 CAMBIAR: Tu municipio
    coordinates: { latitude: 40.7128, longitude: -74.006 }, // ← 🎯 CAMBIAR: Tus coordenadas GPS
  },

  // ============================================================================
  // ⚖️ INFORMACIÓN LEGAL
  // ============================================================================
  legal: {
    taxId: '123456789', // ← 🎯 CAMBIAR: Tu ID fiscal
    license: 'BUS-2024-001', // ← 🎯 CAMBIAR: Tu licencia
    registrationNumber: 'REG-2024-001', // ← 🎯 CAMBIAR: Tu número de registro
  },

  // ============================================================================
  // 🏆 PREMIOS Y RECONOCIMIENTOS
  // ============================================================================
  awards: [
    { name: 'Industry Excellence Award 2024', year: 2024 }, // ← 🎯 CAMBIAR: Tus premios
    { name: 'Customer Service Excellence 2024', year: 2024 },
  ],
};

// ============================================================================
// 3. 🌐 CONFIGURACIÓN DEL SITIO WEB
// ============================================================================
export const SITE_INFO = {
  siteName: BUSINESS_INFO.name,
  siteUrl: process.env.SITE_URL || 'https://yourbusiness.com', // ← 🎯 CAMBIAR: Tu dominio
  version: '3.0.0',
  templateVersion: '7.0.0-ultra-advanced-seo',
};

// ============================================================================
// 4. 🎯 ÁREAS DE SERVICIO Y MERCADO
// ============================================================================
export const MARKET_CONFIG = {
  // ============================================================================
  // ÁREAS GEOGRÁFICAS DE SERVICIO
  // ============================================================================
  serviceAreas: [
    'Primary Market', // ← 🎯 CAMBIAR: Tus áreas de servicio
    'Secondary Market',
    'Tertiary Market',
    'Regional Center',
    'Metropolitan Area',
    'Business District',
  ],

  // ============================================================================
  // TIPOS DE SERVICIOS QUE OFRECES
  // ============================================================================
  serviceTypes: [
    'consulting', // ← 🎯 CAMBIAR: Tus tipos de servicios
    'technology_solutions',
    'professional_services',
    'digital_transformation',
    'business_strategy',
    'custom_solutions',
  ],

  // ============================================================================
  // RANGOS DE PRECIOS
  // ============================================================================
  priceRanges: {
    basic: '$1,000-$5,000', // ← 🎯 CAMBIAR: Tus rangos de precios
    standard: '$5,000-$15,000',
    premium: '$15,000-$50,000',
    enterprise: '$50,000+',
  },

  targetAudiences: {
    business_executives: 'C-level executives seeking strategic solutions', // ← 🎯 CAMBIAR: Tu audiencia objetivo
    technology_leaders: 'CTOs and IT directors driving digital transformation',
    small_business: 'Small business owners looking for growth solutions',
    enterprise: 'Large enterprises requiring comprehensive solutions',
    startups: 'Startups needing scalable technology solutions',
    consultants: 'Professional consultants seeking specialized expertise',
  },
};

// ============================================================================
// ✅ FIN DE LA CONFIGURACIÓN EDITABLE
// ============================================================================
// 
// 🎯 RESUMEN DE LO QUE DEBES CAMBIAR:
// 1. IS_PRODUCTION_READY: Cambiar a 'true' para producción
// 2. BUSINESS_INFO: Toda la información de tu negocio
// 3. SITE_INFO.siteUrl: Tu dominio
// 4. MARKET_CONFIG: Tus servicios y precios
// 5. ADVANCED_SEO_KEYWORDS: Tus palabras clave
// 
// ⚠️  IMPORTANTE: NO MODIFIQUES NADA DESPUÉS DE ESTA LÍNEA
// ============================================================================

// ============================================================================
// 5. 🔍 KEYWORDS Y ENTIDADES CLAVE - MODIFICA TUS PALABRAS CLAVE
// ============================================================================
export const ADVANCED_SEO_KEYWORDS = {
  // ============================================================================
  // PALABRAS CLAVE PRINCIPALES
  // ============================================================================
  primary: [
    'professional services', // ← 🎯 CAMBIAR: Tus palabras clave principales
    'technology solutions',
    'business consulting',
    'industry expertise',
  ],
  // ============================================================================
  // PALABRAS CLAVE DE COLA LARGA
  // ============================================================================
  longTail: [
    'advanced technology consulting services', // ← 🎯 CAMBIAR: Tus palabras clave de cola larga
    'professional business solutions provider',
    'expert technology implementation',
    'comprehensive business strategy consulting',
  ],
  // ============================================================================
  // PALABRAS CLAVE DE ESPECIALIZACIÓN
  // ============================================================================
  specialization: [
    'digital transformation consulting', // ← 🎯 CAMBIAR: Tus especializaciones
    'advanced technology solutions',
    'business process optimization',
    'strategic technology planning',
  ],
  // ============================================================================
  // PALABRAS CLAVE DE SERVICIOS
  // ============================================================================
  services: [
    'technology assessment', // ← 🎯 CAMBIAR: Tus servicios específicos
    'business analysis',
    'strategic planning',
    'implementation services',
  ],
  // ============================================================================
  // PALABRAS CLAVE SEMÁNTICAS
  // ============================================================================
  semantic: [
    'innovation', // ← 🎯 CAMBIAR: Tus palabras clave semánticas
    'efficiency',
    'optimization',
    'transformation',
    'expertise',
    'solutions',
  ],
  // ============================================================================
  // PALABRAS CLAVE BASADAS EN ENTIDADES
  // ============================================================================
  entityBased: [
    'business technology', // ← 🎯 CAMBIAR: Tus entidades clave
    'professional consulting',
    'industry solutions',
    'expert services',
  ],
  // ============================================================================
  // PALABRAS CLAVE BASADAS EN INTENT
  // ============================================================================
  intentBased: {
    informational: ['how to', 'what is', 'guide to', 'benefits of', 'comparison'], // ← 🎯 CAMBIAR: Keywords informacionales
    navigational: ['company name', 'contact', 'location', 'about us'], // ← 🎯 CAMBIAR: Keywords de navegación
    transactional: ['hire', 'buy', 'get quote', 'schedule consultation', 'purchase'], // ← 🎯 CAMBIAR: Keywords transaccionales
    commercial: ['best', 'top', 'review', 'comparison', 'versus'], // ← 🎯 CAMBIAR: Keywords comerciales
  },
};

// ============================================================================
// ✅ FIN DE LA CONFIGURACIÓN EDITABLE
// ============================================================================
// 
// 🎯 RESUMEN DE LO QUE DEBES CAMBIAR:
// 1. IS_PRODUCTION_READY: Cambiar a 'true' para producción
// 2. BUSINESS_INFO: Toda la información de tu negocio
// 3. SITE_INFO.siteUrl: Tu dominio
// 4. MARKET_CONFIG: Tus servicios y precios
// 5. ADVANCED_SEO_KEYWORDS: Tus palabras clave
// 
// ⚠️  IMPORTANTE: NO MODIFIQUES NADA DESPUÉS DE ESTA LÍNEA
// ============================================================================

// ============================================================================
// 🤖 CONFIGURACIÓN AVANZADA DE IA - NO MODIFICAR (AUTOMÁTICO)
// ============================================================================
export const ADVANCED_AI_OPTIMIZATION = {
  allowOpenAITraining: IS_PRODUCTION_READY,
  allowGoogleIndexing: IS_PRODUCTION_READY,

  engines: {
    openai: {
      contextWindow: 128000,
      allowTraining: IS_PRODUCTION_READY,
      optimizationLevel: 'advanced',
      responseStyle: 'professional_helpful',
      contentPreferences: ['detailed_explanations', 'step_by_step', 'examples'],
    },
    google: {
      allowIndexing: IS_PRODUCTION_READY,
      enhanceSnippets: true,
      optimizationLevel: 'aggressive',
      localSeoFocus: true,
      knowledgeGraphOptimization: true,
    },
    claude: {
      allowSummarization: true,
      citationFormat: 'structured' as const,
      analysisDepth: 'comprehensive',
      responseLength: 'variable',
    },
    microsoft: {
      enableRichSnippets: true,
      structuredAnswers: true,
      businessFocus: true,
      professionalOptimization: true,
    },
    meta: {
      conversationalOptimization: true,
      socialContext: true,
      lifestyleOptimization: false,
      communityFocus: true,
    },
    perplexity: {
      citationReady: true,
      factCheckOptimized: true,
      academicFormat: true,
      sourceVerification: true,
    },
    bard: {
      localOptimization: true,
      businessListingSync: true,
      reviewOptimization: true,
    },
    you: {
      searchPersonalization: true,
      intentMatching: true,
      contextualRecommendations: true,
    },
  },

  // Configuración de Intent Avanzada
  intentOptimization: {
    informational: {
      contentTypes: ['guides', 'tutorials', 'explanations', 'comparisons'],
      responseFormat: 'comprehensive_educational',
      cta: 'learn_more',
    },
    navigational: {
      contentTypes: ['company_info', 'contact', 'locations', 'team'],
      responseFormat: 'direct_contact',
      cta: 'get_in_touch',
    },
    transactional: {
      contentTypes: ['services', 'pricing', 'booking', 'purchase'],
      responseFormat: 'action_oriented',
      cta: 'get_started',
    },
    commercial: {
      contentTypes: ['reviews', 'comparisons', 'testimonials', 'case_studies'],
      responseFormat: 'trust_building',
      cta: 'schedule_consultation',
    },
  },
};

// 1.7 Configuración de Marca
export const BRAND_CONFIG = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    secondary: 'Georgia, serif',
    mono: 'JetBrains Mono, Consolas, monospace',
  },
  voice: {
    tone: 'professional_approachable',
    style: 'expert_helpful',
    personality: 'trustworthy_innovative',
  },
};

// ============================================================================
// 2. CONFIGURACIÓN GEOGRÁFICA AVANZADA
// ============================================================================

export const GEO_CONFIG = {
  primary: {
    country: 'United States',
    countryCode: 'US',
    currency: { name: 'US Dollar', code: 'USD', symbol: '$' },
    language: 'en-US',
    timezone: 'America/New_York',
  },

  businessEnvironment: {
    commonBusinessHours: '09:00-17:00',
    timeFormat: '12-hour',
    dateFormat: 'MM/DD/YYYY',
  },

  markets: {
    primary: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    secondary: ['Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'],
    emerging: ['Austin', 'Charlotte', 'Seattle', 'Denver'],
  },

  targeting: {
    local: true,
    regional: true,
    national: true,
    international: false,
  },
};

// ============================================================================
// 3. CONFIGURACIÓN SEO ULTRA AVANZADA
// ============================================================================

export const ULTRA_SEO_CONFIG = {
  titleTemplate: `%s | ${SITE_INFO.siteName}`,
  defaultTitle: `${SITE_INFO.siteName} - ${BUSINESS_INFO.slogan}`,
  defaultDescription: BUSINESS_INFO.description,

  robots: {
    index: IS_PRODUCTION_READY,
    follow: IS_PRODUCTION_READY,
    maxImagePreview: 'large',
    maxSnippet: 300,
    maxVideoPreview: 30,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    notranslate: false,
    unavailableAfter: null,
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_INFO.siteName,
    imageWidth: 1200,
    imageHeight: 630,
  },

  twitter: {
    cardType: 'summary_large_image',
    site: '@yourbusiness',
    creator: '@yourbusiness',
  },

  languages: {
    default: 'en-US',
    alternates: [
      { hreflang: 'en', href: `${SITE_INFO.siteUrl}` },
      { hreflang: 'x-default', href: SITE_INFO.siteUrl },
    ],
  },

  // Configuración Avanzada de Core Web Vitals
  performance: {
    criticalCSS: true,
    preloadFonts: true,
    preloadImages: true,
    lazyLoading: true,
    imageOptimization: true,
    cacheStrategy: 'stale-while-revalidate',
  },

  // Schema Markup Avanzado
  schemaTypes: [
    'Organization',
    'LocalBusiness',
    'WebSite',
    'WebPage',
    'FAQPage',
    'HowTo',
    'Service',
    'Review',
    'BreadcrumbList',
  ],

  // SERP Features Configuration
  serpFeatures: {
    featuredSnippets: IS_PRODUCTION_READY,
    peopleAlsoAsk: IS_PRODUCTION_READY,
    localPack: true,
    knowledgeGraph: IS_PRODUCTION_READY,
    richResults: IS_PRODUCTION_READY,
  },
};

// ============================================================================
// 4. CONFIGURACIÓN DE IMÁGENES AVANZADA
// ============================================================================

export const ADVANCED_IMAGE_ASSETS = {
  logo: {
    url: 'src/assets/astro.svg',
    alt: `${BUSINESS_INFO.name} Logo`,
    width: 300,
    height: 300,
    type: 'image/svg+xml',

  },

  openGraph: {
    url: '/assets/background.svg',
    alt: `${BUSINESS_INFO.name} - Professional Services`,
    width: 1200,
    height: 630,
    type: 'image/svg+xml',

  },

  favicon: {
    url: '/assets/icons/favicon-32x32.webp',
    type: 'image/webp',
  },

  hero: {
    url: 'src/assets/astro.svg',
    alt: 'Professional services hero image',
    width: 1920,
    height: 1080,
    type: 'image/svg+xml',
    loading: 'eager',
    fetchpriority: 'high',
  },
};

// ============================================================================
// 5. AEO (ANSWER ENGINE OPTIMIZATION) ULTRA AVANZADA
// ============================================================================

export const ULTRA_AEO_CONFIG = {
  featuredSnippets: {
    enabled: IS_PRODUCTION_READY,
    types: ['paragraph', 'list', 'table', 'video', 'definition'],
    optimization: 'aggressive',
    targetQueries: [
      'what is [service]',
      'how to [process]',
      'best [solution] for',
      '[service] benefits',
      '[service] vs [alternative]',
    ],
    optimizedContent: {
      lists: [
        'Benefits of professional services',
        'Steps to get started',
        'Key features of our solutions',
        'Why choose our company',
      ],
      tables: [
        'Service comparison matrix',
        'Pricing structure overview',
        'Timeline and deliverables',
      ],
      definitions: [
        'Professional consulting definition',
        'Technology solutions explained',
        'Business transformation process',
      ],
    },
  },

  voiceSearch: {
    enabled: IS_PRODUCTION_READY,
    optimizationLevel: 'advanced',
    targetPhrases: [
      'What is the best [service] company?',
      'How much does [service] cost?',
      'Who provides [service] near me?',
      'What are the benefits of [service]?',
      'How do I choose a [service] provider?',
    ],
    conversationalKeywords: [
      'tell me about',
      'explain',
      'help me understand',
      "what's the difference",
      'how does it work',
    ],
    localOptimization: true,
    questionAnswerPairs: true,
  },

  peopleAlsoAsk: [
    {
      q: 'What makes a good service provider?',
      a: 'A good service provider combines expertise, reliability, and customer focus to deliver exceptional results tailored to client needs.',
      related: ['service quality', 'provider selection', 'customer satisfaction'],
    },
    {
      q: 'How do I choose the right solution for my business?',
      a: 'Consider your specific needs, budget, timeline, and long-term goals. Consult with experts to evaluate options and make informed decisions.',
      related: ['business consulting', 'solution selection', 'decision making'],
    },
  ],

  // Answer Engine Specific Optimization
  answerEngines: {
    google: {
      snippetOptimization: true,
      knowledgeGraphData: true,
      localPackOptimization: true,
    },
    bing: {
      entityOptimization: true,
      richAnswersFormat: true,
    },
    duckduckgo: {
      instantAnswerFormat: true,
      privacyFocusedContent: true,
    },
  },
};

// ============================================================================
// 6. GSO (GENERATIVE SEARCH OPTIMIZATION) ULTRA AVANZADA
// ============================================================================

export const ULTRA_GSO_CONFIG = {
  aiSummary: `${BUSINESS_INFO.name} is a leading professional services company specializing in advanced technology solutions and business consulting. With proven expertise and customer-focused approach, we deliver exceptional results for businesses across multiple industries.`,

  brandVoice: 'professional, innovative, trustworthy, expert, customer-focused, solution-oriented',

  keyEntities: [
    BUSINESS_INFO.founder.name,
    BUSINESS_INFO.name,
    'professional services',
    'technology solutions',
    'business consulting',
    'expert advice',
    'industry leadership',
    'customer success',
  ],

  aiBotInstructions: IS_PRODUCTION_READY
    ? 'index, summarize, use_for_training, cite_source, answer_questions_professionally, provide_helpful_guidance'
    : 'noindex, nofollow, disallow',

  // Generative AI Optimization
  generativeOptimization: {
    contentStructure: 'scannable_comprehensive',
    informationDensity: 'high_value',
    contextualRelevance: 'maximum',
    userIntentAlignment: 'precise',
  },

  // LLM-Specific Optimization
  llmOptimization: {
    contextWindows: {
      'gpt-4': 128000,
      'claude-3': 200000,
      'gemini-pro': 32000,
    },
    tokenEfficiency: true,
    embeddingOptimization: true,
    semanticStructure: 'hierarchical',
  },

  // Search Intent Mapping
  intentMapping: {
    learn_about_services: {
      contentType: 'educational',
      format: 'comprehensive_guide',
      cta: 'schedule_consultation',
    },
    find_provider: {
      contentType: 'comparison',
      format: 'decision_framework',
      cta: 'contact_expert',
    },
    solve_problem: {
      contentType: 'solution_focused',
      format: 'step_by_step',
      cta: 'get_started',
    },
  },
};

// ============================================================================
// 7. USER INTENT & SEARCH INTENT ULTRA AVANZADA
// ============================================================================

export const ULTRA_INTENT_CONFIG = {
  userIntentTypes: {
    informational: {
      weight: 0.4,
      contentStrategy: 'educational_comprehensive',
      optimizationFocus: 'question_answering',
      conversionGoal: 'service_inquiry',
    },
    navigational: {
      weight: 0.2,
      contentStrategy: 'direct_access',
      optimizationFocus: 'site_structure',
      conversionGoal: 'page_engagement',
    },
    transactional: {
      weight: 0.3,
      contentStrategy: 'conversion_focused',
      optimizationFocus: 'action_oriented',
      conversionGoal: 'service_inquiry',
    },
    commercial: {
      weight: 0.1,
      contentStrategy: 'comparison_based',
      optimizationFocus: 'trust_building',
      conversionGoal: 'consultation_booking',
    },
  },

  searchIntentSignals: {
    informational: ['how', 'what', 'why', 'guide', 'tutorial', 'learn'],
    navigational: ['website', 'official', 'login', 'contact', 'location'],
    transactional: ['buy', 'hire', 'get', 'book', 'order', 'purchase'],
    commercial: ['best', 'top', 'review', 'compare', 'vs', 'alternative'],
  },

  intentOptimizationStrategies: {
    contentAlignment: 'intent_specific',
    userJourneyMapping: 'comprehensive',
    conversionPathOptimization: 'multi_touch',
    personalizationLevel: 'intent_based',
  },

  // Advanced Intent Detection
  intentDetection: {
    semanticAnalysis: true,
    contextualUnderstanding: true,
    behavioralSignals: true,
    queryClassification: 'ml_enhanced',
  },
};

// ============================================================================
// 8. IA SUGGESTIONS & AIO (AI OPTIMIZATION) ULTRA AVANZADA
// ============================================================================

export const ULTRA_AI_SUGGESTIONS = {
  suggestionTypes: {
    content: {
      nextBestAction: true,
      relatedTopics: true,
      deeperExploration: true,
      alternativeApproaches: true,
    },
    navigation: {
      smartRecommendations: true,
      contextualPaths: true,
      userJourneyOptimization: true,
    },
    services: {
      personalizedRecommendations: true,
      needsBasedSuggestions: true,
      solutionMatching: true,
    },
  },

  aiOptimization: {
    contentGeneration: {
      aiAssisted: IS_PRODUCTION_READY,
      qualityControl: 'human_review',
      personalization: 'context_aware',
    },
    userExperience: {
      predictiveInterface: true,
      adaptiveContent: true,
      intelligentRouting: true,
    },
    searchOptimization: {
      queryUnderstanding: 'advanced_nlp',
      intentPrediction: 'ml_enhanced',
      responseOptimization: 'context_aware',
    },
  },

  // AI Content Framework
  contentFramework: {
    structure: 'pyramid_principle',
    readability: 'adaptive_complexity',
    engagement: 'interactive_elements',
    accessibility: 'inclusive_design',
  },
};

// ============================================================================
// 9. PLANTILLAS DE CONTENIDO ULTRA AVANZADAS
// ============================================================================

interface ServicePageData {
  serviceType: string;
  primaryBenefit: string;
  keyResults: string;
  benefits?: string[];
}

interface ComparisonGuideData {
  title: string;
  introduction: string;
  factors?: string[];
  recommendation: string;
}

export const ULTRA_CONTENT_TEMPLATES = {
  servicePage: (data: ServicePageData) => `
    Professional ${data.serviceType} Services
    
    Expert ${data.serviceType} solutions designed to ${data.primaryBenefit}.
    Our proven approach delivers ${data.keyResults} for businesses like yours.
    
    Key Benefits:
    ${data.benefits?.map((benefit) => `• ${benefit}`).join('\n    ') || '• Expert guidance\n    • Proven results\n    • Personalized approach'}
    
    Contact Information:
    📞 Phone: ${BUSINESS_INFO.phone}
    📧 Email: ${BUSINESS_INFO.email}
    🌐 Website: ${SITE_INFO.siteUrl}
  `,

  faqAnswer: (question: string, answer: string) => `
    Q: ${question}
    A: ${answer}
    
    For personalized guidance, contact our experts:
    📞 ${BUSINESS_INFO.phone}
    📧 ${BUSINESS_INFO.email}
  `,

  comparisonGuide: (data: ComparisonGuideData) => `
    ${data.title} Comparison Guide
    
    ${data.introduction}
    
    Key Factors to Consider:
    ${data.factors?.map((factor, index) => `${index + 1}. ${factor}`).join('\n    ')}
    
    Our Recommendation:
    ${data.recommendation}
    
    Ready to make a decision? Contact our experts for personalized advice.
  `,
};

// ============================================================================
// 10. CONFIGURACIÓN TÉCNICA ULTRA AVANZADA
// ============================================================================

export const ULTRA_TECHNICAL_CONFIG = {
  sitemap: {
    enabled: IS_PRODUCTION_READY,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: true,
    compression: true,
    multilingual: true,
    imageOptimization: true,
  },

  analytics: {
    googleAnalytics: IS_PRODUCTION_READY ? 'GA_MEASUREMENT_ID' : undefined,
    googleTagManager: IS_PRODUCTION_READY ? 'GTM_CONTAINER_ID' : undefined,
    facebookPixel: IS_PRODUCTION_READY ? 'FB_PIXEL_ID' : undefined,
    linkedInInsight: IS_PRODUCTION_READY ? 'LI_PARTNER_ID' : undefined,
    customEvents: true,
    enhancedEcommerce: false,
    userIdTracking: false,
  },

  verification: {
    google: IS_PRODUCTION_READY ? 'GOOGLE_VERIFICATION' : undefined,
    bing: IS_PRODUCTION_READY ? 'BING_VERIFICATION' : undefined,
    yandex: IS_PRODUCTION_READY ? 'YANDEX_VERIFICATION' : undefined,
    pinterest: IS_PRODUCTION_READY ? 'PINTEREST_VERIFICATION' : undefined,
  },

  performance: {
    caching: {
      maxAge: 3600,
      staleWhileRevalidate: 86400,
      browserCaching: true,
      cdnOptimization: true,
    },
    compression: {
      gzip: true,
      brotli: true,
      minification: true,
    },
    preloading: {
      criticalResources: true,
      dns: true,
      fonts: true,
      images: true,
    },
  },

  security: {
    csp: true,
    hsts: true,
    nosniff: true,
    xssProtection: true,
    frameOptions: 'DENY',
  },
};

// ============================================================================
// 11. TIPOS Y INTERFACES AVANZADAS
// ============================================================================

export interface AdvancedPropertyData {
  type?: string;
  category?: string;
  subcategory?: string;
  features?: string[];
  benefits?: string[];
  targetAudience?: string;
  priceRange?: string;
  availability?: string;
  specifications?: Record<string, any>;
}

export interface AdvancedGeoData {
  city?: string;
  state?: string;
  country?: string;
  region?: string;
  continent?: string;
  lat?: number;
  lng?: number;
  postalCode?: string;
  timezone?: string;
  marketTier?: 'primary' | 'secondary' | 'tertiary';
  economicIndicators?: Record<string, any>;
}

export interface AdvancedArticleData {
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  coAuthors?: string[];
  tags?: string[];
  categories?: string[];
  category?: string;
  readingTime?: number;
  wordCount?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  targetAudience?: string[];
  contentType?: 'guide' | 'tutorial' | 'comparison' | 'review' | 'news';
  serpFeatures?: string[];
}

export interface UserIntent {
  type: 'informational' | 'navigational' | 'transactional' | 'commercial';
  confidence: number;
  keywords: string[];
  context: string;
  expectedFormat: string;
  conversionGoal: string;
}

export interface SearchIntent {
  primary: UserIntent;
  secondary?: UserIntent[];
  queryType: string;
  complexity: 'simple' | 'moderate' | 'complex';
  userJourneyStage: 'awareness' | 'consideration' | 'decision';
}

// ============================================================================
// 12. FUNCIONES DE UTILIDAD ULTRA AVANZADAS
// ============================================================================

export function generateAbsoluteURL(path: string): string {
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_INFO.siteUrl}${cleanPath}`;
}

export function getImageAsset(assetKey: keyof typeof ADVANCED_IMAGE_ASSETS) {
  return ADVANCED_IMAGE_ASSETS[assetKey] || null;
}

export function getOptimalImageUrl(assetKey: keyof typeof ADVANCED_IMAGE_ASSETS): string {
  const asset = ADVANCED_IMAGE_ASSETS[assetKey];
  if (!asset) return '';

  // Return best format available
  if ('sources' in asset) {
    const sources = asset.sources as Record<string, string>;
    if (sources.avif) return sources.avif;
    if (sources.webp) return sources.webp;
  }

  return asset.url;
}

export function getMarketTier(location: string): 'primary' | 'secondary' | 'tertiary' {
  if (GEO_CONFIG.markets.primary.includes(location)) return 'primary';
  if (GEO_CONFIG.markets.secondary.includes(location)) return 'secondary';
  return 'tertiary';
}

export function isHighPriorityMarket(city: string): boolean {
  return GEO_CONFIG.markets.primary.includes(city);
}

export function detectUserIntent(query: string): UserIntent {
  const lowerQuery = query.toLowerCase();

  for (const [intentType, signals] of Object.entries(ULTRA_INTENT_CONFIG.searchIntentSignals)) {
    const matchingSignals = signals.filter((signal) => lowerQuery.includes(signal));
    if (matchingSignals.length > 0) {
      return {
        type: intentType as any,
        confidence: matchingSignals.length / signals.length,
        keywords: matchingSignals,
        context: query,
        expectedFormat: getExpectedFormat(intentType),
        conversionGoal: getConversionGoal(intentType),
      };
    }
  }

  // Default to informational
  return {
    type: 'informational',
    confidence: 0.5,
    keywords: [],
    context: query,
    expectedFormat: 'comprehensive',
    conversionGoal: 'engagement',
  };
}

function getExpectedFormat(intentType: string): string {
  const formats: Record<string, string> = {
    informational: 'educational_comprehensive',
    navigational: 'direct_access',
    transactional: 'action_oriented',
    commercial: 'comparison_based',
  };
  return formats[intentType] || 'standard';
}

function getConversionGoal(intentType: string): string {
  const goals: Record<string, string> = {
    informational: 'service_inquiry',
    navigational: 'page_engagement',
    transactional: 'service_inquiry',
    commercial: 'consultation_booking',
  };
  return goals[intentType] || 'engagement';
}

interface SchemaContext {
  faqData?: Array<{ q: string; a: string; related?: string[] }>;
  isHowTo?: boolean;
  steps?: Array<{ title?: string; description?: string; text?: string }>;
}

export function generateAdvancedSchemas(
  context: SchemaContext = {},
  intent?: UserIntent
): object[] {
  const advancedSchemas: object[] = [];

  // Add intent-specific schemas
  if (intent) {
    advancedSchemas.push(generateIntentSchema(intent));
  }

  // Add FAQ schema for informational content
  if (context.faqData || intent?.type === 'informational') {
    advancedSchemas.push(generateFAQSchema(context.faqData));
  }

  // Add HowTo schema for tutorial content
  if (context.isHowTo || context.steps) {
    advancedSchemas.push(generateHowToSchema(context));
  }

  return advancedSchemas;
}

function generateIntentSchema(intent: UserIntent): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'UserInteraction',
    interactionType: intent.type,
    expectedFormat: intent.expectedFormat,
    targetGoal: intent.conversionGoal,
    confidence: intent.confidence,
  };
}

function generateFAQSchema(faqData?: Array<{ q: string; a: string; related?: string[] }>): object {
  const questions = faqData || ULTRA_AEO_CONFIG.peopleAlsoAsk;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

function generateHowToSchema(context: SchemaContext): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: (context as { title?: string }).title || 'Professional Service Guide',
    description:
      (context as { description?: string }).description || 'Step-by-step professional guidance',
    step:
      context.steps?.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title || `Step ${index + 1}`,
        text: step.description || step.text,
      })) || [],
  };
}

// ============================================================================
// 13. E-E-A-T (EXPERIENCE, EXPERTISE, AUTHORITY, TRUST) ULTRA AVANZADA
// ============================================================================

export const ULTRA_EEAT_CONFIG = {
  experience: {
    yearsInBusiness: 10,
    industryExperience: 'technology_and_consulting',
    clientSuccessStories: 500,
    projectCompletionRate: 98,
    customerSatisfactionScore: 4.9,
  },

  expertise: {
    certifications: [
      'ISO 27001 Information Security',
      'PMP Project Management Professional',
      'AWS Solutions Architect',
      'Google Cloud Professional',
      'Microsoft Azure Solutions Expert',
    ],
    industryAwards: [
      'Best Technology Solutions Provider 2024',
      'Excellence in Customer Service Award',
      'Innovation Leadership Recognition',
    ],
    publications: [
      'Industry Best Practices Guide',
      'Technology Trends Report 2024',
      'Digital Transformation Handbook',
    ],
    speakingEngagements: [
      'Tech Conference 2024 - Keynote Speaker',
      'Industry Summit - Panel Expert',
      'Webinar Series - Digital Innovation',
    ],
  },

  authority: {
    industryRanking: 'top_10_providers',
    marketShare: 'leading_position',
    thoughtLeadership: 'recognized_expert',
    mediaMentions: [
      'Featured in TechCrunch',
      'Quoted in Forbes',
      'Interviewed by Business Insider',
    ],
    partnerships: [
      'Microsoft Gold Partner',
      'AWS Advanced Consulting Partner',
      'Google Cloud Partner',
    ],
  },

  trust: {
    securityCertifications: ['SOC 2 Type II', 'GDPR Compliant', 'HIPAA Compliant'],
    privacyCommitment: 'enterprise_grade',
    transparencyScore: 95,
    clientTestimonials: 200,
    caseStudies: 50,
    trustSignals: [
      'BBB Accredited Business',
      'Trustpilot 5-Star Rating',
      'Google My Business Verified',
    ],
  },
};

// ============================================================================
// 14. SEMANTIC SEO ULTRA AVANZADA
// ============================================================================

export const ULTRA_SEMANTIC_SEO = {
  entityLinking: {
    primaryEntities: [
      {
        name: BUSINESS_INFO.name,
        type: 'Organization',
        wikipediaUrl: null,
        knowledgeGraphId: null,
        relatedEntities: ['professional services', 'technology consulting', 'business solutions'],
      },
      {
        name: BUSINESS_INFO.founder.name,
        type: 'Person',
        title: BUSINESS_INFO.founder.title,
        expertise: BUSINESS_INFO.founder.expertise,
        linkedinUrl: null,
      },
    ],
    industryEntities: [
      'technology consulting',
      'digital transformation',
      'business strategy',
      'process optimization',
    ],
    locationEntities: [
      BUSINESS_INFO.address.city,
      BUSINESS_INFO.address.state,
      BUSINESS_INFO.address.country,
    ],
  },

  topicClusters: {
    mainTopic: 'professional technology services',
    subtopics: [
      {
        topic: 'digital transformation',
        keywords: ['digital transformation', 'technology modernization', 'digital strategy'],
        contentPieces: 15,
        internalLinks: 8,
      },
      {
        topic: 'business consulting',
        keywords: ['business consulting', 'strategic planning', 'process improvement'],
        contentPieces: 12,
        internalLinks: 6,
      },
      {
        topic: 'technology solutions',
        keywords: ['technology solutions', 'software implementation', 'system integration'],
        contentPieces: 18,
        internalLinks: 10,
      },
    ],
  },

  semanticKeywords: {
    primary: ['professional services', 'technology solutions', 'business consulting'],
    secondary: ['expert advice', 'industry leadership', 'customer success'],
    longTail: [
      'advanced technology consulting services near me',
      'professional business solutions provider reviews',
      'expert technology implementation company',
    ],
    questionBased: [
      'how to choose a technology consultant',
      'what makes a good business consultant',
      'when to hire professional services',
    ],
  },
};

// ============================================================================
// 15. CORE WEB VITALS & PERFORMANCE SEO ULTRA AVANZADA
// ============================================================================

export const ULTRA_PERFORMANCE_SEO = {
  coreWebVitals: {
    lcp: {
      target: 2.5, // segundos
      current: 1.8,
      optimization: 'aggressive',
      strategies: [
        'critical CSS inlining',
        'image optimization',
        'font preloading',
        'server response optimization',
      ],
    },
    fid: {
      target: 100, // milisegundos
      current: 45,
      optimization: 'moderate',
      strategies: ['code splitting', 'lazy loading', 'event handler optimization'],
    },
    cls: {
      target: 0.1,
      current: 0.05,
      optimization: 'excellent',
      strategies: ['image dimensions', 'ad space reservation', 'dynamic content handling'],
    },
  },

  technicalSEO: {
    crawlability: {
      sitemapOptimization: true,
      robotsTxtOptimization: true,
      internalLinking: 'strategic',
      canonicalization: 'proper',
    },
    indexability: {
      metaTags: 'optimized',
      structuredData: 'comprehensive',
      contentQuality: 'high',
      duplicateContent: 'minimal',
    },
    mobileOptimization: {
      responsiveDesign: true,
      mobileFirst: true,
      touchOptimization: true,
      mobileSpeed: 'optimized',
    },
  },

  pageSpeed: {
    desktop: {
      target: 95,
      current: 98,
      optimization: 'excellent',
    },
    mobile: {
      target: 90,
      current: 95,
      optimization: 'excellent',
    },
    strategies: [
      'image compression',
      'minification',
      'caching',
      'CDN optimization',
      'code splitting',
    ],
  },
};

// ============================================================================
// 16. LOCAL SEO ULTRA AVANZADA
// ============================================================================

export const ULTRA_LOCAL_SEO = {
  googleMyBusiness: {
    optimized: true,
    categories: ['Technology Consultant', 'Business Consultant', 'Management Consultant'],
    attributes: [
      'women-led',
      'veteran-led',
      'wheelchair accessible',
      'free wifi',
      'appointment required',
    ],
    posts: {
      frequency: 'weekly',
      types: ['updates', 'offers', 'events', 'products'],
    },
    reviews: {
      management: 'active',
      responseRate: 95,
      averageRating: 4.9,
      totalReviews: 150,
    },
  },

  localCitations: {
    primary: ['Google My Business', 'Bing Places', 'Apple Maps', 'Yelp', 'Facebook'],
    secondary: ['Yellow Pages', 'Superpages', 'Citysearch', 'Foursquare', 'TripAdvisor'],
    industrySpecific: ['Clutch.co', 'GoodFirms', 'DesignRush', 'TopDevelopers'],
  },

  localKeywords: {
    cityBased: [
      `${BUSINESS_INFO.address.city} technology consultant`,
      `${BUSINESS_INFO.address.city} business consultant`,
      `professional services ${BUSINESS_INFO.address.city}`,
    ],
    stateBased: [
      `${BUSINESS_INFO.address.state} technology solutions`,
      `best consultant ${BUSINESS_INFO.address.state}`,
    ],
    serviceBased: [
      'technology consulting near me',
      'business consultant near me',
      'digital transformation services',
    ],
  },

  localContent: {
    cityPages: true,
    serviceAreaPages: true,
    localCaseStudies: true,
    communityInvolvement: true,
  },
};

// ============================================================================
// 17. SERP FEATURES TARGETING ULTRA AVANZADA
// ============================================================================

export const ULTRA_SERP_FEATURES = {
  featuredSnippets: {
    targeting: true,
    contentTypes: ['how-to', 'what-is', 'list', 'definition'],
    optimization: 'aggressive',
    monitoring: true,
  },

  peopleAlsoAsk: {
    targeting: true,
    questionGeneration: 'ai_enhanced',
    answerOptimization: 'comprehensive',
    monitoring: true,
  },

  knowledgePanels: {
    targeting: true,
    entityOptimization: true,
    dataAccuracy: 'verified',
    monitoring: true,
  },

  localPacks: {
    targeting: true,
    localOptimization: true,
    reviewOptimization: true,
    monitoring: true,
  },

  richSnippets: {
    targeting: true,
    schemaTypes: ['Organization', 'LocalBusiness', 'Service', 'Review', 'FAQPage', 'HowTo'],
    monitoring: true,
  },

  videoResults: {
    targeting: false, // Si tienes videos
    optimization: 'basic',
    monitoring: false,
  },

  imageResults: {
    targeting: true,
    optimization: 'comprehensive',
    altTextOptimization: true,
    monitoring: true,
  },
};

// ============================================================================
// 18. COMPETITIVE SEO ULTRA AVANZADA
// ============================================================================

export const ULTRA_COMPETITIVE_SEO = {
  competitors: [
    {
      name: 'Competitor A',
      domain: 'competitora.com',
      strengths: ['brand recognition', 'content volume'],
      weaknesses: ['user experience', 'mobile optimization'],
      opportunities: ['local SEO', 'video content'],
    },
    {
      name: 'Competitor B',
      domain: 'competitorb.com',
      strengths: ['technical SEO', 'backlinks'],
      weaknesses: ['content quality', 'user engagement'],
      opportunities: ['content marketing', 'social proof'],
    },
  ],

  competitiveAnalysis: {
    keywordGaps: ['long-tail keywords', 'question-based queries', 'local search terms'],
    contentGaps: ['comprehensive guides', 'case studies', 'video content', 'interactive tools'],
    technicalGaps: ['page speed', 'mobile optimization', 'structured data', 'internal linking'],
  },

  differentiation: {
    uniqueValuePropositions: [
      'personalized approach',
      'industry expertise',
      'proven results',
      'customer focus',
    ],
    contentAdvantages: [
      'comprehensive guides',
      'expert insights',
      'real case studies',
      'interactive tools',
    ],
    technicalAdvantages: [
      'faster loading',
      'better mobile experience',
      'advanced features',
      'superior UX',
    ],
  },
};

// ============================================================================
// 19. CONVERSION OPTIMIZATION SEO ULTRA AVANZADA
// ============================================================================

export const ULTRA_CONVERSION_SEO = {
  conversionGoals: {
    primary: 'service_inquiry',
    secondary: 'consultation_booking',
    tertiary: 'content_engagement',
  },

  conversionOptimization: {
    ctaOptimization: {
      placement: 'strategic',
      design: 'attention_grabbing',
      copy: 'action_oriented',
      testing: 'continuous',
    },
    formOptimization: {
      fields: 'minimal',
      validation: 'user_friendly',
      submission: 'smooth',
      followUp: 'immediate',
    },
    trustSignals: {
      testimonials: 'prominent',
      certifications: 'visible',
      guarantees: 'clear',
      security: 'assured',
    },
  },

  userJourneyOptimization: {
    awareness: {
      content: 'educational',
      channels: 'multiple',
      targeting: 'broad',
    },
    consideration: {
      content: 'comparative',
      channels: 'targeted',
      targeting: 'specific',
    },
    decision: {
      content: 'conversion_focused',
      channels: 'direct',
      targeting: 'precise',
    },
  },

  personalization: {
    intentBased: true,
    behaviorBased: true,
    locationBased: true,
    deviceBased: true,
  },
};

// ============================================================================
// 20. FUNCIONES DE UTILIDAD ULTRA AVANZADAS ADICIONALES
// ============================================================================

// Función para generar Schema Markup completo y dinámico
export function generateCompleteSchemaMarkup(
  pageType: 'home' | 'service' | 'about' | 'contact' | 'blog',
  additionalData?: Record<string, any>
): object[] {
  const schemas: object[] = [];

  // Schema base de la organización
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: SITE_INFO.siteUrl,
    logo: generateAbsoluteURL(ADVANCED_IMAGE_ASSETS.logo.url),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phone,
      contactType: 'customer service',
      email: BUSINESS_INFO.email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    founder: {
      '@type': 'Person',
      name: BUSINESS_INFO.founder.name,
      jobTitle: BUSINESS_INFO.founder.title,
      description: BUSINESS_INFO.founder.bio,
    },
    award: ULTRA_EEAT_CONFIG.expertise.industryAwards,
    knowsAbout: ULTRA_EEAT_CONFIG.expertise.certifications,
  });

  // Schema de LocalBusiness para SEO local
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
    url: SITE_INFO.siteUrl,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.address.coordinates.latitude,
      longitude: BUSINESS_INFO.address.coordinates.longitude,
    },
    priceRange: '$$',
    openingHours: `Mo-Fr ${GEO_CONFIG.businessEnvironment.commonBusinessHours}`,
    areaServed: GEO_CONFIG.markets.primary,
  });

  // Schema específico según el tipo de página
  switch (pageType) {
    case 'home':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_INFO.siteName,
        url: SITE_INFO.siteUrl,
        description: BUSINESS_INFO.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_INFO.siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      });
      break;

    case 'service':
      if (additionalData?.serviceName) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: additionalData.serviceName,
          description: additionalData.serviceDescription || BUSINESS_INFO.description,
          provider: {
            '@type': 'Organization',
            name: BUSINESS_INFO.name,
          },
          areaServed: GEO_CONFIG.markets.primary,
          serviceType: additionalData.serviceType || 'Professional Service',
        });
      }
      break;

    case 'about':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: `About ${BUSINESS_INFO.name}`,
        description: `Learn more about ${BUSINESS_INFO.name} and our team of experts.`,
        mainEntity: {
          '@type': 'Organization',
          name: BUSINESS_INFO.name,
          founder: {
            '@type': 'Person',
            name: BUSINESS_INFO.founder.name,
            jobTitle: BUSINESS_INFO.founder.title,
            description: BUSINESS_INFO.founder.bio,
          },
        },
      });
      break;

    case 'contact':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contact ${BUSINESS_INFO.name}`,
        description: `Get in touch with ${BUSINESS_INFO.name} for expert consultation.`,
        mainEntity: {
          '@type': 'Organization',
          name: BUSINESS_INFO.name,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: BUSINESS_INFO.phone,
            contactType: 'customer service',
            email: BUSINESS_INFO.email,
            availableLanguage: 'English',
          },
        },
      });
      break;
  }

  return schemas;
}

// Función para generar meta tags optimizados
export function generateOptimizedMetaTags(pageData: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Record<string, string> {
  const {
    title = ULTRA_SEO_CONFIG.defaultTitle,
    description = ULTRA_SEO_CONFIG.defaultDescription,
    keywords = ADVANCED_SEO_KEYWORDS.primary,
    image = ADVANCED_IMAGE_ASSETS.openGraph.url,
    type = 'website',
    author = BUSINESS_INFO.founder.name,
    publishedTime,
    modifiedTime,
  } = pageData;

  return {
    // Meta tags básicos
    title: title.includes('|') ? title : `${title} | ${SITE_INFO.siteName}`,
    description,
    keywords: keywords.join(', '),
    author,
    robots: IS_PRODUCTION_READY ? 'index, follow' : 'noindex, nofollow',

    // Open Graph
    'og:title': title,
    'og:description': description,
    'og:type': type,
    'og:url': SITE_INFO.siteUrl,
    'og:site_name': SITE_INFO.siteName,
    'og:image': generateAbsoluteURL(image),
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:locale': ULTRA_SEO_CONFIG.openGraph.locale,

    // Twitter Card
    'twitter:card': ULTRA_SEO_CONFIG.twitter.cardType,
    'twitter:site': ULTRA_SEO_CONFIG.twitter.site,
    'twitter:creator': ULTRA_SEO_CONFIG.twitter.creator,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': generateAbsoluteURL(image),

    // Artículo específico
    ...(publishedTime && { 'article:published_time': publishedTime }),
    ...(modifiedTime && { 'article:modified_time': modifiedTime }),
    ...(author && { 'article:author': author }),

    // Canonical
    canonical: SITE_INFO.siteUrl,
  };
}

// Función para detectar y optimizar para User Intent avanzado
export function analyzeAndOptimizeForUserIntent(
  query: string,
  pageContent: string
): {
  detectedIntent: UserIntent;
  optimizationRecommendations: string[];
  contentSuggestions: string[];
} {
  const intent = detectUserIntent(query);
  const recommendations: string[] = [];
  const suggestions: string[] = [];

  // Análisis de contenido basado en intent
  const contentAnalysis = {
    hasFAQ:
      pageContent.toLowerCase().includes('faq') || pageContent.toLowerCase().includes('question'),
    hasHowTo:
      pageContent.toLowerCase().includes('how to') || pageContent.toLowerCase().includes('step'),
    hasComparison:
      pageContent.toLowerCase().includes('vs') || pageContent.toLowerCase().includes('compare'),
    hasCTA:
      pageContent.toLowerCase().includes('contact') || pageContent.toLowerCase().includes('call'),
  };

  // Recomendaciones basadas en intent
  switch (intent.type) {
    case 'informational':
      if (!contentAnalysis.hasFAQ) {
        recommendations.push('Add FAQ section for informational queries');
        suggestions.push('Include "People Also Ask" questions and answers');
      }
      if (!contentAnalysis.hasHowTo) {
        recommendations.push('Add step-by-step guide or tutorial content');
        suggestions.push('Create comprehensive educational content');
      }
      break;

    case 'transactional':
      if (!contentAnalysis.hasCTA) {
        recommendations.push('Add prominent call-to-action buttons');
        suggestions.push('Include contact forms and booking options');
      }
      recommendations.push('Highlight service benefits and pricing');
      suggestions.push('Add customer testimonials and case studies');
      break;

    case 'navigational':
      recommendations.push('Ensure clear site navigation and structure');
      suggestions.push('Add breadcrumbs and internal linking');
      break;

    case 'commercial':
      if (!contentAnalysis.hasComparison) {
        recommendations.push('Add comparison tables or charts');
        suggestions.push('Include competitive analysis content');
      }
      recommendations.push('Add trust signals and certifications');
      suggestions.push('Include detailed service comparisons');
      break;
  }

  return {
    detectedIntent: intent,
    optimizationRecommendations: recommendations,
    contentSuggestions: suggestions,
  };
}

// Función para generar estrategia de contenido basada en SEO
export function generateContentStrategy(
  _targetKeywords: string[], // Prefijo con _ para indicar que no se usa
  userIntent: UserIntent
): {
  contentType: string;
  structure: string[];
  seoOptimizations: string[];
  serpFeatures: string[];
} {
  const strategy = {
    contentType: '',
    structure: [] as string[],
    seoOptimizations: [] as string[],
    serpFeatures: [] as string[],
  };

  // Determinar tipo de contenido basado en intent
  switch (userIntent.type) {
    case 'informational':
      strategy.contentType = 'comprehensive_guide';
      strategy.structure = [
        'Introduction with target keyword',
        'Table of contents',
        'Main sections with H2 headings',
        'FAQ section',
        'Conclusion with CTA',
      ];
      strategy.seoOptimizations = [
        'Use target keywords in H1, H2, and H3',
        'Include related keywords naturally',
        'Add internal and external links',
        'Optimize for featured snippets',
      ];
      strategy.serpFeatures = ['featured_snippets', 'people_also_ask', 'knowledge_panel'];
      break;

    case 'transactional':
      strategy.contentType = 'service_page';
      strategy.structure = [
        'Service overview',
        'Benefits and features',
        'Pricing information',
        'Process explanation',
        'Customer testimonials',
        'Contact forms',
      ];
      strategy.seoOptimizations = [
        'Focus on conversion keywords',
        'Include pricing information',
        'Add trust signals',
        'Optimize for local search',
      ];
      strategy.serpFeatures = ['local_pack', 'rich_snippets', 'reviews'];
      break;

    case 'commercial':
      strategy.contentType = 'comparison_guide';
      strategy.structure = [
        'Comparison overview',
        'Comparison table',
        'Detailed analysis',
        'Recommendations',
        'Next steps',
      ];
      strategy.seoOptimizations = [
        'Use comparison keywords',
        'Include structured data for comparison',
        'Add pros and cons lists',
        'Optimize for "vs" queries',
      ];
      strategy.serpFeatures = ['comparison_tables', 'rich_snippets'];
      break;
  }

  return strategy;
}

// Función para validar y optimizar Core Web Vitals
export function validateCoreWebVitals(currentMetrics: {
  lcp?: number;
  fid?: number;
  cls?: number;
}): {
  status: 'good' | 'needs_improvement' | 'poor';
  recommendations: string[];
  optimizations: string[];
} {
  const { lcp, fid, cls } = currentMetrics;
  const recommendations: string[] = [];
  const optimizations: string[] = [];

  let status: 'good' | 'needs_improvement' | 'poor' = 'good';

  // Validar LCP
  if (lcp) {
    if (lcp > 2.5) {
      status = lcp > 4 ? 'poor' : 'needs_improvement';
      recommendations.push(`LCP is ${lcp}s (target: <2.5s)`);
      optimizations.push(...ULTRA_PERFORMANCE_SEO.coreWebVitals.lcp.strategies);
    }
  }

  // Validar FID
  if (fid) {
    if (fid > 100) {
      status = fid > 300 ? 'poor' : 'needs_improvement';
      recommendations.push(`FID is ${fid}ms (target: <100ms)`);
      optimizations.push(...ULTRA_PERFORMANCE_SEO.coreWebVitals.fid.strategies);
    }
  }

  // Validar CLS
  if (cls) {
    if (cls > 0.1) {
      status = cls > 0.25 ? 'poor' : 'needs_improvement';
      recommendations.push(`CLS is ${cls} (target: <0.1)`);
      optimizations.push(...ULTRA_PERFORMANCE_SEO.coreWebVitals.cls.strategies);
    }
  }

  return { status, recommendations, optimizations };
}

// Función para generar estrategia de local SEO
export function generateLocalSEOStrategy(targetLocation: string): {
  keywords: string[];
  contentIdeas: string[];
  citationSources: string[];
  optimizationTasks: string[];
} {
  const isPrimaryMarket = GEO_CONFIG.markets.primary.includes(targetLocation);
  // const isSecondaryMarket = GEO_CONFIG.markets.secondary.includes(targetLocation); // Comentado porque no se usa

  const keywords = [
    `${targetLocation} technology consultant`,
    `${targetLocation} business consultant`,
    `professional services ${targetLocation}`,
    `${targetLocation} digital transformation`,
  ];

  const contentIdeas = [
    `${targetLocation} Business Technology Trends`,
    `Best Technology Consultants in ${targetLocation}`,
    `${targetLocation} Digital Transformation Guide`,
    `Local Business Success Stories in ${targetLocation}`,
  ];

  const citationSources = [
    'Google My Business',
    'Bing Places',
    'Yelp',
    'Facebook',
    'LinkedIn',
    ...(isPrimaryMarket ? ULTRA_LOCAL_SEO.localCitations.industrySpecific : []),
  ];

  const optimizationTasks = [
    'Optimize Google My Business listing',
    'Create location-specific landing page',
    'Build local citations',
    'Encourage customer reviews',
    'Create local content',
    'Optimize for local keywords',
  ];

  return { keywords, contentIdeas, citationSources, optimizationTasks };
}

// ============================================================================
// 21. CONFIGURACIÓN CONSOLIDADA ULTRA AVANZADA COMPLETA
// ============================================================================

export const MASTER_SEO_CONFIG = {
  business: BUSINESS_INFO,
  site: SITE_INFO,
  market: MARKET_CONFIG,
  keywords: ADVANCED_SEO_KEYWORDS,
  ai: ADVANCED_AI_OPTIMIZATION,
  brand: BRAND_CONFIG,
  geo: GEO_CONFIG,
  seo: ULTRA_SEO_CONFIG,
  images: ADVANCED_IMAGE_ASSETS,
  aeo: ULTRA_AEO_CONFIG,
  gso: ULTRA_GSO_CONFIG,
  intent: ULTRA_INTENT_CONFIG,
  aiSuggestions: ULTRA_AI_SUGGESTIONS,
  templates: ULTRA_CONTENT_TEMPLATES,
  technical: ULTRA_TECHNICAL_CONFIG,
  eeat: ULTRA_EEAT_CONFIG,
  semantic: ULTRA_SEMANTIC_SEO,
  performance: ULTRA_PERFORMANCE_SEO,
  local: ULTRA_LOCAL_SEO,
  serpFeatures: ULTRA_SERP_FEATURES,
  competitive: ULTRA_COMPETITIVE_SEO,
  conversion: ULTRA_CONVERSION_SEO,
} as const;

export default MASTER_SEO_CONFIG;

// CONFIGURACIÓN CENTRALIZADA PARA SITEMAPS Y ROBOTS.TXT

export const EXCLUDE_FILES = [
  '404.astro',
  '404.html',
  '500.astro',
  '500.html', // Errores comunes
  // Agrega aquí otros archivos que quieras excluir, por ejemplo:
  // "privada.astro", "admin.astro"
];

export const ROBOTS_RULES = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /404',
  'Disallow: /500',
  // Puedes agregar más reglas aquí si lo deseas
];

// ============================================================================
// ✅ FIN DEL ARCHIVO - CONFIGURACIÓN COMPLETA
// ============================================================================
// 
// 🎯 RESUMEN FINAL:
// - Líneas 1-200: CONFIGURACIÓN EDITABLE (modifica aquí)
// - Líneas 200+: CONFIGURACIÓN AUTOMÁTICA (no modificar)
// 
// 🚀 Tu configuración SEO ultra-avanzada está lista para usar
// ============================================================================