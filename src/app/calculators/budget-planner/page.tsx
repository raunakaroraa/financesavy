'use client';

import React, { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import SvgDonutChart from '@/components/Chart/SvgDonutChart';
import { calculateBudget, formatCurrency } from '@/lib/calculations';
import { 
  PieChart, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Printer, 
  HelpCircle,
  Sparkles,
  Layers
} from 'lucide-react';

export default function BudgetPlannerPage() {
  const [monthlyNetIncome, setMonthlyNetIncome] = useState<number>(5500);
  const [needsRatio, setNeedsRatio] = useState<number>(50);
  const [wantsRatio, setWantsRatio] = useState<number>(30);
  const [savingsRatio, setSavingsRatio] = useState<number>(20);

  const results = useMemo(() => {
    return calculateBudget({
      monthlyNetIncome,
      needsRatio,
      wantsRatio,
      savingsRatio,
    });
  }, [monthlyNetIncome, needsRatio, wantsRatio, savingsRatio]);

  const donutData = [
    { label: 'Essential Needs', value: results.needsAmount, color: '#0ea5e9' },
    { label: 'Lifestyle Wants', value: results.wantsAmount, color: '#f59e0b' },
    { label: 'Wealth Savings', value: results.savingsAmount, color: '#10b981' },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '50/30/20 Smart Budget & Cashflow Allocator',
    description:
      'Divide your take-home salary into 50% Needs, 30% Wants, and 20% Savings. Project 10-year compounding wealth and category spending targets.',
    applicationCategory: 'FinanceApplication',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Calculators', href: '/#calculators' },
          { name: '50/30/20 Smart Budget Allocator' },
        ]}
      />

      <AdBanner format="leaderboard" />

      {/* HEADER */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200">
          <PieChart className="w-3.5 h-3.5" />
          <span>Elizabeth Warren Cashflow Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          50/30/20 Smart Budget & Cashflow Allocator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Allocate your after-tax monthly income across essential survival costs, discretionary lifestyle choices, and future wealth generation with precision category limits.
        </p>
      </div>

      {/* WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Monthly Income & Ratios
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">
              Net Take-Home
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Monthly After-Tax Income ($)
            </label>
            <input
              type="number"
              min={1000}
              step={250}
              value={monthlyNetIncome}
              onChange={(e) => setMonthlyNetIncome(Number(e.target.value) || 1000)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Annualized net take-home: {formatCurrency(monthlyNetIncome * 12)}
            </span>
          </div>

          {/* Ratio Preset Buttons */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-700">
              Allocation Blueprint Presets
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { name: 'Standard (50/30/20)', n: 50, w: 30, s: 20 },
                { name: 'High-Saver (50/20/30)', n: 50, w: 20, s: 30 },
                { name: 'HCOL Area (60/20/20)', n: 60, w: 20, s: 20 },
              ].map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setNeedsRatio(preset.n);
                    setWantsRatio(preset.w);
                    setSavingsRatio(preset.s);
                  }}
                  className={`py-2 px-2 rounded-lg border text-center font-medium transition-colors ${
                    needsRatio === preset.n && wantsRatio === preset.w && savingsRatio === preset.s
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Needs Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Needs (Essential Survival)</span>
              <span className="font-mono font-bold text-sky-600">{needsRatio}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={70}
              value={needsRatio}
              onChange={(e) => setNeedsRatio(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>

          {/* Wants Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Wants (Lifestyle & Comfort)</span>
              <span className="font-mono font-bold text-amber-600">{wantsRatio}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              value={wantsRatio}
              onChange={(e) => setWantsRatio(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Savings Slider */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-700">Savings & Debt Paydown</span>
              <span className="font-mono font-bold text-emerald-600">{savingsRatio}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              value={savingsRatio}
              onChange={(e) => setSavingsRatio(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Budget Plan</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              Total: {needsRatio + wantsRatio + savingsRatio}%
            </span>
          </div>

        </div>

        {/* RESULTS & DONUT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main 3 Buckets Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-sky-800">
                Needs ({needsRatio}%)
              </span>
              <div className="text-2xl font-extrabold font-mono text-sky-950">
                {formatCurrency(results.needsAmount)}
              </div>
              <p className="text-[11px] text-sky-700">
                Housing, groceries, bills, debt minimums.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-amber-800">
                Wants ({wantsRatio}%)
              </span>
              <div className="text-2xl font-extrabold font-mono text-amber-950">
                {formatCurrency(results.wantsAmount)}
              </div>
              <p className="text-[11px] text-amber-700">
                Dining out, entertainment, hobbies.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-800">
                Savings ({savingsRatio}%)
              </span>
              <div className="text-2xl font-extrabold font-mono text-emerald-950">
                {formatCurrency(results.savingsAmount)}
              </div>
              <p className="text-[11px] text-emerald-700">
                401(k), Roth IRA, extra debt elimination.
              </p>
            </div>
          </div>

          {/* SvgDonutChart */}
          <SvgDonutChart
            data={donutData}
            title="Monthly Cashflow Breakdown"
            centerText={formatCurrency(monthlyNetIncome)}
            centerSubtext="Net Income"
          />

          {/* 10-Year Compounding Wealth Potential */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                  10-Year Compound Growth
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-sm">
                If you invest your {formatCurrency(results.savingsAmount)}/month savings bucket into broad index funds (7% return):
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                {formatCurrency(results.tenYearCompoundSavings)}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                From {formatCurrency(results.annualSavingsPotential * 10)} total deposits
              </div>
            </div>
          </div>

        </div>

      </div>

      <AdBanner format="in-article" />

      {/* EDUCATIONAL METHODOLOGY (800+ Words) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
        
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            The 50/30/20 Budgeting Rule: Origin, Practice, and Nuances
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How to structure an intuitive cashflow framework without obsessing over itemized receipts.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            1. The Origin of the 50/30/20 Framework
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            The 50/30/20 budget was popularized by Harvard bankruptcy scholar and U.S. Senator Elizabeth Warren and her daughter Amelia Warren Tyagi in their 2005 book <em>All Your Worth: The Ultimate Lifetime Money Plan</em>.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Unlike traditional budgeting systems that force you to track 40 granular categories like &ldquo;dry cleaning&rdquo; and &ldquo;paper towels&rdquo;, the 50/30/20 rule divides all after-tax income into three distinct buckets: Needs (50%), Wants (30%), and Savings (20%).
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            2. Defining the Boundaries: What Qualifies as a Need vs. a Want?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <strong className="text-slate-900 text-sm block">True Needs (Non-Negotiable)</strong>
              <p className="text-slate-600 leading-relaxed">
                Expenses required to stay alive, sheltered, and legally employable: modest rent/mortgage, basic groceries, utilities (power, water, internet), minimum required debt payments, basic transportation, and essential prescriptions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <strong className="text-slate-900 text-sm block">True Wants (Discretionary)</strong>
              <p className="text-slate-600 leading-relaxed">
                Choices that elevate comfort: restaurant dining, premium gym memberships, vacations, streaming services, designer apparel, and upgrades from a functional vehicle to a luxury automobile.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3. How to Adjust the Rule in High-Cost-of-Living (HCOL) Cities
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            In metropolitan hubs like New York, San Francisco, London, or Toronto, housing costs frequently consume 40% of net income alone, rendering the strict 50% Needs target unfeasible.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Financial engineers recommend shifting to a <strong>60/20/20</strong> model in HCOL regions: expand Needs to 60%, compress Wants to 20%, but keep the 20% Savings target non-negotiable. Reducing your savings allocation below 15-20% severely compromises your long-term compound wealth trajectory.
          </p>
        </div>

        {/* Section 4: FAQ */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-teal-700" />
            <span>Frequently Asked Questions About Cashflow Allocation</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Is 401(k) pre-tax contribution included before or after the 50/30/20 split?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                If you already have 10% deducted automatically from your paycheck into a 401(k), that counts toward your 20% savings bucket. You would only need to save an additional 10% from your take-home pay to fulfill the full 20% allocation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Where should the 20% savings bucket go first?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Priority order: 1) Employer 401(k) match, 2) 3 to 6-month cash emergency fund in a High-Yield Savings Account, 3) High-interest debt payoff (any debt over 7%), 4) Roth IRA, and 5) Taxable brokerage index funds.
              </p>
            </div>
          </div>
        </div>

      </section>

      <AdBanner format="leaderboard" />

    </div>
  );
}

