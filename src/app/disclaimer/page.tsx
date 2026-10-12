import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Financial Disclaimer (YMYL) | FinanceSavy.pro',
  description:
    'FinanceSavy.pro Financial Disclaimer. Important notice regarding educational calculations, non-fiduciary status, and professional financial consultation.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: 'Financial Disclaimer' }]} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>YMYL Compliance Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Financial & Investment Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Mandatory disclosure for all calculations, projections, and educational materials.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-2 text-amber-950">
          <strong className="block text-sm font-bold">Important Notice (Not Financial Advice)</strong>
          <p>
            The content, formulas, simulation engines, charts, and figures provided by FinanceSavy.pro (financesavy.pro) are designed and published strictly for general educational and illustrative modeling purposes. Nothing on this website constitutes legal, accounting, tax, investment, mortgage, or personalized financial advice.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. No Fiduciary or Advisory Relationship</h2>
          <p>
            FinanceSavy.pro is an independent technology platform. We are not registered as an investment advisor with the U.S. Securities and Exchange Commission (SEC), FINRA, or state securities regulators. We do not operate as certified financial planners (CFP), registered mortgage loan originators, or licensed public accountants (CPA). Your use of this website does not create any fiduciary, advisory, or contractual relationship between you and FinanceSavy.pro.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Deterministic Estimates vs. Real-World Volatility</h2>
          <p>
            Calculators on this website use standardized mathematical assumptions (e.g. constant 7% annual equity returns, static 2.5% inflation, constant mortgage interest rates). In real-world economies:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Equities experience severe sequence-of-returns volatility, market drawdowns, and market cycles.</li>
            <li>Inflation is dynamic and can deviate sharply from long-term trends.</li>
            <li>Tax codes (federal, state, local, capital gains, marginal brackets) vary substantially by individual circumstance and jurisdiction.</li>
          </ul>
          <p>
            Consequently, actual financial outcomes will differ, often significantly, from mathematical estimates produced by online simulators.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Seek Qualified Professional Counsel</h2>
          <p>
            Before undertaking any major financial action — such as early retirement, withdrawing from tax-advantaged retirement accounts, refinancing a mortgage, prepaying debt, or changing investment portfolio asset allocations — you must consult with a licensed, certified, and qualified professional (such as a fee-only Certified Financial Planner, CPA, or estate attorney) who can evaluate your unique personal financial situation.
          </p>
        </section>

      </div>

      <AdBanner format="leaderboard" />
    </div>
  );
}
