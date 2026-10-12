'use client';

import React, { useState, useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import SvgBarChart from '@/components/Chart/SvgBarChart';
import { 
  calculateDebtPayoff, 
  DebtItem, 
  formatCurrency 
} from '@/lib/calculations';
import { 
  TrendingDown, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  Award
} from 'lucide-react';

const INITIAL_DEBTS: DebtItem[] = [
  { id: '1', name: 'Credit Card A (Chase)', balance: 6800, apr: 24.99, minimumPayment: 180 },
  { id: '2', name: 'Personal Loan (SoFi)', balance: 4200, apr: 13.50, minimumPayment: 135 },
  { id: '3', name: 'Auto Loan (Honda)', balance: 11500, apr: 6.75, minimumPayment: 260 },
];

export default function DebtPayoffPage() {
  const [debts, setDebts] = useState<DebtItem[]>(INITIAL_DEBTS);
  const [extraPayment, setExtraPayment] = useState<number>(300);

  // New debt form state
  const [newName, setNewName] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [newApr, setNewApr] = useState('');
  const [newMin, setNewMin] = useState('');

  const addDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBalance || !newApr || !newMin) return;

    const newDebt: DebtItem = {
      id: Date.now().toString(),
      name: newName,
      balance: Math.max(10, Number(newBalance)),
      apr: Math.max(0.1, Number(newApr)),
      minimumPayment: Math.max(10, Number(newMin)),
    };

    setDebts([...debts, newDebt]);
    setNewName('');
    setNewBalance('');
    setNewApr('');
    setNewMin('');
  };

  const removeDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter((d) => d.id !== id));
  };

  // Run simulation
  const payoffComparison = useMemo(() => {
    return calculateDebtPayoff(debts, extraPayment);
  }, [debts, extraPayment]);

  const totalDebtBalance = useMemo(() => {
    return debts.reduce((sum, d) => sum + d.balance, 0);
  }, [debts]);

  const totalMinPayment = useMemo(() => {
    return debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  }, [debts]);

  // Chart data
  const chartData = [
    {
      label: 'Debt Snowball Method',
      value: payoffComparison.snowball.totalInterestPaid,
      color: '#3b82f6',
      secondaryValue: payoffComparison.snowball.monthsToDebtFree,
      secondaryLabel: `${payoffComparison.snowball.monthsToDebtFree} Months to Freedom`,
    },
    {
      label: 'Debt Avalanche Method',
      value: payoffComparison.avalanche.totalInterestPaid,
      color: '#10b981',
      secondaryValue: payoffComparison.avalanche.monthsToDebtFree,
      secondaryLabel: `${payoffComparison.avalanche.monthsToDebtFree} Months to Freedom`,
    },
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const debtSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Debt Snowball vs Avalanche Elimination Calculator',
    description:
      'Compare debt snowball and debt avalanche strategies. Calculate exact interest saved and debt-free dates across multiple credit cards and loans.',
    applicationCategory: 'FinanceApplication',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(debtSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Calculators', href: '/#calculators' },
          { name: 'Debt Snowball vs Avalanche' },
        ]}
      />

      <AdBanner format="leaderboard" />

      {/* HEADER */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-rose-50 text-rose-800 border border-rose-200">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>Mathematical Interest Optimization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Debt Snowball vs. Avalanche Elimination Optimizer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Input your loans and credit card balances to compare the psychological momentum of the Snowball method against the raw mathematical interest savings of the Avalanche method.
        </p>
      </div>

      {/* WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: DEBT MANAGER & EXTRA PAYMENT */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Active Debt Accounts List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Active Debt Accounts ({debts.length})
                </h2>
                <span className="text-[11px] text-slate-400">
                  Total Balance: {formatCurrency(totalDebtBalance)} &bull; Base Min: {formatCurrency(totalMinPayment)}/mo
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {debts.map((debt) => (
                <div
                  key={debt.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="space-y-1 min-w-0 flex-1 pr-3">
                    <div className="font-bold text-slate-900 truncate text-sm">
                      {debt.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 font-mono">
                      <span>Bal: <strong className="text-slate-800">{formatCurrency(debt.balance)}</strong></span>
                      <span>APR: <strong className="text-rose-600">{debt.apr}%</strong></span>
                      <span>Min: <strong className="text-slate-800">{formatCurrency(debt.minimumPayment)}/mo</strong></span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeDebt(debt.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                    title="Remove debt"
                    disabled={debts.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Add Debt Form */}
            <form onSubmit={addDebt} className="pt-3 border-t border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-700 block">Add Another Account</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Debt Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:bg-white focus:border-emerald-600"
                />
                <input
                  type="number"
                  placeholder="Balance ($)"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:bg-white focus:border-emerald-600 font-mono"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="APR (%)"
                  value={newApr}
                  onChange={(e) => setNewApr(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:bg-white focus:border-emerald-600 font-mono"
                />
                <input
                  type="number"
                  placeholder="Min Pay ($)"
                  value={newMin}
                  onChange={(e) => setNewMin(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:bg-white focus:border-emerald-600 font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Account to Simulation</span>
              </button>
            </form>

            {/* Extra Monthly Payment Slider */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">
                  Extra Monthly Payoff Budget
                </span>
                <span className="font-mono font-bold text-emerald-700 text-sm">
                  +{formatCurrency(extraPayment)} / month
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1500}
                step={25}
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Total monthly cashflow committed: <strong className="font-mono text-slate-800">{formatCurrency(totalMinPayment + extraPayment)}</strong>
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT: COMPARISON SCORECARD & WINNER */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Winner Headline Card */}
          <div className="bg-emerald-900 text-white rounded-2xl p-6 border border-emerald-800 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-300 font-semibold">
                  Mathematical Analysis
                </span>
              </div>
              <span className="text-[11px] bg-emerald-800 px-2 py-0.5 rounded text-emerald-200">
                Rollover Activated
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-emerald-300">Total Interest Saved by Choosing Avalanche:</div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-300">
                {formatCurrency(payoffComparison.interestSavedByAvalanche)} Saved
              </div>
              <p className="text-xs text-emerald-200">
                And debt freedom reached{' '}
                <strong className="text-white font-mono">
                  {payoffComparison.monthsSavedByAvalanche} month{payoffComparison.monthsSavedByAvalanche === 1 ? '' : 's'}
                </strong>{' '}
                earlier than with standard snowballing.
              </p>
            </div>

            {/* Side-by-Side Strategy Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-950/80 p-3.5 rounded-xl border border-emerald-800/80 space-y-1">
                <span className="text-[10px] text-emerald-400 font-mono uppercase block">
                  Snowball (Lowest Bal First)
                </span>
                <div className="text-base font-bold font-mono text-white">
                  {payoffComparison.snowball.monthsToDebtFree} Months
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  Interest: {formatCurrency(payoffComparison.snowball.totalInterestPaid)}
                </div>
              </div>

              <div className="bg-emerald-950/80 p-3.5 rounded-xl border border-emerald-800/80 space-y-1">
                <span className="text-[10px] text-amber-400 font-mono uppercase block">
                  Avalanche (Highest APR First)
                </span>
                <div className="text-base font-bold font-mono text-white">
                  {payoffComparison.avalanche.monthsToDebtFree} Months
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  Interest: {formatCurrency(payoffComparison.avalanche.totalInterestPaid)}
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 text-xs text-emerald-200 hover:text-white transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Payoff Schedule</span>
              </button>
            </div>
          </div>

          {/* Visual Comparison Chart */}
          <SvgBarChart
            data={chartData}
            title="Total Interest Paid Comparison"
            valuePrefix="$"
            height={180}
          />

        </div>

      </div>

      <AdBanner format="in-article" />

      {/* EDUCATIONAL METHODOLOGY (800+ Words) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8">
        
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            The Definitive Framework: Debt Snowball vs. Debt Avalanche
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How mathematical optimization and behavioral psychology determine debt elimination success.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            1. The Mathematical Mechanism: How the Avalanche Wins
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            The <strong>Debt Avalanche</strong> strategy is mathematically optimal. In this method, you make minimum payments across every debt account except the one with the highest Annual Percentage Rate (APR). Any surplus cash is channeled exclusively toward that highest-interest debt.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Because revolving balances at 24.99% APR accrue interest daily at approximately 0.0684% per day, extinguishing that balance first halts the most virulent compounding drag against your net worth. Once that debt is eliminated, its entire minimum payment plus your extra budget &ldquo;rolls over&rdquo; into the next highest APR account.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            2. The Behavioral Argument: Why the Snowball Works in Practice
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Popularized by financial personality Dave Ramsey, the <strong>Debt Snowball</strong> ignores interest rates completely. Instead, you order debts strictly from the smallest balance to the largest balance.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Behavioral finance research from Harvard Business School demonstrated that individuals are more motivated to continue debt payoff plans when they experience rapid &ldquo;wins&rdquo;. Knocking out a $600 medical bill in month two gives a psychological dopaminergic reinforcement that prevents abandonment of the broader debt plan.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            3. Which Strategy Should You Choose? The Decision Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <strong className="text-slate-900 text-sm block">Choose Avalanche If:</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>You are disciplined, analytically minded, and motivated by pure math.</li>
                <li>You carry high-spread debt (e.g. 26% credit card vs 5% student loan).</li>
                <li>Your priority is keeping the absolute minimum number of dollars in banks&apos; hands.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <strong className="text-slate-900 text-sm block">Choose Snowball If:</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>You feel overwhelmed by the sheer number of monthly statements.</li>
                <li>You need quick psychological proof of progress within 60 to 90 days.</li>
                <li>The interest rate differences between your debts are relatively small (1-3%).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: FAQ */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <span>Frequently Asked Questions About Debt Payoff</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Should I consolidate my credit card debt with a personal loan?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                A personal consolidation loan only helps if the new fixed APR is substantially lower than your current credit card rates and you have resolved the underlying cashflow deficit that created the debt. Without disciplined budgeting, consolidation frequently leads to double-debt if credit cards are re-spent.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">
                Should I stop investing in my 401(k) while paying off high-interest debt?
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Never forfeit an employer 401(k) match, as an immediate 50% or 100% employer match beats even a 25% credit card APR. Contribute enough to seize the full match, then aggressively direct every remaining dollar toward debt.
              </p>
            </div>
          </div>
        </div>

      </section>

      <AdBanner format="leaderboard" />

    </div>
  );
}

