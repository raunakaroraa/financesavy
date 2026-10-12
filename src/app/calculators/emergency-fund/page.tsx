'use client';

import React, { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import SvgBarChart from '@/components/Chart/SvgBarChart';
import { calculateEmergencyFund, formatCurrency } from '@/lib/calculations';
import { 
  ShieldCheck, 
  DollarSign, 
  Calendar, 
  Percent, 
  TrendingUp, 
  Printer, 
  CheckCircle2, 
  HelpCircle,
  AlertTriangle,
  Award
} from 'lucide-react';

export default function EmergencyFundPage() {
  const [housing, setHousing] = useState<number>(1800);
  const [utilities, setUtilities] = useState<number>(350);
  const [food, setFood] = useState<number>(650);
  const [debtPayments, setDebtPayments] = useState<number>(400);
  const [insuranceAndHealth, setInsuranceAndHealth] = useState<number>(300);
  const [miscellaneousEssential, setMiscellaneousEssential] = useState<number>(200);
  const [currentSavings, setCurrentSavings] = useState<number>(15000);
  const [incomeStability, setIncomeStability] = useState<'high' | 'medium' | 'freelance'>('medium');
  const [hysaApy, setHysaApy] = useState<number>(4.5);

  const results = useMemo(() => {
    return calculateEmergencyFund({
      housing,
      utilities,
      food,
      debtPayments,
      insuranceAndHealth,
      miscellaneousEssential,
      currentSavings,
      incomeStability,
      hysaApy,
    });
  }, [
    housing,
    utilities,
    food,
    debtPayments,
    insuranceAndHealth,
    miscellaneousEssential,
    currentSavings,
    incomeStability,
    hysaApy,
  ]);

  const chartData = [
    {
      label: 'Current Cash Savings',
      value: currentSavings,
      color: '#3b82f6',
      secondaryValue: results.currentRunwayMonths,
      secondaryLabel: `${results.currentRunwayMonths} Months of Runway`,
    },
    {
      label: 'Recommended Safety Target',
      value: results.targetFundAmount,
      color: '#10b981',
      secondaryValue: results.recommendedMonths,
      secondaryLabel: `${results.recommendedMonths} Months of Buffer`,
    },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Emergency Fund & Financial Runway Resilience Calculator',
    description:
      'Calculate your true monthly essential survival burn rate, risk-adjusted emergency cash target, and annual interest earned in a high-yield savings account.',
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
          { name: 'Emergency Fund Runway Calculator' },
        ]}
      />

      <AdBanner format="leaderboard" />

      {/* HEADER */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Household Risk Buffer Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Emergency Fund & Runway Resilience Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Tally your non-negotiable survival expenses, determine your household risk factor, and calculate the exact cash buffer needed to withstand medical events or job loss without touching investments.
        </p>
      </div>

      {/* WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Essential Monthly Expenses
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">
              Burn: {formatCurrency(results.monthlyEssentials)}/mo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Housing / Rent ($)
              </label>
              <input
                type="number"
                step={50}
                value={housing}
                onChange={(e) => setHousing(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Utilities & Phone ($)
              </label>
              <input
                type="number"
                step={25}
                value={utilities}
                onChange={(e) => setUtilities(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Groceries & Food ($)
              </label>
              <input
                type="number"
                step={50}
                value={food}
                onChange={(e) => setFood(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Minimum Debt ($)
              </label>
              <input
                type="number"
                step={25}
                value={debtPayments}
                onChange={(e) => setDebtPayments(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Health & Ins. ($)
              </label>
              <input
                type="number"
                step={25}
                value={insuranceAndHealth}
                onChange={(e) => setInsuranceAndHealth(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Misc Survival ($)
              </label>
              <input
                type="number"
                step={25}
                value={miscellaneousEssential}
                onChange={(e) => setMiscellaneousEssential(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Household Risk Profile */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Employment Stability & Risk Profile
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { key: 'high', label: 'Dual Steady (3 Mo)', val: 3 },
                { key: 'medium', label: 'Single Earner (6 Mo)', val: 6 },
                { key: 'freelance', label: 'Freelance (9 Mo)', val: 9 },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setIncomeStability(item.key as any)}
                  className={`py-2 px-1.5 rounded-lg border text-center font-medium transition-colors ${
                    incomeStability === item.key
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Savings & HYSA Rate */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Cash Reserve ($)
              </label>
              <input
                type="number"
                step={1000}
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                HYSA APY Yield (%)
              </label>
              <input
                type="number"
                step={0.1}
                value={hysaApy}
                onChange={(e) => setHysaApy(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Runway Report</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">
              Status: <strong className="text-slate-900">{results.statusText}</strong>
            </span>
          </div>

        </div>

        {/* RESULTS COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Scorecard Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold">
                  Recommended Target Cash Cushion ({results.recommendedMonths} Months)
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
                  {formatCurrency(results.targetFundAmount)}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Current Runway Survival
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400 mt-1">
                  {results.currentRunwayMonths} Months
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Funded at {results.currentFundingPercent}% of target
                </div>
              </div>
            </div>

            {/* Sub-Metric Cards */}
            <div className="grid grid-cols-2 gap-3 pt-4 text-center">
              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  {results.shortfallOrSurplus >= 0 ? 'Surplus Cash Buffer' : 'Funding Shortfall'}
                </span>
                <span className={`font-mono text-base font-bold mt-0.5 block ${
                  results.shortfallOrSurplus >= 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {formatCurrency(Math.abs(results.shortfallOrSurplus))}
                </span>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">
                  Annual HYSA Passive Interest
                </span>
                <span className="font-mono text-base font-bold text-emerald-400 mt-0.5 block">
                  +{formatCurrency(results.annualInterestEarnedOnFund)} / year
                </span>
              </div>
            </div>
          </div>

          {/* SvgBarChart */}
          <SvgBarChart
            data={chartData}
            title="Current Savings vs. Recommended Target"
            valuePrefix="$"
            height={190}
          />

        </div>

      </div>

      <AdBanner format="in-article" />

      {/* EDUCATIONAL METHODOLOGY (800+ Words) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
        
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Build and Optimize an Emergency Fund
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Why liquid reserves protect your investment strategy from forced liquidations during downturns.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            1. The Purpose: An Emergency Fund is Insurance, Not an Investment
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            The core objective of an emergency fund is not to achieve maximum capital growth; it is to provide absolute liquidity and peace of mind. Without a cash cushion, an unexpected job loss or $3,000 transmission breakdown forces you to put charges on a 25% APR credit card or liquidate stock holdings in a depressed market.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            2. How Many Months of Expenses Do You Really Need?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">3 Months (Low Risk)</strong>
              <p className="text-slate-600 leading-relaxed">
                Dual-earner households with stable government, healthcare, or corporate roles, low debt, and healthy family safety nets.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">6 Months (Moderate Risk)</strong>
              <p className="text-slate-600 leading-relaxed">
                Single earners, families with dependents, or workers in tech/cyclical industries prone to periodic corporate restructuring.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">9-12 Months (High Risk)</strong>
              <p className="text-slate-600 leading-relaxed">
                Freelancers, contractors, 100% commission salespeople, or single-earner households with substantial mortgages and variable cashflows.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3. Where to Park Your Emergency Cash (HYSA vs. Traditional Banks)
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Leaving your $20,000 emergency fund in a legacy brick-and-mortar checking account earning 0.01% APY yields a negligible $2 per year while losing purchasing power to inflation.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Moving that same $20,000 to an FDIC-insured <strong>High-Yield Savings Account (HYSA)</strong> paying 4.50% generates <strong>$900 per year</strong> in passive interest with zero stock market volatility risk.
          </p>
        </div>

        {/* Section 4: FAQ */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            <span>Frequently Asked Questions About Emergency Reserves</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                What qualifies as a genuine emergency?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                A genuine emergency is unexpected, necessary, and urgent: emergency surgery, urgent vehicle repairs needed to commute to work, or immediate unemployment. Holiday gifts, anticipated annual car registration, and vacations are predictable sinking funds, not emergencies.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Can I use a Roth IRA as an emergency fund?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                While original contributions to a Roth IRA can be withdrawn tax-free and penalty-free at any time, doing so permanently forfeits that annual tax-advantaged contribution room. An independent high-yield cash account remains the gold standard.
              </p>
            </div>
          </div>
        </div>

      </section>

      <AdBanner format="leaderboard" />

    </div>
  );
}
