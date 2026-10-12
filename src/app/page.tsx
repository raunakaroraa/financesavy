import React from 'react';
import Link from 'next/link';
import { 
  Flame, 
  TrendingDown, 
  Percent, 
  Home, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  FileSpreadsheet, 
  Scale, 
  Clock, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import AdBanner from '@/components/AdBanner';

export const metadata = {
  title: 'FinSavvy | Precision Wealth Planning & Financial Decision Engines',
  description:
    'Free personal finance calculators for early retirement (FIRE), debt elimination (snowball vs avalanche), compound interest, mortgage amortization, 50/30/20 budgeting, and emergency runways.',
};

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes FinSavvy calculators different from basic online calculators?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FinSavvy calculators are client-side mathematical engines built on audited CFPB and Federal Reserve compounding and amortization formulas. They account for inflation adjustments, real purchasing power, tax and insurance escrows, and comparative debt strategies without collecting personal data or requiring accounts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my personal financial information stored or sent to a server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. FinSavvy performs 100% of calculations directly in your browser using client-side JavaScript. No bank accounts, names, income figures, or debt values are stored or transmitted to any server.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the debt avalanche method save more money than the debt snowball?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The debt avalanche method targets the debt with the highest annual percentage rate (APR) first, which mathematically minimizes the accumulation of compounding interest across all your accounts. The snowball method targets the smallest balance first for psychological motivation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What safe withdrawal rate (SWR) should I use for early retirement (FIRE)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The historic Trinity Study established a 4% annual withdrawal rate for a 30-year traditional retirement. For early retirees with 40 to 50-year horizons, financial researchers recommend modeling between 3.25% and 3.75% to guard against prolonged sequence-of-returns risk.',
        },
      },
    ],
  };

  return (
    <div className="space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TOP LEADERBOARD AD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdBanner format="leaderboard" />
      </div>

      {/* HERO SECTION: Editorial, Authoritative & Grounded */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Audited Financial Mathematics &bull; v2026 Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Stop guessing your financial future. <br className="hidden sm:inline" />
              <span className="text-emerald-700 underline decoration-emerald-200 underline-offset-8">
                Calculate it with precision.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              An independent suite of mathematical simulation engines for early retirement, debt elimination, accelerated mortgages, and wealth accumulation. No paywalls, no login barriers, 100% private.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/calculators/fire-calculator"
                className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>Simulate Early Retirement</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              
              <Link
                href="/calculators/debt-payoff"
                className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm px-5 py-3 rounded-xl shadow-xs transition-all"
              >
                <TrendingDown className="w-4 h-4 text-emerald-700" />
                <span>Compare Debt Strategies</span>
              </Link>
            </div>

            {/* Quick Proof Metrics */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-slate-700">
              <div>
                <div className="font-mono text-2xl font-bold text-slate-900">$0</div>
                <div className="text-xs text-slate-500 mt-0.5">Free forever, zero ads clutter</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-slate-900">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Client-side private calculation</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-emerald-700">6 Engines</div>
                <div className="text-xs text-slate-500 mt-0.5">CFPB & Federal Reserve aligned</div>
              </div>
            </div>
          </div>

          {/* Interactive Fast-Calculator Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Quick Benchmark
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  Live Rule of 72
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  How fast will your investment double at typical market annualized returns?
                </p>

                <div className="space-y-2.5">
                  {[
                    { asset: 'High-Yield Savings (4.5%)', years: '16.0 Years to 2x', yieldColor: 'text-amber-400' },
                    { asset: 'Conservative Balanced (6.5%)', years: '11.1 Years to 2x', yieldColor: 'text-sky-400' },
                    { asset: 'Broad Index Funds (9.0%)', years: '8.0 Years to 2x', yieldColor: 'text-emerald-400' },
                    { asset: 'Aggressive Equities (11.0%)', years: '6.5 Years to 2x', yieldColor: 'text-teal-300' },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/70 border border-slate-700/50 text-xs"
                    >
                      <span className="text-slate-300 font-medium">{row.asset}</span>
                      <span className={`font-mono font-bold ${row.yieldColor}`}>
                        {row.years}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Want custom monthly compounding?</span>
                  <Link
                    href="/calculators/compound-interest"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
                  >
                    <span>Open Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CORE 6 FINANCIAL ENGINES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Specialized Wealth & Debt Engines
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select an audited calculator to model your numbers with real-time feedback.
            </p>
          </div>
          <Link
            href="/methodology"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
          >
            <span>Review mathematical derivations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Engine 1: FIRE */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  FIRE Model
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  FIRE Freedom Simulator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Determine your exact Financial Independence Number, safe withdrawal rate (SWR), and project Coast FIRE and Fat FIRE milestones.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3.5% - 4.0% SWR testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inflation erosion adjustments</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/calculators/fire-calculator"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <span>Launch FIRE Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Engine 2: Debt Payoff */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/80">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  Debt Engine
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Debt Snowball vs Avalanche
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Enter multiple credit cards and loans to see the exact dollar amount and months saved by prioritizing interest over balance.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Multi-account ledger modeling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Extra monthly rollover optimization</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/calculators/debt-payoff"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <span>Compare Debt Strategies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Engine 3: Compound Interest */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  <Percent className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Wealth Multiplier
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Compound Interest & Wealth
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Visualize exponential portfolio growth with recurring deposits, compounding frequencies, and purchasing power deflation toggles.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive year-by-year schedule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real inflation-adjusted returns</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/calculators/compound-interest"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <span>Calculate Compound Returns</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Engine 4: Mortgage Accelerator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  Home Equity
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Mortgage Payoff Accelerator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Discover how an extra $100 or $250/month in principal payments cuts thousands in interest and shaves years off a 30-year loan.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Full 30-year amortization ledger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Taxes, insurance & PMI escrows</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/calculators/mortgage-accelerator"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <span>Accelerate Mortgage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Engine 5: 50/30/20 Budget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/80">
                  <PieChart className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                  Cashflow
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  50/30/20 Smart Budget Allocator
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Divide your after-tax salary into essential Needs, lifestyle Wants, and long-term Savings with custom ratio controls.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Category-by-category target limits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>10-year wealth compounding projection</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/calculators/budget-planner"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <span>Structure Budget</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Engine 6: Emergency Fund */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Runway
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Emergency Fund & Runway
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Assess your household stability risk factor to calculate your true survival runway, HYSA yields, and cash cushion score.
                </p>
              </div>
              <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>High-yield savings APY earnings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Risk-adjusted month recommendations</span>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/calculators/emergency-fund"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
              >
                <span>Check Runway Score</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* MID-PAGE ADVERTISEMENT SLOT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner format="in-article" />
      </div>

      {/* EDITORIAL MANIFESTO: The Mathematical Advantage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              <span>Editorial Independence & Standards</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Financial Mathematics Trumps Financial Marketing
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Most online financial advice is driven by affiliate commissions: credit card signups, high-interest personal loans, or expensive wealth management fees. FinSavvy was founded on a contrary principle: that everyday individuals make soundest choices when given direct, uncorrupted access to mathematical truth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs">
              <div className="border-l-2 border-emerald-500 pl-4 space-y-1.5">
                <h4 className="font-bold text-white text-sm">Deterministic Formulas</h4>
                <p className="text-slate-400">
                  Every calculation on this platform uses publicly verifiable formulas conforming to Consumer Financial Protection Bureau and Federal Reserve guidelines.
                </p>
              </div>

              <div className="border-l-2 border-emerald-500 pl-4 space-y-1.5">
                <h4 className="font-bold text-white text-sm">Zero Data Collection</h4>
                <p className="text-slate-400">
                  We require no account creation, no email address, and no bank integration. All math executes purely in your browser memory and disappears when you close the tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ): Rich SEO Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Financial Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Authoritative answers grounded in financial modeling and economic research.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'What makes FinSavvy calculators different from basic online calculators?',
              a: 'FinSavvy calculators are client-side mathematical engines built on audited CFPB and Federal Reserve compounding and amortization formulas. They account for inflation adjustments, real purchasing power, tax and insurance escrows, and comparative debt strategies without collecting personal data or requiring accounts.',
            },
            {
              q: 'Is my personal financial information stored or sent to a server?',
              a: 'No. FinSavvy performs 100% of calculations directly in your browser using client-side JavaScript. No bank accounts, names, income figures, or debt values are stored or transmitted to any server.',
            },
            {
              q: 'How does the debt avalanche method save more money than the debt snowball?',
              a: 'The debt avalanche method targets the debt with the highest annual percentage rate (APR) first, which mathematically minimizes the accumulation of compounding interest across all your accounts. The snowball method targets the smallest balance first for psychological motivation.',
            },
            {
              q: 'What safe withdrawal rate (SWR) should I use for early retirement (FIRE)?',
              a: 'The historic Trinity Study established a 4% annual withdrawal rate for a 30-year traditional retirement. For early retirees with 40 to 50-year horizons, financial researchers recommend modeling between 3.25% and 3.75% to guard against prolonged sequence-of-returns risk.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
            Take Control of Your Financial Trajectory Today
          </h2>
          <p className="text-xs sm:text-sm text-emerald-900 max-w-xl mx-auto leading-relaxed">
            No signup. No spam. Choose an engine below and begin modeling your route to complete financial independence.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/fire-calculator"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm"
            >
              Launch FIRE Simulator
            </Link>
            <Link
              href="/calculators/debt-payoff"
              className="bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold text-xs px-5 py-3 rounded-xl transition-colors"
            >
              Eliminate Debt Faster
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
