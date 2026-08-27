'use client';

import { useState } from 'react';
import { Home as HomeIcon, BadgeIndianRupee, Key, Users, Globe, FileCheck, FileSignature, Landmark, Hammer, Truck, Wallet, Handshake, Scale, PenLine, Ruler, Building2, HardHat, Briefcase, X, ArrowUpRight } from 'lucide-react';
import { partnershipsData } from '@/lib/data';
import { site } from '@/lib/site';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: HomeIcon,
  BadgeIndianRupee,
  Key,
  Users,
  Globe,
  FileCheck,
  FileSignature,
  Landmark,
  Hammer,
  Truck,
  Wallet,
  Handshake,
  Scale,
  PenLine,
  Ruler,
  Building: Building2,
  HardHat,
  Briefcase,
};

export function StrategicPartnerships() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello ${site.name}, I want to become a partner.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    window.open(site.whatsapp(text), '_blank');
    setShowModal(false);
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-light-navy/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Partnerships</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Explore Strategic Partnerships
          </h2>
          <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
            We welcome collaboration with industry peers who share our vision. If you wish to explore a partnership with EastOfKailash.com, please submit your comprehensive profile and business proposal for review. This initiates our confidential vetting process.
          </p>
          <p className="text-secondary-text text-sm sm:text-base mt-3">
            Whether you are an architect, an interior designer, a property dealer, a lawyer, a deed writer, a builder, or just a reference giver, we welcome and assure you of a progressive professional association with EastOfKailash.com.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {partnershipsData.map((partner) => {
            const Icon = iconMap[partner.icon] || Briefcase;
            return (
              <div
                key={partner.slug}
                className="group flex items-start gap-4 px-5 sm:px-6 py-5 sm:py-6 bg-white border-[3px] border-primary-navy hover:border-gold-accent hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-navy flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
                  <Icon className="w-5 h-5 text-white group-hover:text-primary-navy transition-colors" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-primary-navy mb-1 leading-snug">
                    {partner.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-primary-navy text-white hover:bg-gold-accent hover:text-primary-navy px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
          >
            Become Our Partner
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-secondary-text hover:text-primary-navy transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-primary-navy mb-2">
                Become Our Partner
              </h3>
              <p className="text-secondary-text text-sm mb-6 sm:mb-8">
                Please Share A Bit About Your Expertise, Our Team Will Contact You At The Earliest.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary-text block mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-border-color text-sm text-primary-navy focus:outline-none focus:border-gold-accent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary-text block mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-border-color text-sm text-primary-navy focus:outline-none focus:border-gold-accent transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary-text block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-border-color text-sm text-primary-navy focus:outline-none focus:border-gold-accent transition-colors"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary-text block mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-border-color text-sm text-primary-navy focus:outline-none focus:border-gold-accent transition-colors"
                    placeholder="Partnership inquiry"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-secondary-text block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-border-color text-sm text-primary-navy focus:outline-none focus:border-gold-accent transition-colors resize-none"
                    placeholder="Tell us about your expertise..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-navy text-white hover:bg-gold-accent hover:text-primary-navy py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  Submit via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
