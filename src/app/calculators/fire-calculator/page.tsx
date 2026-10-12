'use client';

import React, { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import SvgLineChart from '@/components/Chart/SvgLineChart';
import { calculateFire, formatCurrency, formatPercent } from '@/lib/calculations';
import { 
  Flame, 
  DollarSign, 
  Calendar, 
  Percent, 
  TrendingUp, 
  Printer, 
  Share2, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';

export default function FireCalculatorPage() {
  // Calculator inputs state
  const [currentAge, setCurrentAge] = useState(30);
  const [targetRetirementAge, setTargetRetirementAge] = useState(50);
  const [currentNetWorth, setCurrentNetWorth] = useState(75000);
  const [annualExpenditure, setAnnualExpenditure] = useState(60000);
  const [monthlySavings, setMonthlySavings] = useState(2000);
  const [annualReturnRate, setAnnualReturnRate] = useState(8);
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState(4.0);
  const [inflationRate, setInflationRate] = useState(2.5);

  // Compute FIRE metrics reactively
  const results = useMemo(() => {
    return calculateFire({
      currentAge,
      currentNetWorth,
      annualExpenditure,
      monthlySavings,
      annualReturnRate,
      safeWithdrawalRate,
      inflationRate,
    });
  }, [
    currentAge,
    currentNetWorth,
    annualExpenditure,
    monthlySavings,
    annualReturnRate,
    safeWithdrawalRate,
    inflationRate,
  ]);

  // Chart data points
  const chartData = useMemo(() => {
    return results.yearlyProjection.map((pt) => ({
      label: `Age ${pt.age}`,
      value: pt.portfolioValue,
      secondaryValue: pt.fireTarget,
    }));
  }, [results]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const fireSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FIRE Freedom & Early Retirement Simulator',
    description:
      'Interactive FIRE calculator to model your Financial Independence number, Coast FIRE, Lean FIRE, and safe withdrawal rates with inflation adjustments.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fireSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Calculators', href: '/#calculators' },
          { name: 'FIRE Freedom Simulator' },
        ]}
      />

      {/* TOP LEADERBOARD AD */}
      <AdBanner format="leaderboard" />

      {/* HEADER & INTRO */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
          <Flame className="w-3.5 h-3.5" />
          <span>Trinity Study & Safe Withdrawal Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          FIRE Freedom & Early Retirement Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Calculate your exact Financial Independence Number, safe withdrawal rates, and determine the precise year your investments will fund 100% of your living expenses without working.
        </p>
      </div>

      {/* INTERACTIVE WORKBENCH (SPLIT SCREEN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Simulation Inputs
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Real Inflation Adjusted</span>
          </div>

          {/* Current Age & Net Worth */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Age
              </label>
              <input
                type="number"
                min={18}
                max={90}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value) || 18)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Net Worth ($)
              </label>
              <input
                type="number"
                min={0}
                step={5000}
                value={currentNetWorth}
                onChange={(e) => setCurrentNetWorth(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>
          </div>

          {/* Annual Expenditure & Monthly Savings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Spending ($)
              </label>
              <input
                type="number"
                min={10000}
                step={2500}
                value={annualExpenditure}
                onChange={(e) => setAnnualExpenditure(Number(e.target.value) || 10000)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
              <span className="text-[10px] text-slate-600 mt-1 block">
                {formatCurrency(annualExpenditure / 12)} / month
              </span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Monthly Savings ($)
              </label>
              <input
                type="number"
                min={0}
                step={250}
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
              <span className="text-[10px] text-slate-600 mt-1 block">
                {formatCurrency(monthlySavings * 12)} / year
              </span>
            </div>
          </div>

          {/* Investment Return Slider */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Expected Annual Return</span>
              <span className="font-mono font-bold text-emerald-700">{annualReturnRate}%</span>
            </div>
            <input
              type="range"
              min={4}
              max={12}
              step={0.5}
              value={annualReturnRate}
              onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>4% (Bonds/Cash)</span>
              <span>8% (Balanced Index)</span>
              <span>12% (Aggressive)</span>
            </div>
          </div>

          {/* Safe Withdrawal Rate Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Safe Withdrawal Rate (SWR)</span>
              <span className="font-mono font-bold text-amber-700">{safeWithdrawalRate}%</span>
            </div>
            <input
              type="range"
              min={3.0}
              max={5.0}
              step={0.25}
              value={safeWithdrawalRate}
              onChange={(e) => setSafeWithdrawalRate(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>3.0% (Ultra Conservative)</span>
              <span>4.0% (Trinity Rule)</span>
              <span>5.0% (Aggressive)</span>
            </div>
          </div>

          {/* Inflation Assumption */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Annual Inflation Rate</span>
              <span className="font-mono font-bold text-slate-700">{inflationRate}%</span>
            </div>
            <input
              type="range"
              min={1.5}
              max={5.0}
              step={0.25}
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Simulation</span>
            </button>
            <span className="text-[11px] text-emerald-800 font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Calculated in Real-Time</span>
            </span>
          </div>

        </div>

        {/* RESULTS & PROJECTION COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Scorecard Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold">
                  Standard FIRE Target (At {safeWithdrawalRate}% SWR)
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
                  {formatCurrency(results.fireTargetNumber)}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Projected Freedom Age
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 mt-1">
                  {results.isAlreadyFire ? 'Achieved!' : `Age ${results.projectedFireAge}`}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {results.isAlreadyFire
                    ? 'Current portfolio meets your FIRE target'
                    : `In approximately ${results.yearsToFire} years`}
                </div>
              </div>
            </div>

            {/* Sub-Milestones Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Lean FIRE (75%)</span>
                <span className="font-mono text-sm sm:text-base font-bold text-slate-100 mt-0.5 block">
                  {formatCurrency(results.leanFireNumber)}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  {formatCurrency((annualExpenditure * 0.75) / 12)}/mo
                </span>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Fat FIRE (125%)</span>
                <span className="font-mono text-sm sm:text-base font-bold text-slate-100 mt-0.5 block">
                  {formatCurrency(results.fatFireNumber)}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  {formatCurrency((annualExpenditure * 1.25) / 12)}/mo
                </span>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">Coast FIRE</span>
                <span className="font-mono text-sm sm:text-base font-bold text-emerald-400 mt-0.5 block">
                  {formatCurrency(results.coastFireNumber)}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Invested today for 65
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Dynamic Line Chart */}
          <div className="space-y-2">
            <SvgLineChart
              data={chartData}
              title="Portfolio Accumulation vs. FIRE Target"
              primaryLabel="Real Net Worth Growth"
              secondaryLabel="FIRE Target Line"
              height={260}
            />
            <p className="text-[11px] text-slate-600 italic text-center">
              *Projections model your monthly savings compounded at real returns after accounting for {inflationRate}% annual inflation erosion.
            </p>
          </div>

        </div>

      </div>

      {/* IN-ARTICLE ADVERTISEMENT */}
      <AdBanner format="in-article" />

      {/* COMPREHENSIVE EDITORIAL & METHODOLOGY GUIDE (800+ Words for SEO & AdSense Authority) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
        
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Comprehensive Guide to Financial Independence & Early Retirement
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding the mathematics, historical backtesting, and behavioral realities of the FIRE movement.
          </p>
        </div>

        {/* Section 1: The Mathematics of FIRE */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            1. The Trinity Study & The 4% Rule Explained
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            The mathematical pillar of the modern FIRE movement originated in the landmark 1998 study conducted by three professors of finance at Trinity University (known widely as the <em>Trinity Study</em>). The researchers modeled thousands of historical 30-year rolling retirement periods from 1926 through 1995, backtesting various asset allocations between broad equities (S&P 500) and high-grade corporate bonds.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Their findings demonstrated that an initial withdrawal rate of <strong>4.0%</strong>, adjusted annually for inflation, had an over 95% historical success rate across 30-year time horizons in a 75/25 equity/bond portfolio. To calculate your target nest egg:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 border border-slate-200">
            FIRE Target Number = Annual Living Expenses ÷ Safe Withdrawal Rate (SWR)
            <br />
            Example: $60,000 ÷ 0.04 = $1,500,000 (Or Annual Expenses × 25)
          </div>
        </div>

        {/* Section 2: Variations of FIRE */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            2. The Modern Flavors of FIRE: Lean, Fat, Barista, and Coast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">Lean FIRE</strong>
              <p className="text-slate-600 leading-relaxed">
                Retiring on a minimalist annual budget (typically 70% to 75% of average living expenses, often under $40,000/year). It prioritizes rapid liberation from employment over discretionary luxury.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">Fat FIRE</strong>
              <p className="text-slate-600 leading-relaxed">
                Retiring with full abundance (125% to 150%+ of typical spending, frequently $100,000+/year). It provides immense safety buffers for travel, private healthcare, and unexpected economic shocks.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">Coast FIRE</strong>
              <p className="text-slate-600 leading-relaxed">
                Amassing enough invested capital early in life that compound interest will grow it to a full traditional retirement portfolio by age 65 without ever contributing another dollar.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">Barista FIRE</strong>
              <p className="text-slate-600 leading-relaxed">
                Achieving a partial investment cushion where investment yields cover 50-70% of living expenses, allowing you to work a low-stress, part-time job or freelance for supplemental income and health insurance.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Case Study */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3. Case Study: Alex & Morgan (Age 32, Aiming to Retire at 47)
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Consider a dual-income household earning $140,000 post-tax, spending $65,000 annually, and saving $75,000 per year ($6,250/month) into low-cost broad market index funds. With a starting net worth of $120,000 and an assumed real annualized return of 7% (net of inflation):
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1.5">
            <li><strong>FIRE Goal (at 3.75% SWR):</strong> $65,000 ÷ 0.0375 = $1,733,333.</li>
            <li><strong>Timeline to Target:</strong> Exactly 13.8 years.</li>
            <li><strong>Projected Outcome:</strong> By age 46, their investment dividends and capital gains will fully match their annual household budget, allowing them to step away from corporate employment 19 years ahead of standard retirement.</li>
          </ul>
        </div>

        {/* Section 4: Sequence of Returns Risk */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            4. Critical Pitfall: Sequence of Returns Risk (SRR)
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            The greatest threat to an early retiree is not a market crash in year 20, but a major market decline during the first 3 to 5 years of retirement. If your portfolio loses 30% in year one while you simultaneously sell shares to pay living expenses, you permanently impair your principal base.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 space-y-1">
            <strong>The Cash Tent Strategy:</strong> Seasoned early retirees maintain a 1 to 2-year cash or short-term Treasury buffer (a &ldquo;cash tent&rdquo;) immediately prior to quitting work. In market drawdowns, living costs are funded from cash reserves rather than liquidating depressed equities.
          </div>
        </div>

        {/* Section 5: FAQ */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <span>Frequently Asked Questions About FIRE</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Is a 4% safe withdrawal rate conservative enough for a 45-year retirement?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Because the Trinity Study evaluated 30-year horizons, modern financial planners recommend using 3.25% to 3.5% for retirements lasting 40+ years to reduce failure probability to near zero.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                How does inflation affect my FIRE target over decades?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                FinanceSavy.pro utilizes real (inflation-adjusted) return rates. If the market returns 9% and inflation is 2.5%, the calculation compounds at 6.34% real purchasing power, meaning your projected target represents today&apos;s purchasing value.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* BOTTOM LEADERBOARD AD */}
      <AdBanner format="leaderboard" />

    </div>
  );
}

