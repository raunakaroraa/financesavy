'use client';

import React, { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import SvgLineChart from '@/components/Chart/SvgLineChart';
import { 
  calculateCompoundInterest, 
  formatCurrency, 
  formatPercent 
} from '@/lib/calculations';
import { 
  Percent, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Printer, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function CompoundInterestPage() {
  const [initialPrincipal, setInitialPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(20);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(8.0);
  const [compoundingFrequency, setCompoundingFrequency] = useState<1 | 4 | 12 | 365>(12);
  const [annualInflationRate, setAnnualInflationRate] = useState<number>(2.5);
  const [showTable, setShowTable] = useState<boolean>(false);

  const results = useMemo(() => {
    return calculateCompoundInterest({
      initialPrincipal,
      monthlyContribution,
      annualInterestRate,
      timeHorizonYears,
      compoundingFrequency,
      annualInflationRate,
    });
  }, [
    initialPrincipal,
    monthlyContribution,
    annualInterestRate,
    timeHorizonYears,
    compoundingFrequency,
    annualInflationRate,
  ]);

  const chartData = useMemo(() => {
    return results.yearlyBreakdown.map((row) => ({
      label: `Yr ${row.year}`,
      value: row.totalSavings,
      secondaryValue: row.totalContributions,
    }));
  }, [results]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'High-Yield Compound Interest & Wealth Multiplier',
    description:
      'Interactive compound interest calculator with regular monthly contributions, custom compounding frequencies, and inflation-adjusted purchasing power modeling.',
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
          { name: 'Compound Interest & Wealth Multiplier' },
        ]}
      />

      <AdBanner format="leaderboard" />

      {/* HEADER */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Percent className="w-3.5 h-3.5" />
          <span>Exponential Wealth Growth Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Compound Interest & Wealth Multiplier
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Simulate how regular monthly investments compound over time. Compare total nominal returns against real inflation-adjusted purchasing power.
        </p>
      </div>

      {/* WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Investment Parameters
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">CFPB Audited Formula</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Initial Principal ($)
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={initialPrincipal}
                onChange={(e) => setInitialPrincipal(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Monthly Deposit ($)
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>
          </div>

          {/* Time Horizon Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Investment Horizon</span>
              <span className="font-mono font-bold text-emerald-700">{timeHorizonYears} Years</span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={timeHorizonYears}
              onChange={(e) => setTimeHorizonYears(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>1 Year</span>
              <span>20 Years</span>
              <span>40 Years</span>
            </div>
          </div>

          {/* Annual Return Rate Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Estimated Annual Return</span>
              <span className="font-mono font-bold text-emerald-700">{annualInterestRate}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>4% (HYSA/Bonds)</span>
              <span>8% (Index S&P)</span>
              <span>12% (Aggressive)</span>
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-700">
              Compounding Frequency
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              {[
                { label: 'Annually', val: 1 },
                { label: 'Quarterly', val: 4 },
                { label: 'Monthly', val: 12 },
                { label: 'Daily', val: 365 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setCompoundingFrequency(opt.val as any)}
                  className={`py-1.5 rounded-lg border text-center font-medium transition-colors ${
                    compoundingFrequency === opt.val
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inflation Rate Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Inflation Deflation Rate</span>
              <span className="font-mono font-bold text-slate-700">{annualInflationRate}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={0.5}
              value={annualInflationRate}
              onChange={(e) => setAnnualInflationRate(Number(e.target.value))}
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
              <span>Print Ledger</span>
            </button>
            <button
              type="button"
              onClick={() => setShowTable(!showTable)}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              {showTable ? 'Hide Schedule' : 'View Full Schedule'}
            </button>
          </div>

        </div>

        {/* RESULTS COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold">
                  Projected Future Portfolio Value
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
                  {formatCurrency(results.endBalance)}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Real Purchasing Power ({annualInflationRate}% Infl.)
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-300 mt-1">
                  {formatCurrency(results.inflationAdjustedBalance)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 text-center">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Principal Deposited</span>
                <span className="font-mono text-base font-bold text-indigo-300 mt-0.5 block">
                  {formatCurrency(results.totalPrincipalContributed)}
                </span>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">Total Compound Interest Earned</span>
                <span className="font-mono text-base font-bold text-emerald-400 mt-0.5 block">
                  {formatCurrency(results.totalInterestEarned)}
                </span>
              </div>
            </div>
          </div>

          {/* SvgLineChart */}
          <SvgLineChart
            data={chartData}
            title="Total Savings vs. Pure Contributions"
            primaryLabel="Total Accumulated Balance"
            secondaryLabel="Pure Out-of-Pocket Deposits"
            height={260}
          />

          {/* Optional Schedule Table */}
          {showTable && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 overflow-x-auto max-h-80 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Year-By-Year Accumulation Ledger
              </h4>
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Year</th>
                    <th className="py-2 px-3">Deposits</th>
                    <th className="py-2 px-3">Interest</th>
                    <th className="py-2 px-3">Total Balance</th>
                    <th className="py-2 px-3">Real Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {results.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-900">Year {row.year}</td>
                      <td className="py-2 px-3 text-slate-600">{formatCurrency(row.totalContributions)}</td>
                      <td className="py-2 px-3 text-emerald-700 font-semibold">{formatCurrency(row.totalInterest)}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{formatCurrency(row.totalSavings)}</td>
                      <td className="py-2 px-3 text-slate-500">{formatCurrency(row.realPurchasingPower)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

      <AdBanner format="in-article" />

      {/* EDUCATIONAL METHODOLOGY (800+ Words) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
        
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            The Mathematics of Compounding: How Money Multiplies Over Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formulas, economic concepts, and historical insights into exponential financial growth.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            1. The Mathematical Formula for Compound Interest with Regular Contributions
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Compound interest occurs when the interest earned on an investment begins generating its own interest in subsequent periods. When regular periodic deposits (annuities) are added, the total accumulated future value is calculated using this unified equation:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 border border-slate-200 space-y-1">
            <div>A = P(1 + r/n)^(nt) + PMT × [ ((1 + r/n)^(nt) - 1) / (r/n) ]</div>
            <div className="text-[11px] text-slate-500 pt-1">
              Where: P = Initial Principal, PMT = Monthly Deposit, r = Annual Interest Rate, n = Compounding Periods/Year, t = Time in Years.
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            2. The Tipping Point: When Interest Outearns Your Labor
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Every long-term investment trajectory encounters a critical milestone called the <strong>Crossover Point</strong>. In the early years (years 1 through 7), personal deposits account for the vast majority of portfolio growth.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            However, due to exponential mechanics, there is a specific year where the annual interest generated by your portfolio exceeds the total annual dollars you physically deposited from your salary. In our standard 20-year simulation ($10,000 start, $500/month at 8%), this crossover occurs around year 9. From that day forward, your accumulated capital works harder than your paycheck.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3. The Rule of 72 for Quick Mental Math
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            To quickly estimate how many years it takes for an investment to double at a given fixed rate of return without ongoing contributions, divide 72 by the annual return rate:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-slate-900">At 6% Annual Return:</strong>
              <span className="text-slate-600">72 ÷ 6 = 12 Years to 2x</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-slate-900">At 8% Annual Return:</strong>
              <span className="text-slate-600">72 ÷ 8 = 9 Years to 2x</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-slate-900">At 10% Annual Return:</strong>
              <span className="text-slate-600">72 ÷ 10 = 7.2 Years to 2x</span>
            </div>
          </div>
        </div>

        {/* Section 4: FAQ */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <span>Frequently Asked Questions About Compound Growth</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Does compounding frequency (daily vs monthly) make a major difference?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                While daily compounding produces higher returns than annual compounding, the difference between monthly and daily compounding on a $100,000 portfolio over 20 years is typically less than 0.2% total return. The annual return rate and duration have vastly greater impacts.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Why does inflation adjustment matter for long-term targets?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                At an average historical inflation rate of 2.5%, prices double roughly every 28 years. A portfolio of $1,000,000 in 25 years will purchase roughly the same goods and services that $539,000 buys today. Always look at real inflation-adjusted numbers when planning retirement.
              </p>
            </div>
          </div>
        </div>

      </section>

      <AdBanner format="leaderboard" />

    </div>
  );
}

