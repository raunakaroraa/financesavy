import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://financesavvy.org';
  const lastModified = new Date('2026-01-01');

  const routes = [
    '',
    '/calculators/fire-calculator',
    '/calculators/debt-payoff',
    '/calculators/compound-interest',
    '/calculators/mortgage-accelerator',
    '/calculators/budget-planner',
    '/calculators/emergency-fund',
    '/methodology',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route.startsWith('/calculators') ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/calculators') ? 0.9 : 0.6,
  }));
}
