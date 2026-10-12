import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import { 
  FileText, 
  Scale, 
  CheckCircle2, 
  Calculator, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

export const metadata = {
  title: 'Mathematical Methodology & Formula Verification | FinanceSavy.pro',
  description:
    'Full transparency into FinanceSavy.pro algorithms, CFPB and Federal Reserve formulas for compound interest, amortization, safe withdrawal rates, and debt optimization.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: 'Methodology & Formulas' }]} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Scale className="w-3.5 h-3.5" />
          <span>Audited Financial Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Mathematical Methodology & Formula Verification
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          FinanceSavy.pro operates on a principle of absolute algorithmic transparency. Below are the exact equations, mathematical assumptions, and regulatory standards powering all calculators.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        
        {/* Compounding Section */}
        <section id="compounding" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-lg">
            <Calculator className="w-5 h-5" />
            <h2>1. Periodic Compound Interest Formula</h2>
          </div>
          <p>
            Standard compound interest with recurring periodic additions is modeled using the future value of an ordinary annuity added to the compounded principal:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 border border-slate-200">
            A = P × (1 + r/n)^(n×t) + PMT × [ ((1 + r/n)^(n×t) - 1) / (r/n) ]
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
            <li><strong>P:</strong> Initial principal deposit</li>
            <li><strong>PMT:</strong> Regular monthly contribution</li>
            <li><strong>r:</strong> Nominal annual interest rate (in decimal format, e.g. 0.08 for 8%)</li>
            <li><strong>n:</strong> Compounding frequency per annum (12 for monthly, 365 for daily)</li>
            <li><strong>t:</strong> Duration in elapsed years</li>
          </ul>
          <p className="text-xs text-slate-500">
            <strong>Inflation Adjustment (Purchasing Power):</strong> Real value is discounted via <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Real Balance = A ÷ (1 + i)^t</code>, where <em>i</em> represents the expected annual inflation rate.
          </p>
        </section>

        {/* Amortization Section */}
        <section id="amortization" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-700 font-bold text-lg">
            <Calculator className="w-5 h-5" />
            <h2>2. Fixed-Rate Mortgage Amortization Algorithm</h2>
          </div>
          <p>
            Conforming to Consumer Financial Protection Bureau (CFPB) truth-in-lending specifications, monthly Principal and Interest (P&I) is calculated using the standard closed-form formula:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 border border-slate-200">
            M = L × [ c × (1 + c)^N ] / [ (1 + c)^N - 1 ]
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
            <li><strong>L:</strong> Net loan amount (Home purchase price minus down payment)</li>
            <li><strong>c:</strong> Monthly interest rate (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Annual Rate ÷ 12</code>)</li>
            <li><strong>N:</strong> Total scheduled amortization periods (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Loan Term in Years × 12</code>)</li>
          </ul>
          <p className="text-xs text-slate-500">
            <strong>Extra Principal Prepayments:</strong> In our accelerated engine, extra monthly dollars are deducted directly from remaining principal balance before the subsequent period&apos;s interest charge is calculated, shortening the amortization schedule dynamically.
          </p>
        </section>

        {/* FIRE Section */}
        <section id="fire-framework" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-lg">
            <Calculator className="w-5 h-5" />
            <h2>3. Safe Withdrawal Rate & FIRE Framework</h2>
          </div>
          <p>
            The FIRE engine applies the findings of the 1998 Trinity Study (Cooley, Hubbard, and Walz) and modern empirical updates:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 border border-slate-200">
            FIRE Number = Annual Household Expenditures ÷ SWR
            <br />
            Coast FIRE = Target FIRE Number ÷ (1 + Real Return)^(Years Until 65)
          </div>
          <p className="text-xs text-slate-500">
            Real return rate incorporates the Fisher relationship: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">r_real = (1 + r_nominal) / (1 + inflation) - 1</code> to guarantee that future milestones represent contemporary purchasing power.
          </p>
        </section>

        {/* Debt Section */}
        <section id="debt-simulation" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-rose-700 font-bold text-lg">
            <Calculator className="w-5 h-5" />
            <h2>4. Discrete Month-by-Month Debt Simulation</h2>
          </div>
          <p>
            Rather than relying on simplified approximations, FinanceSavy.pro runs a discrete month-by-month financial state machine across all debt accounts:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li>Calculates exact monthly accrued interest on each account using <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Balance × (APR ÷ 12)</code>.</li>
            <li>Satisfies minimum scheduled payments across all open debts.</li>
            <li>Sorts remaining accounts according to strategy (Snowball = balance ascending; Avalanche = APR descending).</li>
            <li>Applies all surplus budget to the top-priority account until its balance reaches zero, then &ldquo;snowballs&rdquo; its payment into the subsequent debt.</li>
          </ol>
        </section>

      </div>

      <AdBanner format="leaderboard" />
    </div>
  );
}

