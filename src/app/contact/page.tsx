'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AdBanner from '@/components/AdBanner';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ name: 'Contact Us' }]} />

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <Mail className="w-3.5 h-3.5" />
          <span>Support & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact the FinanceSavy.pro Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Have an inquiry, mathematical formula suggestion, or feedback on our financial engines? We typically respond within 24 to 48 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Message Received</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, {name}. A member of our editorial and engineering team will review your note and respond to <strong className="text-slate-800">{email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 text-xs font-semibold text-emerald-700 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subject Category
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Formula Feedback">Formula & Calculator Feedback</option>
                  <option value="Bug Report">Technical Bug Report</option>
                  <option value="Press / Editorial">Press or Editorial Inquiry</option>
                  <option value="Advertising">Advertising / Sponsorship</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-5 space-y-4 text-xs sm:text-sm">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-slate-900 text-base">Direct Channels</h2>

            <div className="flex items-start space-x-3">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Direct Email</strong>
                <a href="mailto:support@financesavy.pro" className="text-slate-600 hover:text-emerald-700">
                  contact@financesavy.pro
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Response SLA</strong>
                <span className="text-slate-600">24 to 48 business hours</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Correspondence Address</strong>
                <span className="text-slate-600">
                  FinanceSavy.pro Digital Labs<br />
                  100 Financial Way, Suite 400<br />
                  Wilmington, DE 19801
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <AdBanner format="leaderboard" />
    </div>
  );
}
