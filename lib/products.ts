import productsData from '@/data/products.json';

type Product = (typeof productsData.products)[number];
type InspirationProject = (typeof productsData.inspirationProjects)[number];

interface RecommendParams {
  categories: string[];
  homeStyle?: string;
  budgetTier?: 'moderate' | 'premium' | 'luxury';
  colorFamily?: string;
  region?: string;
  projectType?: string;
}

interface ColorParams {
  brand: 'hardie' | 'azek' | 'timbertech' | 'struxure';
  productLine: string;
  coordinateWith?: string;
}

interface InspirationParams {
  style?: string;
  products?: string[];
  region?: string;
}

export function getProductRecommendations(params: RecommendParams) {
  const { categories, homeStyle, budgetTier, region } = params;

  const TIER_ORDER = { moderate: 0, premium: 1, luxury: 2 };

  let results = productsData.products.filter((p) => {
    const categoryMatch = categories.some(
      (c) => p.category === c || p.category.startsWith(c),
    );
    const budgetMatch = budgetTier
      ? TIER_ORDER[p.priceRange as keyof typeof TIER_ORDER] <=
        TIER_ORDER[budgetTier]
      : true;
    const styleMatch = homeStyle
      ? p.styles.includes(homeStyle) || p.styles.includes('all')
      : true;
    const regionMatch =
      !region || p.regions.includes(region) || p.regions.includes('all');

    return categoryMatch && budgetMatch && styleMatch && regionMatch;
  });

  // Deduplicate to best-match per category
  const seen = new Set<string>();
  results = results.filter((p) => {
    if (seen.has(p.category)) return false;
    seen.add(p.category);
    return true;
  });

  return {
    products: results.map(productToCard),
    count: results.length,
    ecosystem_tip: buildEcosystemTip(categories),
  };
}

export function getColorOptions(params: ColorParams) {
  const { brand, productLine } = params;
  const products = productsData.products.filter(
    (p) =>
      p.brand === brand &&
      p.name.toLowerCase().includes(productLine.toLowerCase()),
  );

  return {
    products: products.map((p) => ({
      productName: p.name,
      brand: p.brandName,
      colors: p.colors,
    })),
  };
}

export function getInspirationProjects(params: InspirationParams) {
  const { style, region } = params;

  let projects = productsData.inspirationProjects as InspirationProject[];
  if (style) projects = projects.filter((p) => p.style === style);
  if (region) projects = projects.filter((p) => p.region === region);

  return {
    projects: projects.map((proj) => ({
      ...proj,
      featuredProducts: productsData.products
        .filter((p) => proj.products.includes(p.id))
        .map(productToCard),
    })),
  };
}

function productToCard(p: Product) {
  return {
    id: p.id,
    brand: p.brandName,
    category: p.category,
    name: p.name,
    tagline: p.tagline,
    priceRange: p.priceRange,
    colors: p.colors.slice(0, 6),
    keyBenefits: p.keyBenefits.slice(0, 3),
    learnMoreUrl: p.learnMoreUrl,
  };
}

function buildEcosystemTip(categories: string[]): string {
  const missing: string[] = [];
  const all = ['siding', 'trim', 'decking', 'pergola'];
  all.forEach((c) => {
    if (!categories.some((cat) => cat === c || c.startsWith(cat))) {
      missing.push(c);
    }
  });
  if (missing.length === 0) return 'You\'re building the complete One Hardie exterior — the ultimate resilient beauty system.';
  return `Complete the picture: add ${missing.join(', ')} to create a cohesive whole-home exterior.`;
}
