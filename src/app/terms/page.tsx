import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | FinSavvy',
  description:
    'FinSavvy Terms of Service. User agreement, intellectual property rights, limitation of liability, and permissible use of financial calculators.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: 'Terms of Service' }]} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: January 1, 2026 &bull; Governing use of financesavvy.org
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing FinSavvy (&ldquo;the Website&rdquo;, &ldquo;financesavvy.org&rdquo;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you disagree with any portion of these terms, you must discontinue use of the Website immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Permissible Use & Non-Commercial License</h2>
          <p>
            FinSavvy grants you a personal, non-exclusive, non-transferable revocable license to access our calculators, simulation tools, charts, and educational articles for personal financial planning and educational modeling. You agree not to scrape, reverse-engineer, redistribute, or mirror our software without explicit written permission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Disclaimer of Warranties</h2>
          <p>
            The tools and services on this website are provided strictly on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. FinSavvy makes no representations or warranties of any kind, express or implied, regarding the continuous operation, computational precision, or suitability of our calculators for your specific personal financial decisions. Market returns, inflation figures, and tax rates are inherently volatile and uncertain.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            In no event shall FinSavvy, its operators, creators, contributors, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use this site, including but not limited to investment losses, tax penalties, mortgage refinancing costs, or debt payoff decisions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.
          </p>
        </section>

      </div>

      <AdBanner format="leaderboard" />
    </div>
  );
}
