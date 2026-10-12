import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | FinanceSavy.pro',
  description:
    'FinanceSavy.pro Privacy Policy. Full compliance with GDPR, CCPA, Google AdSense DoubleClick DART cookie disclosures, and client-side computational privacy standards.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: 'Privacy Policy' }]} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300">
          <Shield className="w-3.5 h-3.5" />
          <span>Legal & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: January 1, 2026 &bull; Effective immediately for all visitors
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Overview & Commitment to Zero Financial Tracking</h2>
          <p>
            At FinanceSavy.pro (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), accessible from financesavy.pro, one of our main priorities is the privacy of our visitors. This Privacy Policy document details the types of information collected and recorded by FinanceSavy.pro and how we use it.
          </p>
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-950 font-medium">
            <strong>Critical Privacy Guarantee:</strong> All financial numbers entered into our calculators (including your net worth, income, debt balances, mortgage amounts, and budgets) execute exclusively on your local client-side browser in temporary memory. We do not transmit, log, store, or sell your financial figures to any server.
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Log Files</h2>
          <p>
            FinanceSavy.pro follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Google DoubleClick DART Cookies & Third-Party Advertising</h2>
          <p>
            Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to financesavy.pro and other sites on the internet.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">Google Ads Settings</a> or through the Network Advertising Initiative opt-out page at <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">aboutads.info</a>.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Privacy Policies of Advertising Partners</h2>
          <p>
            Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on FinanceSavy.pro, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that FinanceSavy.pro has no access to or control over these cookies that are used by third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>
            Under the California Consumer Privacy Act (CCPA), California consumers have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data. (Note: FinanceSavy.pro does not sell personal information).</li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">6. GDPR Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user is entitled to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
            <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data under certain conditions.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">7. Children&apos;s Information (COPPA)</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. FinanceSavy.pro does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">8. Contact Information</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@financesavy.pro" className="text-emerald-700 underline">privacy@financesavy.pro</a>.
          </p>
        </section>

      </div>

      <AdBanner format="leaderboard" />
    </div>
  );
}
