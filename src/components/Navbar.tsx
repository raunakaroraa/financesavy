'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  Flame, 
  TrendingDown, 
  Percent, 
  Home, 
  PieChart, 
  ShieldCheck, 
  Menu, 
  X, 
  FileText
} from 'lucide-react';

const TOOLS = [
  {
    name: 'FIRE Freedom Simulator',
    href: '/calculators/fire-calculator',
    icon: Flame,
    badge: 'Popular',
    desc: 'Early retirement & safe withdrawal modeling',
  },
  {
    name: 'Debt Snowball vs Avalanche',
    href: '/calculators/debt-payoff',
    icon: TrendingDown,
    badge: 'Savings',
    desc: 'Payoff timeline & interest elimination',
  },
  {
    name: 'Compound Wealth Multiplier',
    href: '/calculators/compound-interest',
    icon: Percent,
    badge: 'Core',
    desc: 'Inflation-adjusted compound returns',
  },
  {
    name: 'Mortgage Early Payoff',
    href: '/calculators/mortgage-accelerator',
    icon: Home,
    badge: 'Equity',
    desc: 'Amortization & extra principal savings',
  },
  {
    name: '50/30/20 Smart Budget',
    href: '/calculators/budget-planner',
    icon: PieChart,
    badge: 'Daily',
    desc: 'Take-home salary & cashflow allocation',
  },
  {
    name: 'Emergency Fund Runway',
    href: '/calculators/emergency-fund',
    icon: ShieldCheck,
    badge: 'Safety',
    desc: 'Cash resilience & risk buffer score',
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-mono font-bold text-base flex items-center justify-center shadow-sm group-hover:bg-emerald-800 transition-colors">
                FS
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 tracking-tight text-lg leading-none">
                  Fin<span className="text-emerald-700">Savvy</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 mt-0.5">
                  Wealth Engine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <div 
                className="relative"
                onMouseEnter={() => setToolsDropdown(true)}
                onMouseLeave={() => setToolsDropdown(false)}
              >
                <button
                  type="button"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith('/calculators')
                      ? 'text-emerald-800 bg-emerald-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-expanded={toolsDropdown}
                >
                  <Calculator className="w-4 h-4 text-emerald-700" />
                  <span>Calculators</span>
                  <svg
                    className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${toolsDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {toolsDropdown && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 px-3 py-1.5">
                      Decision Engines
                    </div>
                    {TOOLS.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = pathname === tool.href;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setToolsDropdown(false)}
                          className={`flex items-start space-x-3 p-2.5 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-900'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className={`p-1.5 rounded-md shrink-0 mt-0.5 ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold truncate">{tool.name}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                {tool.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {tool.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/methodology"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/methodology'
                    ? 'text-emerald-800 bg-emerald-50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Methodology
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/about'
                    ? 'text-emerald-800 bg-emerald-50'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/contact"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2"
            >
              Contact
            </Link>
            <Link
              href="/calculators/fire-calculator"
              className="inline-flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Launch Simulator</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Financial Engines
          </div>
          <div className="grid grid-cols-1 gap-1">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-100 text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{tool.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col space-y-2 text-sm">
            <Link
              href="/methodology"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md flex items-center space-x-2"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Mathematical Methodology</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md"
            >
              About FinSavvy
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Contact & Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
