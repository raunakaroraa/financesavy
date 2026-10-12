# FinSavvy — Precision Wealth & Financial Decision Suite

FinSavvy is a high-performance, AdSense-optimized personal finance web application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Designed from the ground up to provide authentic mathematical utility, high dwell time, and compliance with Google's EEAT and AdSense Quality Rater guidelines.

---

## 🚀 Key Features & Core Decision Engines

1. **FIRE Freedom & Early Retirement Simulator (`/calculators/fire-calculator`)**
   - Models Trinity Study safe withdrawal rates (3.0% to 5.0%), Lean FIRE, Fat FIRE, and Coast FIRE milestones.
   - Dynamic interactive SVG accumulation curve with inflation erosion adjustments.
   - 800+ word educational methodology guide and rich Schema.org FAQ markup.

2. **Debt Snowball vs. Avalanche Optimizer (`/calculators/debt-payoff`)**
   - Multi-account debt manager (credit cards, student loans, auto loans, personal lines).
   - Head-to-head comparison engine displaying exact dollars saved in interest and months saved.
   - Month-by-month rollover schedule simulation.

3. **Compound Wealth Multiplier (`/calculators/compound-interest`)**
   - Periodic annuity compounding with customizable compounding frequencies (daily, monthly, quarterly, annual).
   - Real purchasing power deflation toggle.
   - Expandable annual accumulation ledger and SVG line chart.

4. **Accelerated Mortgage & Amortization Payoff (`/calculators/mortgage-accelerator`)**
   - Fixed-rate mortgage P&I calculations conforming to CFPB truth-in-lending rules.
   - Escrow modeling (property taxes & homeowners insurance).
   - Extra principal payment accelerator displaying exact lifetime interest saved and years shaved off the loan.

5. **50/30/20 Smart Budget & Cashflow Allocator (`/calculators/budget-planner`)**
   - Net take-home salary allocation into Needs (50%), Wants (30%), and Savings (20%).
   - Presets for high savers and high-cost-of-living (HCOL) metropolitan areas.
   - Interactive SVG donut chart and 10-year wealth compounding projection.

6. **Emergency Fund & Runway Resilience Checker (`/calculators/emergency-fund`)**
   - Essential survival burn rate tally.
   - Risk profiling: dual steady earners (3 months), single earner (6 months), freelance/commission (9-12 months).
   - Annual passive interest calculations for High-Yield Savings Accounts (HYSA).

---

## ⚖️ Google AdSense & EEAT Compliance Suite

- **100% Client-Side Privacy**: Zero financial data is sent to a server.
- **Mathematical Methodology (`/methodology`)**: Public derivations of compounding, amortization, and Fisher inflation equations.
- **About Us (`/about`)**: Editorial mission, verification principles, and team transparency.
- **Contact Us (`/contact`)**: Working interactive contact form, support channels, and response SLA.
- **Privacy Policy (`/privacy-policy`)**: Full GDPR, CCPA, and mandatory Google DoubleClick DART cookie clauses.
- **Terms of Service (`/terms`)**: Permissible use and user agreement.
- **Financial Disclaimer (`/disclaimer`)**: Essential YMYL disclosure for financial simulation tools.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 💰 Connecting Google AdSense

1. Open `.env.local` (or create one in the root directory).
2. Add your AdSense Publisher ID:
   ```env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```
3. The `<AdBanner />` component will automatically activate responsive, policy-compliant ad units across the site.

---

## 🔍 SEO & Google Search Console Verification

- **Sitemap**: Available dynamically at `/sitemap.xml`.
- **Robots.txt**: Available at `/robots.txt`.
- **Structured Data**: Every calculator emits JSON-LD microdata (`WebApplication`, `FAQPage`, `BreadcrumbList`).
- Update your Google verification tag in `src/app/layout.tsx`:
  ```ts
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE',
  }
  ```
