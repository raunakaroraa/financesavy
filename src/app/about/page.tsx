import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import { 
  ShieldCheck, 
  Award, 
  Lock, 
  Users, 
  Scale, 
  CheckCircle2, 
  Mail 
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us & Editorial Standards | FinSavvy',
  description:
    'Learn about FinSavvy, our mission to democratize financial calculation tools, our editorial standards, and our strict client-side data privacy policy.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: 'About FinSavvy' }]} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Users className="w-3.5 h-3.5" />
          <span>Our Mission & Principles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About FinSavvy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Empowering everyday individuals to make high-stakes financial decisions using uncompromised mathematical modeling.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        
        {/* Origin Story */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            Why FinSavvy Was Built
          </h2>
          <p>
            The internet is flooded with financial content, yet finding a clear, unbiased calculator is remarkably difficult. Most commercial financial calculators are heavily incentivized lead-generation funnels: they gate results behind required email captures, bombard visitors with predatory loan advertisements, or conceal the underlying math to push proprietary products.
          </p>
          <p>
            FinSavvy was conceived as the antidote: an open, mathematically rigorous utility suite that offers immediate answers without paywalls, accounts, or dark patterns.
          </p>
        </div>

        {/* 3 Core Editorial Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Mathematical Integrity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every formula is derived from standardized regulatory models (CFPB, Federal Reserve, Trinity Study) and open for public verification on our methodology page.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Absolute Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We collect zero financial inputs. Your income, debt balances, and portfolio figures are evaluated exclusively in local browser RAM and never transmit across a network.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Zero Paywalls</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All 6 specialized calculators, visualization graphs, and amortization schedules are 100% free for educational use without gated premium tiers.
            </p>
          </div>
        </div>

        {/* Editorial Independence & Advertising Disclosure */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Editorial Independence & Monetization Disclosure
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            FinSavvy supports its ongoing development and hosting infrastructure primarily through contextual advertisements (such as Google AdSense). Our mathematical algorithms, recommendations, and simulation outcomes are 100% independent and are never altered, skewed, or influenced by third-party advertisers or commercial affiliations.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
            >
              <Mail className="w-4 h-4" />
              <span>Have a question or calculation feedback? Contact our team</span>
            </Link>
          </div>
        </div>

      </div>

      <AdBanner format="leaderboard" />
    </div>
  );
}
