"use client";

import { useState } from "react";
import { ExternalLink, X, CheckCircle2, Search, FileText, FilePen, Shield, Scale, PhoneCall } from "lucide-react";
import { PropertyBaapWatermark } from "./PropertyBaapWatermark";
import { site } from "@/lib/site";

export default function Footer() {
  const [selectedBrand, setSelectedBrand] = useState<{ name: string; url: string } | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    const cleanedPhone = contactForm.phone.replace(/[\s\-()]/g, '');

    if (!contactForm.name.trim()) errors.name = 'Name is required';
    else if (contactForm.name.trim().length < 2) errors.name = 'Enter a valid name';
    if (!contactForm.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(cleanedPhone)) errors.phone = 'Enter a valid Indian phone number';
    if (!contactForm.message.trim()) errors.message = 'Message is required';
    else if (contactForm.message.trim().length < 10) errors.message = 'Please provide at least 10 characters';

    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const message = `Hello ${site.name}, I want to get in touch.\n\nName: ${contactForm.name}\nPhone: ${contactForm.phone}\nMessage: ${contactForm.message}`;
    window.open(site.whatsapp(message), '_blank');
  };

  const brands = [
    { name: "TitleWala", url: "https://titlewala.com", icon: <Search className="w-6 h-6" />, desc: "Property Title Experts" },
    { name: "DeedWala", url: "https://deedwala.com", icon: <FileText className="w-6 h-6" />, desc: "Property Deed Experts" },
    { name: "MutationWala", url: "https://mutationwala.com", icon: <FilePen className="w-6 h-6" />, desc: "Property Mutation Experts" },
    { name: "FreeholdWala", url: "https://freeholdwala.com", icon: <Shield className="w-6 h-6" />, desc: "Property Freehold Experts" },
    { name: "ValuationWala", url: "https://valuationwala.com", icon: <Scale className="w-6 h-6" />, desc: "Property Valuation Experts" },
  ];

  return (
    <>
    <footer className="bg-light-navy text-primary-text border-t-[6px] border-primary-navy notranslate" translate="no">

      {/* Contact Us */}
      <section id="contact" className="scroll-mt-24 border-b border-primary-navy/10 bg-light-navy py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 text-center sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16 lg:text-left">
          <div>
            <h2 className="mb-4 font-extrabold text-4xl tracking-[-0.03em] text-primary-navy sm:text-6xl">Contact Us</h2>
            <p className="mx-auto max-w-md font-sans text-sm leading-relaxed text-secondary-text sm:text-base lg:mx-0">
              Have a question about your property in East of Kailash? Share your details and our team will get back to you confidentially.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="grid gap-3 rounded-xl border border-border-color bg-white p-4 sm:grid-cols-2 sm:p-6 shadow-sm">
            <input
              required
              type="text"
              placeholder="Your name"
              value={contactForm.name}
              onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
              aria-invalid={Boolean(contactErrors.name)}
              className={`min-h-12 rounded-lg border ${contactErrors.name ? 'border-red-500' : 'border-border-color focus:border-primary-navy'} bg-white px-4 text-sm text-primary-navy outline-none transition-colors placeholder:text-secondary-text/60`}
            />
            {contactErrors.name && <p className="text-left text-xs text-red-500 sm:col-span-2">{contactErrors.name}</p>}
            <input
              required
              type="tel"
              placeholder="Phone number"
              value={contactForm.phone}
              onChange={(event) => setContactForm({ ...contactForm, phone: event.target.value })}
              aria-invalid={Boolean(contactErrors.phone)}
              className={`min-h-12 rounded-lg border ${contactErrors.phone ? 'border-red-500' : 'border-border-color focus:border-primary-navy'} bg-white px-4 text-sm text-primary-navy outline-none transition-colors placeholder:text-secondary-text/60`}
            />
            {contactErrors.phone && <p className="text-left text-xs text-red-500 sm:col-span-2">{contactErrors.phone}</p>}
            <textarea
              required
              rows={3}
              placeholder="How can we help?"
              value={contactForm.message}
              onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
              aria-invalid={Boolean(contactErrors.message)}
              className={`resize-none rounded-lg border ${contactErrors.message ? 'border-red-500' : 'border-border-color focus:border-primary-navy'} bg-white px-4 py-3 text-sm text-primary-navy outline-none transition-colors placeholder:text-secondary-text/60 sm:col-span-2`}
            />
            {contactErrors.message && <p className="text-left text-xs text-red-500 sm:col-span-2">{contactErrors.message}</p>}
            <button type="submit" className="rounded-lg bg-primary-navy px-6 py-3 font-bold text-white transition-colors hover:bg-secondary-navy sm:col-span-2 sm:justify-self-start">
              Send Enquiry
            </button>
          </form>
        </div>
      </section>

      {/* 1 Call Challenge - Full Width */}
      <div className="py-8 sm:py-12 bg-white text-center relative overflow-hidden border-b border-primary-navy/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold-accent/15 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 text-gold-accent" />
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl md:text-6xl text-primary-navy mb-4 sm:mb-6 tracking-[-0.02em]">
            <span className="text-gold-accent">1 Call</span> Challenge
          </h2>
          <p className="font-sans text-base sm:text-xl text-primary-navy/80 mb-2 max-w-2xl mx-auto">
            Pick up the phone. <span className="text-gold-accent font-bold">Reach Us Once</span>.
          </p>
          <p className="font-sans text-sm sm:text-lg text-secondary-text mb-6 sm:mb-10 max-w-xl mx-auto">
            We boldly present our one call challenge to prove that we are the best people to deal with when it comes to one of your most valuable possessions - <span className="text-primary-navy font-bold">Your Property in East of Kailash</span>
          </p>
          <a href={site.whatsapp(`*Hello ${site.name}, I Accept Your 1 Call Challenge.*`)} target="_blank" rel="noopener noreferrer" className="font-sans px-6 sm:px-10 py-3 sm:py-5 bg-primary-navy hover:bg-secondary-navy text-white font-bold rounded-lg transition-all text-base sm:text-lg inline-flex items-center justify-center gap-3 shadow-lg shadow-primary-navy/20">
            Accept The Challenge
          </a>
        </div>
      </div>

      {/* Need More Services */}
      <div id="property-baap" className="relative scroll-mt-6 py-10 sm:py-16 bg-light-navy border-b border-primary-navy/10 overflow-hidden">
        <PropertyBaapWatermark />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="mx-auto mb-5 w-fit rounded-full border border-gold-accent/30 bg-primary-navy px-6 py-2.5 font-extrabold text-2xl sm:text-3xl text-white tracking-[-0.02em] shadow-[0_8px_20px_rgba(22,56,37,0.14)]">Need More Services?</h2>
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-[0.06em] text-primary-navy">
                Property <span className="text-gold-accent">Baap</span>
              </h3>
              <p className="mb-2 font-extrabold text-xl sm:text-2xl text-primary-navy tracking-[-0.02em]">Think Property, Think Baap</p>
            </div>
            <p className="mt-4 font-sans text-sm sm:text-base text-secondary-text max-w-2xl mx-auto">A Complete Ecosystem Offering End-to-End Property Services for East of Kailash</p>
          </div>
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-primary-navy/15" />
            <p className="font-extrabold text-primary-navy text-base sm:text-lg tracking-[-0.02em]">Some Unmatched Benefits</p>
            <div className="h-px flex-1 bg-primary-navy/15" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {[
              "Zero Cost Sale Deed Registration",
              "Zero Cost Property Mutation",
              "Zero Cost Electricity Mutation",
              "Zero Cost Water Mutation",
              "Zero Cost Property Valuation",
              "Zero Cost Rent Agreement",
              "Instant 10% Rent Payback",
              "Instant Referral Bonus",
              "One Stop Property Solution",
            ].map((service) => (
              <div key={service} className="flex items-center gap-3 bg-white rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-border-color shadow-sm hover:shadow-md hover:border-gold-accent/30 transition-all">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gold-accent/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold-accent" />
                </div>
                <span className="font-sans text-xs sm:text-sm font-semibold text-primary-navy">{service}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => setSelectedBrand({ name: "PropertyBaap", url: "https://propertybaap.com" })} className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-primary-navy bg-primary-navy px-8 py-3.5 font-sans text-base font-black uppercase tracking-[0.14em] text-white shadow-[0_0_15px_rgba(22,56,37,0.15)] transition-all duration-200 hover:bg-secondary-navy hover:shadow-[0_0_25px_rgba(22,56,37,0.25)] active:scale-[0.98] sm:px-12 sm:py-4 sm:text-lg">
              <span className="font-black text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">Property Baap</span>
            </button>
          </div>
        </div>
      </div>

      <section className="py-10 sm:py-20 bg-gradient-to-b from-white to-light-navy border-y border-primary-navy/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="font-extrabold text-2xl sm:text-4xl text-primary-navy tracking-[-0.02em]">
              Our Legal Ecosystem
            </h2>
          </div>

          {/* Parent */}
          <div className="flex justify-center relative mb-8 lg:mb-0">
            <button onClick={() => setSelectedBrand({ name: "SaleDeed.com", url: "https://saledeed.com" })} className="relative bg-white rounded-2xl px-10 py-6 border border-primary-navy/15 z-10 cursor-pointer text-left transition-shadow hover:shadow-lg hover:shadow-primary-navy/10">
              <h3 className="font-extrabold text-3xl text-center tracking-[-0.02em]">
                <span className="text-primary-navy">SaleDeed</span>
                <span className="text-gold-accent">.com</span>
              </h3>
              <p className="font-sans text-secondary-text text-xs sm:text-sm text-center mt-2 tracking-wide">Property Deeds &bull; Government Approvals</p>
            </button>
          </div>

          {/* Connector SVG - large screens only (matches 5-col grid) */}
          <div className="hidden lg:block relative h-16">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 64"
            >
              <line x1="50" y1="0" x2="50" y2="32" stroke="#163825" strokeWidth="0.3" />
              <line x1="9.85" y1="32" x2="90.15" y2="32" stroke="#163825" strokeWidth="4" />
              {[10, 30, 50, 70, 90].map((x) => (
                <line key={x} x1={x} y1="32" x2={x} y2="64" stroke="#163825" strokeWidth="0.3" />
              ))}
            </svg>
          </div>

          {/* Children */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-sm:[&>*:last-child]:col-span-2 max-sm:[&>*:last-child]:max-w-64 max-sm:[&>*:last-child]:justify-self-center">
            {brands.map((brand) => (
              <button
                key={brand.name}
                type="button"
                onClick={() => setSelectedBrand({ name: brand.name, url: brand.url })}
                className="group rounded-2xl bg-white border border-border-color p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-gold-accent/40 hover:shadow-xl hover:shadow-gold-accent/5"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-accent/15 flex items-center justify-center text-gold-accent">
                  {brand.icon}
                </div>
                <h4 className="font-extrabold text-lg font-bold text-primary-navy group-hover:text-gold-accent transition tracking-[-0.02em]">
                  {brand.name}
                </h4>
                <p className="font-sans text-sm text-secondary-text mt-2">
                  {brand.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-primary-navy/10" />

      {/* EastOfKailash Footer */}
      <div className="bg-primary-navy pt-16 pb-10 sm:pt-20 sm:pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold-accent/[0.07] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Brand */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <div className="font-sans text-[19px] sm:text-[38px] font-extrabold leading-none mb-5">
              <span className="text-white">EastOfKailash<span className="text-gold-accent">.com</span></span>
            </div>
            <p className="text-gold-accent font-semibold tracking-widest uppercase text-[10px] sm:text-xs mb-3">PRESTIGE HAS AN ADDRESS, ITS EAST OF KAILASH</p>
            <div className="mt-1.5 flex items-center justify-center gap-2 flex-wrap font-sans text-[12px] sm:text-[14px] leading-relaxed">
              <span className="text-white/60">A Unit of</span>
              <span className="font-extrabold text-gold-accent">PropertyBaap</span>
              <span className="text-white/60">Ecosystem</span>
              <span className="text-gold-accent/40 mx-1">&bull;</span>
              <span className="text-white/60">A</span>
              <span className="font-extrabold text-gold-accent">31 Son</span>
              <span className="text-white/60">Venture</span>
            </div>
            <p className="mt-2 font-sans font-semibold tracking-[0.25em] uppercase text-[10px] sm:text-[12px]">
              <span className="text-gold-accent">Redefining</span>
              <span className="text-white"> The Defined</span>
            </p>
          </div>

          {/* Gradient divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent mb-8" />

          {/* Quick Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-x-7 sm:gap-x-10 gap-y-3 mb-8">
            <a href="/" className="font-sans text-white/60 hover:text-gold-accent text-xs sm:text-sm font-medium transition-colors">Home</a>
            <a href="/#explore" className="font-sans text-white/60 hover:text-gold-accent text-xs sm:text-sm font-medium transition-colors">Explore East of Kailash</a>
            <a href="/gallery" className="font-sans text-white/60 hover:text-gold-accent text-xs sm:text-sm font-medium transition-colors">Gallery</a>
            <a href="/list-your-property" className="font-sans text-white/60 hover:text-gold-accent text-xs sm:text-sm font-medium transition-colors">List Property</a>
            <a href="/circle-rates" className="font-sans text-white/60 hover:text-gold-accent text-xs sm:text-sm font-medium transition-colors">Circle Rates</a>
            <a href="https://propertybaap.com" target="_blank" rel="noopener noreferrer" className="font-sans text-white/60 hover:text-gold-accent text-xs sm:text-sm font-medium transition-colors">PropertyBaap</a>
          </nav>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-white/50 mb-2">
            <span>{site.phoneDisplay}</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>{site.email}</span>
          </div>
          <p className="text-center text-xs text-white/40 mb-2">{site.addressLine1} {site.addressLine2}</p>

        </div>
      </div>

      {/* Bottom bar — full width, pinned to bottom */}
      <div className="bg-[#0A1628] w-full py-5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
        <p className="font-sans text-white/70 text-[10px] sm:text-xs tracking-wide order-2 sm:order-1">&copy; 2026 {site.name} &middot; All Rights Reserved</p>
        <p className="font-sans font-medium text-xs sm:text-sm order-1 sm:order-2 text-white">
          <span className="mr-2 text-white/70">Incredible</span>
          <span style={{color:"#FF9933"}}>In</span>
          <span className="text-white">d</span>
          <span style={{color:"#138808"}}>ia</span>
        </p>
      </div>

    </footer>

    {selectedBrand && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-light-navy/80 backdrop-blur-md" onClick={() => setSelectedBrand(null)} />
        <div className="relative bg-white rounded-2xl shadow-2xl shadow-primary-navy/5 max-w-md w-full p-8 text-center border border-border-color">
          <button onClick={() => setSelectedBrand(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-light-navy flex items-center justify-center text-secondary-text hover:text-primary-navy hover:bg-gold-accent/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="w-14 h-14 rounded-full bg-gold-accent/15 flex items-center justify-center mx-auto mb-5">
            <ExternalLink className="w-7 h-7 text-gold-accent" />
          </div>
          <h3 className="font-extrabold text-xl text-primary-navy mb-2 tracking-[-0.02em]">
            You are about to leave <span className="text-gold-accent">EastOfKailash.com</span>
          </h3>
          <p className="text-secondary-text text-sm mb-6">You will be visiting {selectedBrand.name}.</p>
          <div className="flex gap-3">
            <button onClick={() => setSelectedBrand(null)} className="flex-1 py-3 bg-light-navy hover:bg-gold-accent/10 text-secondary-text font-bold rounded-xl transition-colors text-sm cursor-pointer">
              Stay Here
            </button>
            <a href={selectedBrand.url} target="_blank" rel="noreferrer" onClick={() => setSelectedBrand(null)} className="flex-1 py-3 bg-primary-navy hover:bg-secondary-navy text-white font-bold rounded-xl transition-colors text-sm text-center">
              Continue
            </a>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
