import { Metadata } from 'next';

export const SITE_NAME = 'FinanceSavy.pro';
export const SITE_URL = 'https://financesavy.pro';
export const DEFAULT_DESCRIPTION =
  'Precision personal finance decision suite. Interactive calculators for early retirement (FIRE), accelerated debt payoff, compound interest, mortgage amortization, 50/30/20 budgeting, and emergency runways.';

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  keywords = [],
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const defaultKeywords = [
    'personal finance calculator',
    'FIRE calculator',
    'early retirement simulator',
    'debt snowball vs avalanche',
    'compound interest calculator',
    'accelerated mortgage payoff',
    '50 30 20 budget calculator',
    'emergency fund runway',
    'wealth planning tool',
    'financesavy',
    'financesavy.pro',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: 'FinanceSavy.pro Financial Engineering Team' }],
    creator: 'FinanceSavy.pro',
    publisher: 'FinanceSavy.pro',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@financesavypro',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateAppJsonLd({
  name,
  description,
  url,
  category = 'FinanceApplication',
}: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory: category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'FinanceSavy.pro',
      url: SITE_URL,
    },
  };
}
