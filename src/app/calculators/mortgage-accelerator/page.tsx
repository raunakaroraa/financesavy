'use client';

import React, { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import SvgBarChart from '@/components/Chart/SvgBarChart';
import { 
  calculateMortgage, 
  formatCurrency 
} from '@/lib/calculations';
import { 
  Home, 
  DollarSign, 
  Calendar, 
  Percent, 
  TrendingDown, 
  Printer, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Award
} from 'lucide-react';

export default function MortgageAcceleratorPage() {
  const [homePrice, setHomePrice] = useState<number>(450000);
  const [downPayment, setDownPayment] = useState<number>(90000);
  const [loanTermYears, setLoanTermYears] = useState<15 | 20 | 30>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(5400);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1800);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(200);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const results = useMemo(() => {
    return calculateMortgage({
      homePrice,
      downPayment,
      loanTermYears,
      interestRate,
      propertyTaxAnnual,
      homeInsuranceAnnual,
      extraMonthlyPayment,
    });
  }, [
    homePrice,
    downPayment,
    loanTermYears,
    interestRate,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    extraMonthlyPayment,
  ]);

  const chartData = [
    {
      label: 'Standard 30-Yr Mortgage',
      value: results.standardTotalInterest,
      color: '#ef4444',
      secondaryValue: results.standardPayoffMonths / 12,
      secondaryLabel: `${loanTermYears} Years to Payoff`,
    },
    {
      label: 'Accelerated (+Extra Monthly)',
      value: results.acceleratedTotalInterest,
      color: '#10b981',
      secondaryValue: Number((results.acceleratedPayoffMonths / 12).toFixed(1)),
      secondaryLabel: `${(results.acceleratedPayoffMonths / 12).toFixed(1)} Years to Payoff`,
    },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Accelerated Mortgage Payoff & Amortization Planner',
    description:
      'Calculate accelerated mortgage payoffs with extra principal payments. View exact interest savings, years saved, and annual amortization schedule.',
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
          { name: 'Mortgage Early Payoff Accelerator' },
        ]}
      />

      <AdBanner format="leaderboard" />

      {/* HEADER */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
          <Home className="w-3.5 h-3.5" />
          <span>CFPB Fixed-Rate Amortization Model</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Accelerated Mortgage Payoff & Amortization Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Discover how modest extra monthly principal payments reduce the lifetime compounding drag on your home loan, saving tens of thousands in interest and clearing your mortgage years early.
        </p>
      </div>

      {/* WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Mortgage Details
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">
              Loan: {formatCurrency(results.loanAmount)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Home Purchase Price ($)
              </label>
              <input
                type="number"
                min={50000}
                step={10000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value) || 50000)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Down Payment ($)
              </label>
              <input
                type="number"
                min={0}
                step={5000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                {homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : 0}% down
              </span>
            </div>
          </div>

          {/* Loan Term Selection */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-700">
              Loan Term
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[15, 20, 30].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermYears(term as any)}
                  className={`py-2 rounded-lg border text-center font-medium transition-colors ${
                    loanTermYears === term
                      ? 'bg-indigo-700 text-white border-indigo-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {term} Years
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Mortgage Interest Rate</span>
              <span className="font-mono font-bold text-indigo-700">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={3.0}
              max={10.0}
              step={0.125}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-700 cursor-pointer"
            />
          </div>

          {/* Escrows (Taxes & Insurance) */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Property Tax ($)
              </label>
              <input
                type="number"
                min={0}
                step={250}
                value={propertyTaxAnnual}
                onChange={(e) => setPropertyTaxAnnual(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                {formatCurrency(propertyTaxAnnual / 12)} / mo
              </span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Annual Homeowners Ins. ($)
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={homeInsuranceAnnual}
                onChange={(e) => setHomeInsuranceAnnual(Number(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold font-mono text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                {formatCurrency(homeInsuranceAnnual / 12)} / mo
              </span>
            </div>
          </div>

          {/* Extra Monthly Payment Slider */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">
                Extra Monthly Principal Payment
              </span>
              <span className="font-mono font-bold text-emerald-700 text-sm">
                +{formatCurrency(extraMonthlyPayment)} / month
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1000}
              step={25}
              value={extraMonthlyPayment}
              onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
            <button
              type="button"
              onClick={() => setShowSchedule(!showSchedule)}
              className="text-xs font-semibold text-indigo-700 hover:underline"
            >
              {showSchedule ? 'Hide Amortization' : 'View Full Amortization'}
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
                  Total Monthly Payment (P&I + Escrow + Extra)
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mt-1">
                  {formatCurrency(results.totalMonthlyPayment)}
                  <span className="text-xs font-normal text-slate-400 ml-1">/month</span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Principal & Interest (Base P&I)
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-200 mt-1">
                  {formatCurrency(results.monthlyPrincipalAndInterest)}/mo
                </div>
              </div>
            </div>

            {/* Savings Highlights Banner */}
            <div className="grid grid-cols-2 gap-3 pt-4 text-center">
              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-800/80">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">
                  Total Lifetime Interest Saved
                </span>
                <span className="font-mono text-lg sm:text-xl font-extrabold text-amber-300 mt-0.5 block">
                  {formatCurrency(results.interestSaved)}
                </span>
              </div>

              <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-800/80">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">
                  Mortgage Term Shaved Off
                </span>
                <span className="font-mono text-lg sm:text-xl font-extrabold text-emerald-300 mt-0.5 block">
                  {results.yearsShavedOff} Years Early
                </span>
              </div>
            </div>
          </div>

          {/* SvgBarChart */}
          <SvgBarChart
            data={chartData}
            title="Total Interest Paid Over Lifetime of Loan"
            valuePrefix="$"
            height={190}
          />

          {/* Optional Schedule Table */}
          {showSchedule && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 overflow-x-auto max-h-80 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Annual Amortization Ledger
              </h4>
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Year</th>
                    <th className="py-2 px-3">Principal Paid</th>
                    <th className="py-2 px-3">Interest Paid</th>
                    <th className="py-2 px-3">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {results.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-900">Year {row.year}</td>
                      <td className="py-2 px-3 text-emerald-700 font-semibold">{formatCurrency(row.principalPaid)}</td>
                      <td className="py-2 px-3 text-rose-600">{formatCurrency(row.interestPaid)}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{formatCurrency(row.remainingBalance)}</td>
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
            How Mortgage Amortization Works & Why Extra Payments Yield Massive Returns
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding front-loaded interest mechanics, prepayments, and equity acceleration.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            1. The Front-Loaded Reality of Fixed-Rate Mortgages
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            When you take out a 30-year fixed mortgage, your monthly Principal and Interest (P&I) payment remains fixed for 360 months. However, the internal composition of where each dollar goes shifts dramatically over time.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            In Year 1 of a $360,000 mortgage at 6.5%, your monthly P&I payment is approximately $2,275. In Month 1, an astounding <strong>$1,950 goes to interest</strong>, while only <strong>$325 pays down principal</strong>. You are primarily renting the bank&apos;s money.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            2. The Asymmetric Power of Extra Principal Payments
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            When you instruct your loan servicer to apply an additional $200 per month specifically toward &ldquo;Principal Only&rdquo;, that $200 bypasses the amortized interest queue completely. It immediately reduces the underlying balance upon which next month&apos;s interest is calculated.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            By paying an extra $200/month on our $360,000 example, you eliminate over <strong>$68,000 in future interest charges</strong> and extinguish the mortgage nearly <strong>5 years early</strong>. It represents a guaranteed, risk-free, tax-free return equal to your mortgage note interest rate.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3. Recasting vs. Refinancing: Crucial Differences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">Mortgage Recast</strong>
              <p className="text-slate-600 leading-relaxed">
                You make a lump-sum principal payment (usually $5,000+) and pay a nominal bank fee ($250-$500). The lender keeps your original interest rate and remaining term, but recalculates (lowers) your mandatory monthly payment.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 text-sm block">Mortgage Refinance</strong>
              <p className="text-slate-600 leading-relaxed">
                You replace your existing loan with an entirely new loan, paying significant closing costs (2-5% of loan value). This is sensible only if current prevailing market interest rates are at least 1.0% to 1.5% below your existing rate.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: FAQ */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-indigo-700" />
            <span>Frequently Asked Questions About Mortgage Acceleration</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Is it better to pay off a mortgage early or invest in index funds?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                This depends on your mortgage rate. If your mortgage rate is 3.0%, historical equity index returns (8-10%) suggest investing surplus cash yields higher expected wealth. However, if your mortgage rate is 6.5% to 7.5%, an extra principal payment delivers an unbeatable guaranteed, risk-free, after-tax 6.5-7.5% return.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Does a bi-weekly payment schedule achieve the same result?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Yes. Making half-payments every two weeks results in 26 half-payments per year, which equals 13 full monthly payments. That one extra full payment per year automatically trims 4 to 6 years off a 30-year term.
              </p>
            </div>
          </div>
        </div>

      </section>

      <AdBanner format="leaderboard" />

    </div>
  );
}
