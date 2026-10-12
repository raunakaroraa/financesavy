import { Metadata } from 'next';

export const SITE_NAME = 'FinSavvy';
export const SITE_URL = 'https://financesavvy.org'; // Default base domain
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
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: 'FinSavvy Financial Engineering Team' }],
    creator: 'FinSavvy',
    publisher: 'FinSavvy',
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
      creator: '@financesavvy',
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
      name: 'FinSavvy',
      url: SITE_URL,
    },
  };
}
