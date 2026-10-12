import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Award, FileSpreadsheet } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20">
      {/* Trust & Methodology Assurance Bar */}
      <div className="border-b border-slate-900 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-800/40 text-emerald-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">100% Client-Side Privacy</p>
                <p className="text-slate-400">Your numbers are calculated locally in your browser. Zero financial data is collected or sold.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-800/40 text-emerald-400 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">CFPB & Federal Reserve Formulas</p>
                <p className="text-slate-400">Audited algorithms conforming to standard compounding and amortization frameworks.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-800/40 text-emerald-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-200">Zero Paywalls & No Signups</p>
                <p className="text-slate-400">Unrestricted access to every wealth simulation tool, export ledger, and visual report.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-md bg-emerald-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                FS
              </span>
              <span className="font-bold text-white tracking-tight text-lg">
                Fin<span className="text-emerald-400">Savvy</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              An independent financial intelligence platform dedicated to transparent personal wealth mathematics, debt acceleration modeling, and early retirement projections.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span>Audited for precision &bull; Free forever</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/calculators/fire-calculator" className="hover:text-emerald-400 transition-colors">
                  FIRE Freedom Simulator
                </Link>
              </li>
              <li>
                <Link href="/calculators/debt-payoff" className="hover:text-emerald-400 transition-colors">
                  Debt Snowball vs Avalanche
                </Link>
              </li>
              <li>
                <Link href="/calculators/compound-interest" className="hover:text-emerald-400 transition-colors">
                  Compound Wealth Multiplier
                </Link>
              </li>
              <li>
                <Link href="/calculators/mortgage-accelerator" className="hover:text-emerald-400 transition-colors">
                  Mortgage Amortization Payoff
                </Link>
              </li>
              <li>
                <Link href="/calculators/budget-planner" className="hover:text-emerald-400 transition-colors">
                  50/30/20 Smart Budget
                </Link>
              </li>
              <li>
                <Link href="/calculators/emergency-fund" className="hover:text-emerald-400 transition-colors">
                  Emergency Fund Runway
                </Link>
              </li>
            </ul>
          </div>

          {/* Methodology & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Methodology
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/methodology" className="hover:text-emerald-400 transition-colors">
                  Mathematical Formulas
                </Link>
              </li>
              <li>
                <Link href="/methodology#compounding" className="hover:text-emerald-400 transition-colors">
                  Compounding Derivations
                </Link>
              </li>
              <li>
                <Link href="/methodology#amortization" className="hover:text-emerald-400 transition-colors">
                  Amortization Algorithms
                </Link>
              </li>
              <li>
                <Link href="/methodology#fire-framework" className="hover:text-emerald-400 transition-colors">
                  Trinity Study & SWR
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Editorial Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Trust */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy (GDPR/CCPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">
                  Financial Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Financial Disclaimer Notice for AdSense & YMYL */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-[11px] leading-relaxed text-slate-400 space-y-3">
          <p>
            <strong className="text-slate-300">Financial Disclaimer:</strong> FinSavvy (including all associated calculators, charts, and educational articles) is strictly intended for general illustrative and educational modeling purposes. We are not registered financial advisors, certified financial planners (CFP), certified public accountants (CPA), mortgage brokers, or fiduciary advisors. None of the calculations provided should be construed as legal, tax, or investment advice. Always consult a qualified professional before making major financial commitments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 pt-4">
            <p>&copy; {currentYear} FinSavvy. All mathematical rights reserved.</p>
            <p className="mt-2 sm:mt-0">Designed for personal financial clarity and sovereign wealth building.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
