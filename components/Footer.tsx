"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink, X, CheckCircle2, Search, FileText, FilePen, Shield, Scale, PhoneCall, ChevronDown, ArrowRight } from "lucide-react";
import { getReferralUrl, getReferralMessage } from "@/lib/referral-storage";
import { WhatsAppLink } from "./WhatsAppLink";

// ─── Data ──────────────────────────────────────────────────────────
const partnerTypes = [
  "Deed Writers",
  "Property Dealers",
  "Lawyers & Advocates",
  "Ex-Govt Employees",
  "Builders",
  "Architects & Engineers",
  "Real Estate Consultants",
  "Notary Public",
  "Financial Advisors",
  "Others",
];

const brands = [
  { name: "TitleWala", url: "https://titlewala.com", icon: <Search className="w-6 h-6" />, desc: "Property Title Experts" },
  { name: "DeedWala", url: "https://deedwala.com", icon: <FileText className="w-6 h-6" />, desc: "Property Deed Experts" },
  { name: "MutationWala", url: "https://mutationwala.com", icon: <FilePen className="w-6 h-6" />, desc: "Property Mutation Experts" },
  { name: "FreeholdWala", url: "https://freeholdwala.com", icon: <Shield className="w-6 h-6" />, desc: "Property Freehold Experts" },
  { name: "ValuationWala", url: "https://valuationwala.com", icon: <Scale className="w-6 h-6" />, desc: "Property Valuation Experts" },
];

// ─── Watermark (inlined from PropertyBaapWatermark) ──────────────
function PropertyBaapWatermark() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const cols = isMobile ? 4 : 12;
  const count = isMobile ? 80 : 360;
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ opacity: 0.12 }}>
      {Array.from({ length: count }).map((_, i) => {
        const row = Math.floor(i / cols);
        return (
          <span
            key={i}
            className={`absolute font-black whitespace-nowrap ${isMobile ? "text-[13px]" : "text-[18px]"}`}
            style={{
              color: "rgba(255,255,255,0.15)",
              top: `${row * (isMobile ? 5.5 : 5)}%`,
              left: `${(i % cols) * (isMobile ? 25 : 8.5)}%`,
            }}
          >
            PropertyBaap
          </span>
        );
      })}
    </div>
  );
}

// ─── Main Footer ─────────────────────────────────────────────────
export function FooterFinal({
  
  signupUrl = "https://propertybaap.com/referral-signup",
  loginUrl = "https://propertybaap.com/referral-login",
}: {
  signupUrl?: string;
  loginUrl?: string;
}) {
  // Contact form
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  // Brand popup
  const [selectedBrand, setSelectedBrand] = useState<{ name: string; url: string } | null>(null);

  // Brand Story expand
  const [storyExpanded, setStoryExpanded] = useState(false);

  // Partner modal
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [partnerForm, setPartnerForm] = useState({ name: "", phone: "", type: "", message: "" });
  const [partnerTypeOpen, setPartnerTypeOpen] = useState(false);
  const partnerTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (partnerTypeRef.current && !partnerTypeRef.current.contains(event.target as Node)) {
        setPartnerTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    const cleanedPhone = contactForm.phone.replace(/[\s\-()]/g, "");
    if (!contactForm.name.trim()) errors.name = "Name is required";
    else if (contactForm.name.trim().length < 2) errors.name = "Enter a valid name";
    if (!contactForm.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(cleanedPhone)) errors.phone = "Enter a valid Indian phone number";
    if (!contactForm.message.trim()) errors.message = "Message is required";
    else if (contactForm.message.trim().length < 10) errors.message = "Please provide at least 10 characters";
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const message = `Hello EastOfKailash.com, I want to get in touch.\n\nName: ${contactForm.name}\nPhone: ${contactForm.phone}\nMessage: ${contactForm.message}`;
    window.open(getReferralUrl(`https://wa.me/919811110065?text=${encodeURIComponent(getReferralMessage(message))}`), "_blank");
  };

  const handlePartnerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedPhone = partnerForm.phone.replace(/[\s\-()]/g, "");
    if (!partnerForm.type || !/^(\+91|91|0)?[6-9]\d{9}$/.test(cleanedPhone)) return;
    const whatsappMessage = `Hello EastOfKailash.com, I want to register as a partner.\n\nName: ${partnerForm.name}\nPhone: ${partnerForm.phone}\nPartner Type: ${partnerForm.type}\nDetails: ${partnerForm.message}`;
    window.open(getReferralUrl(`https://wa.me/919811110065?text=${encodeURIComponent(getReferralMessage(whatsappMessage))}`), "_blank");
    setShowPartnerModal(false);
  };

  return (
    <>
      <footer className="bg-page-bg text-off-white border-t-[6px] border-primary notranslate" translate="no">
        {/* ── Contact Us ── */}
        <section id="contact" className="scroll-mt-24 border-b border-primary/10 bg-light-navy py-10 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 text-center sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16 lg:text-left">
            <div>
              <h2 className="mb-4 font-extrabold text-4xl tracking-[-0.03em] text-primary-navy sm:text-6xl">Get Private Consultation</h2>
              <p className="mx-auto max-w-md font-sans text-sm leading-relaxed text-secondary-text sm:text-base lg:mx-0">
                Need discreet, one-on-one guidance on your property matter? Share your details and a senior Property Baap consultant will reach out to you directly and confidentially.
              </p>
            </div>
            <form onSubmit={handleContactSubmit} className="grid gap-3 rounded-xl border border-border-color bg-white p-4 sm:grid-cols-2 sm:p-6">
              <input
                required
                type="text"
                placeholder="Your name *"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                aria-invalid={Boolean(contactErrors.name)}
                className={`min-h-12 rounded-lg border ${contactErrors.name ? "border-red-500" : "border-border-color focus:border-primary"} bg-white px-4 text-sm text-primary-navy outline-none transition-colors placeholder:text-secondary-text/60`}
              />
              {contactErrors.name && <p className="text-left text-xs text-red-500 sm:col-span-2">{contactErrors.name}</p>}
              <input
                required
                type="tel"
                placeholder="Phone number *"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                aria-invalid={Boolean(contactErrors.phone)}
                className={`min-h-12 rounded-lg border ${contactErrors.phone ? "border-red-500" : "border-border-color focus:border-primary"} bg-white px-4 text-sm text-primary-navy outline-none transition-colors placeholder:text-secondary-text/60`}
              />
              {contactErrors.phone && <p className="text-left text-xs text-red-500 sm:col-span-2">{contactErrors.phone}</p>}
              <textarea
                required
                rows={3}
                placeholder="How can we help? *"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                aria-invalid={Boolean(contactErrors.message)}
                className={`resize-none rounded-lg border ${contactErrors.message ? "border-red-500" : "border-border-color focus:border-primary"} bg-white px-4 py-3 text-sm text-primary-navy outline-none transition-colors placeholder:text-secondary-text/60 sm:col-span-2`}
              />
              {contactErrors.message && <p className="text-left text-xs text-red-500 sm:col-span-2">{contactErrors.message}</p>}
              <button type="submit" className="rounded-lg bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-dark sm:col-span-2 sm:justify-self-start">
                Send Enquiry
              </button>
            </form>
          </div>
        </section>

        {/* ── 1 Call Challenge ── */}
        <div id="one-call-challenge" className="py-8 sm:py-12 bg-white text-center relative overflow-hidden border-b border-primary/10 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl md:text-6xl text-primary-navy mb-4 sm:mb-6 tracking-[-0.02em]">
              <span className="text-gold-accent">1 Call</span> Challenge
            </h2>
            <p className="font-sans text-base sm:text-xl text-primary-navy/80 mb-2 max-w-2xl mx-auto">
              Pick up the phone. <span className="text-primary font-bold">Reach Us Once</span>.
            </p>
            <p className="font-sans text-sm sm:text-lg text-secondary-text mb-6 sm:mb-10 max-w-xl mx-auto">
              We boldly present our one call challenge to prove that we are the best people to deal with when it comes to one of your most valuable possessions - <span className="text-primary font-bold">Your Property</span>
            </p>
            <WhatsAppLink
              message="*Hello EastOfKailash.com, I Accept Your 1 Call Challenge.*"
              phone="919811110065"
              className="font-sans px-6 sm:px-10 py-3 sm:py-5 bg-primary hover:bg-primary text-white font-bold rounded-lg transition-all text-base sm:text-lg inline-flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
            >
              Accept The Challenge
            </WhatsAppLink>
          </div>
        </div>

        {/* ── Need More Services (Property Baap) ── */}
        <div id="property-baap" className="relative scroll-mt-6 py-10 sm:py-16 bg-light-navy border-b border-primary/10 overflow-hidden">
          <PropertyBaapWatermark />
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="mx-auto mb-5 w-fit rounded-full border border-primary/20 bg-primary px-6 py-2.5 font-extrabold text-2xl sm:text-3xl text-white tracking-[-0.02em] shadow-[0_8px_20px_rgba(22,56,37,0.14)]">Need More Services?</h2>
              <div className="flex flex-col items-center justify-center gap-2">
                <h3 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-[0.06em] text-primary-navy">
                  Property <span className="text-gold-accent">Baap</span>
                </h3>
                <p className="mb-2 font-extrabold text-xl sm:text-2xl text-primary tracking-[-0.02em]">Think Property, Think Baap</p>
              </div>
              <p className="mt-4 font-sans text-sm sm:text-base text-secondary-text max-w-2xl mx-auto">A Complete Ecosystem Offering End-to-End Property Services</p>
            </div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-primary/20" />
              <p className="font-extrabold text-primary-navy text-base sm:text-lg tracking-[-0.02em]">Some Unmatched Benefits</p>
              <div className="h-px flex-1 bg-primary/20" />
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
                <div key={service} className="flex items-center gap-3 bg-white rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-primary/10 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-primary-navy">{service}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setSelectedBrand({ name: "PropertyBaap", url: "https://propertybaap.com" })}
                className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-primary bg-primary px-8 py-3.5 font-sans text-base font-black uppercase tracking-[0.14em] text-white shadow-[0_0_15px_rgba(22,56,37,0.15)] transition-all duration-200 hover:bg-primary-dark hover:shadow-[0_0_25px_rgba(22,56,37,0.25)] active:scale-[0.98] sm:px-12 sm:py-4 sm:text-lg"
              >
                <span className="font-black text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">Property Baap</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Brand Story ── */}
        <section id="brand-story" className="scroll-mt-20 border-b border-primary/10 bg-white py-12 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center sm:mb-14">
              <h2 className="font-serif text-3xl font-black text-primary-navy sm:text-5xl">Our Brand Story</h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary/30" />
            </div>
            <div className="space-y-6 text-[15px] leading-relaxed text-secondary-text sm:text-[17px]">
              <p className="text-center">
                <span className="font-bold text-primary-navy">Property Baap</span> is not another quirky brand name chosen to create a periodic buzz in the real estate market. It is a well-thought-out name, carrying a deliberate meaning and an immense opportunity within itself.
              </p>
              <p className="text-center font-bold uppercase tracking-[0.12em] text-primary">Spare Two Minutes To Know — How?</p>
              <button
                type="button"
                onClick={() => setStoryExpanded(!storyExpanded)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white px-6 py-3 text-[15px] font-bold text-primary transition-colors hover:bg-primary hover:text-white sm:text-[17px]"
              >
                {storyExpanded ? "Hide Story" : "View Full Story"}
                <ChevronDown className={`h-4 w-4 transition-transform ${storyExpanded ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-500 ease-in-out ${storyExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="space-y-6 pt-2">
                    <h3 className="pt-4 text-center font-sans text-[17px] font-black uppercase tracking-[0.08em] text-primary-navy sm:text-[19px]">Do Or Die</h3>
                    <p>
                      With a life exposed to many situations where the only way out was <span className="font-bold text-primary-navy">Do or Die</span>, the only option was survival and sustenance, routed through one belief: <span className="font-bold text-primary">MUST FIGHT. MUST WIN.</span>
                    </p>
                    <p>What was initially scary gradually became thrilling. That experience became a daily routine - and eventually started reflecting everywhere, personally as well as professionally.</p>
                    <h3 className="pt-4 text-center font-sans text-[17px] font-black uppercase tracking-[0.08em] text-primary-navy sm:text-[19px]">Professional Pinch &amp; Punch</h3>
                    <p>The profession never welcomed me in the way I expected it to. Denials. Disapprovals. Disappointments. They all led to one thing: <span className="font-bold text-primary">DARE.</span></p>
                    <p>The one who wholeheartedly dares literally does not care. That <span className="font-bold text-primary-navy">Dare Without Care</span> created an attitude that became <span className="font-bold text-primary-navy">Rare</span>.</p>
                    <h3 className="pt-4 text-center font-sans text-[17px] font-black uppercase tracking-[0.08em] text-primary-navy sm:text-[19px]">Find Or Be Found</h3>
                    <p>When you get nothing, you are obliged to find something. And that something, if done right, can get you everything. Whether you find the luck or the luck finds you, <span className="font-bold text-primary-navy">SUCCESS IS ALL THAT MATTERS.</span></p>
                    <h3 className="pt-4 text-center font-sans text-[17px] font-black uppercase tracking-[0.08em] text-primary-navy sm:text-[19px]">Done Hain</h3>
                    <p>When a query comes to us, we are psychologically prepared and trained to believe we will be able to handle, execute &amp; accomplish it and never discard it because it is small, irrelevant or seemingly less profitable.</p>
                    <p className="flex items-center justify-center gap-2 text-center font-bold text-primary">In our Mind It Is Already — Done Hain <CheckCircle2 className="h-5 w-5 text-primary" /></p>
                    <p>We see it as: <span className="font-bold text-primary">An opportunity to learn. An opportunity to solve. An opportunity to start a new journey,</span> with someone we already know or someone we have just met.</p>
                    <p>We don&apos;t claim to do wonders. But we do assure you of <span className="font-bold text-primary">saving you from blunders.</span></p>
                    <h3 className="pt-6 text-center font-serif text-xl font-black text-primary-navy sm:text-2xl">Property Baap — The Meaning</h3>
                    <p>A father is not merely someone who commands the utmost respect. A father inherently carries the utmost responsibility. He provides an answer to your every question, no matter how silly it may seem, and searches for a solution to your every problem. Sometimes he gives you exactly what you want. Sometimes he tells you what is right and practical. A father is, in many ways, our one-stop solution provider in any given situation.</p>
                    <p className="text-center font-bold text-primary">That is what Property Baap means to us.</p>
                    <p>We at Property Baap are built on the same principle: <span className="font-bold text-primary-navy">Providing righteous guidance and dependable service across everything related to property.</span></p>
                    <h3 className="pt-6 text-center font-serif text-xl font-black text-primary-navy sm:text-2xl">Property Baap — The Opportunity</h3>
                    <p>Property Baap is constituted on the principle of serving the masses, in association with people from every section of society. We work with everyone, from an industrialist to a delivery partner. <span className="font-bold text-primary">Because property affects everyone.</span> We take the pain together. We gain together. And that is where our opportunity becomes everyone&apos;s opportunity.</p>
                    <p>If you relate to our story, reach out to us — as a client, as a professional partner, or simply by joining our <span className="font-bold text-primary">#HarGharDealer</span> movement. Because the opportunity should not depend on who you are or what you do. <span className="font-bold text-primary-navy">It should depend on what you can bring to the table.</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Legal Ecosystem ── */}
        <section className="py-10 sm:py-20 bg-gradient-to-b from-panel-bg to-page-bg border-y border-primary/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-14">
              <h2 className="font-extrabold text-2xl sm:text-4xl text-primary-navy tracking-[-0.02em]">Our Legal Ecosystem</h2>
            </div>
            <div className="flex justify-center relative mb-8 lg:mb-0">
              <button onClick={() => setSelectedBrand({ name: "SaleDeed.com", url: "https://saledeed.com" })} className="relative bg-white rounded-2xl px-10 py-6 border border-primary z-10 cursor-pointer text-left transition-shadow hover:shadow-lg hover:shadow-primary/10">
                <h3 className="font-extrabold text-3xl text-center tracking-[-0.02em]">
                  <span className="text-primary-navy">SaleDeed</span>
                  <span className="text-primary">.com</span>
                </h3>
                <p className="font-sans text-secondary-text text-xs sm:text-sm text-center mt-2 tracking-wide">Property Deeds &bull; Government Approvals</p>
              </button>
            </div>
            <div className="hidden lg:block relative h-16">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 64">
                <line x1="50" y1="0" x2="50" y2="32" stroke="#163825" strokeWidth="0.3" />
                <line x1="9.85" y1="32" x2="90.15" y2="32" stroke="#163825" strokeWidth="4" />
                {[10, 30, 50, 70, 90].map((x) => (
                  <line key={x} x1={x} y1="32" x2={x} y2="64" stroke="#163825" strokeWidth="0.3" />
                ))}
              </svg>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-sm:[&>*:last-child]:col-span-2 max-sm:[&>*:last-child]:max-w-64 max-sm:[&>*:last-child]:justify-self-center">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() => setSelectedBrand({ name: brand.name, url: brand.url })}
                  className="group rounded-2xl bg-white border border-primary/10 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">{brand.icon}</div>
                  <h4 className="font-extrabold text-lg font-bold text-primary-navy group-hover:text-primary transition tracking-[-0.02em]">{brand.name}</h4>
                  <p className="font-sans text-sm text-secondary-text mt-2">{brand.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partnership: Professional Network ── */}
        <section id="partner-section" className="scroll-mt-20 border-t border-border-color bg-light-navy py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="mb-10 font-mono text-base font-black tracking-[0.15em] text-gold-accent sm:mb-8 sm:text-base">Property Baap Professional Network</p>
            <h2 className="mb-6 font-serif text-3xl text-primary-navy md:text-4xl">Grow With Us, Partner With Property Baap Professional Network</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary-text md:text-xl">
              Are you a deed writer, property dealer, lawyer, architect, or an ex-government employee? Join Delhi&apos;s most trusted property network to get maximum rewards for your expertise &amp; years of hard work.
            </p>
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {partnerTypes.map((type) => (
                <span key={type} className="rounded-full border-2 border-primary/30 bg-white px-4 py-2 text-sm font-medium text-primary">
                  {type}
                </span>
              ))}
            </div>
            <button type="button" onClick={() => setShowPartnerModal(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-10 py-5 text-xl font-black tracking-wide text-white transition-colors hover:bg-primary-dark sm:text-2xl">
              Partner With Us
            </button>
          </div>
        </section>

        {/* ── Referral: HarGharDealer ── */}
        <section id="referral-section" className="scroll-mt-20 border-y border-white/20 bg-primary py-10 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex flex-col items-center gap-2 border-b border-white/20 pb-6 text-center sm:mb-10">
              <p className="mb-10 font-mono text-base font-black tracking-[0.15em] text-[#C9953C] sm:mb-8 sm:text-base">Property Baap Referral Network</p>
              <h2 className="font-sans text-4xl font-black tracking-[0.03em] text-white sm:text-6xl">#HarGharDealer</h2>
              <p className="mt-2 font-sans text-xl sm:text-2xl font-black tracking-[0.06em] text-[#C9953C]">Deal Lao - Paisa Kamao</p>
            </div>
            <p className="mx-auto mt-1 max-w-3xl text-center text-base font-semibold leading-relaxed text-[#C9953C] sm:text-xl">You Refer <span className="mx-1">•</span> We Execute <span className="mx-1">•</span> You Earn</p>
            <p className="mx-auto mb-6 mt-4 max-w-3xl text-center font-serif text-lg font-bold tracking-wide text-[#C9953C] sm:text-2xl">Property Baap Proudly Welcomes You To Its Referral Network.</p>
            <div className="grid gap-7 text-center md:text-left lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <p className="mx-auto max-w-2xl text-lg font-extrabold leading-tight text-white sm:text-3xl md:mx-0">
                  Earn a flat <span className="text-[#C9953C]">25% of the profit</span> we make from your successful reference.
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:mx-0">
                  Whether you are a student, homemaker, business owner, working professional, delivery partner, senior citizen, person with a disability, unemployed, or simply looking for an additional source of passive income - you can become a part of our network.
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base sm:text-xl font-extrabold leading-snug text-[#C9953C] md:mx-0">
                  Just Refer Someone About Any Of Our Property Services And You&apos;re Done.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-white sm:mt-6 sm:text-xs sm:tracking-[0.14em] md:justify-start">
                  {["Zero Liability", "Zero Joining Fee", "Zero Conditions"].map((benefit) => (
                    <span key={benefit} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs">{benefit}</span>
                  ))}
                </div>
              </div>
              <div className="border-t-2 border-white/30 pt-6 md:border-l-2 md:border-t-0 md:pl-8 md:pt-0">
                <p className="mx-auto mb-5 max-w-md text-sm font-semibold leading-relaxed text-white/80 md:mx-0">Join the reference giver network or access your reference status.</p>
                <div className="flex w-full flex-col items-center gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                  <a href={signupUrl} className="inline-flex w-[85%] items-center justify-center gap-2 rounded-lg bg-white px-4 py-4 text-lg font-black tracking-wide text-primary transition-colors hover:bg-light-navy sm:w-full sm:py-3 sm:text-sm">
                    Join As A Referral Partner
                  </a>
                  <a href={loginUrl} className="inline-flex w-[85%] items-center justify-center gap-2 rounded-lg border-2 border-white/40 bg-transparent px-4 py-4 text-lg font-black tracking-wide text-white transition-colors hover:bg-white/10 sm:w-full sm:py-3 sm:text-sm">
                    Already A Referral Partner
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-white/20 pt-8 text-center">
              <p className="mb-2 text-base font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-lg">Ab hoga</p>
              <p className="mt-1 font-sans text-3xl font-black tracking-[0.08em] text-white sm:text-4xl">Har Ghar Dealer</p>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-primary/10" />

        {/* ── Brand Footer ── */}
        <div className="bg-footer-bg pt-16 pb-10 sm:pt-20 sm:pb-12 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/[0.07] blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
              <div className="font-sans text-[19px] sm:text-[38px] font-extrabold leading-none mb-5">
                <span className="text-primary">EastOfKailash.com</span>
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-2 flex-wrap font-sans text-[12px] sm:text-[14px] leading-relaxed">
                <span className="text-muted">A Unit of</span>
                <span className="font-extrabold text-primary">PropertyBaap</span>
                <span className="text-muted">Ecosystem</span>
                <span className="text-primary/40 mx-1">&bull;</span>
                <span className="text-muted">A</span>
                <span className="font-extrabold text-primary">31 Son</span>
                <span className="text-muted">Venture</span>
              </div>
              <p className="mt-2 font-sans font-semibold tracking-[0.25em] uppercase text-[10px] sm:text-[12px]">
                <span className="text-primary">Redefining</span>
                <span className="text-primary-navy"> The Defined</span>
              </p>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
            <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-x-7 sm:gap-x-10 gap-y-3 mb-8">
              <a href="/" className="font-sans text-muted hover:text-primary text-xs sm:text-sm font-medium transition-colors">Home</a>
              <a href="/gallery" className="font-sans text-muted hover:text-primary text-xs sm:text-sm font-medium transition-colors">Gallery</a>
              <a href="/list-your-property" className="font-sans text-muted hover:text-primary text-xs sm:text-sm font-medium transition-colors">List Your Property</a>
              <a href="/circle-rates" className="font-sans text-muted hover:text-primary text-xs sm:text-sm font-medium transition-colors">Circle Rates</a>
              <a href="/exclusive-deals" className="font-sans text-muted hover:text-primary text-xs sm:text-sm font-medium transition-colors">Exclusive Deals</a>
              <a href="/origin-and-story" className="font-sans text-muted hover:text-primary text-xs sm:text-sm font-medium transition-colors">Our Story</a>
              <a href="/about" className="font-sans text-muted hover:text-primary text-xs sm:text-sm font-medium transition-colors">About Us</a>
            </nav>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="bg-[#0A1628] w-full py-5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <p className="font-sans text-white text-[10px] sm:text-xs tracking-wide order-2 sm:order-1">EastOfKailash.com &copy; 2026 &middot; All Rights Reserved</p>
          <p className="font-sans font-medium text-xs sm:text-sm order-1 sm:order-2 text-white">
            <span className="mr-2 text-white">Incredible</span>
            <span style={{ color: "#FF9933" }}>In</span>
            <span className="text-white">d</span>
            <span style={{ color: "#138808" }}>ia</span>
          </p>
        </div>
      </footer>

      {/* ── Popups ── */}
      {selectedBrand && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-page-bg/80 backdrop-blur-md" onClick={() => setSelectedBrand(null)} />
          <div className="relative bg-panel-bg rounded-2xl shadow-2xl shadow-primary/5 max-w-md w-full p-8 text-center border border-primary/20">
            <button onClick={() => setSelectedBrand(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-muted hover:text-off-white hover:bg-primary/20 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <ExternalLink className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-extrabold text-xl text-primary-navy mb-2 tracking-[-0.02em]">
              You are about to leave <span className="text-primary">EastOfKailash.com</span>
            </h3>
            <p className="text-muted text-sm mb-6">You will be visiting {selectedBrand.name}.</p>
            <div className="flex gap-3">
              <button onClick={() => setSelectedBrand(null)} className="flex-1 py-3 bg-primary/10 hover:bg-primary/20 text-muted font-bold rounded-xl transition-colors text-sm cursor-pointer">
                Stay Here
              </button>
              <a href={selectedBrand.url} target="_blank" rel="noreferrer" onClick={() => setSelectedBrand(null)} className="flex-1 py-3 bg-primary hover:bg-primary text-white font-bold rounded-xl transition-colors text-sm text-center">
                Continue
              </a>
            </div>
          </div>
        </div>
      )}

      {showPartnerModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button type="button" aria-label="Close partner registration" className="absolute inset-0 cursor-default bg-[#0A1628]/70 backdrop-blur-sm" onClick={() => setShowPartnerModal(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border-color bg-white p-6 shadow-2xl sm:p-8">
            <button type="button" onClick={() => setShowPartnerModal(false)} className="absolute right-4 top-4 text-2xl leading-none text-secondary-text hover:text-primary" aria-label="Close">&times;</button>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Partner Registration</p>
            <h2 className="mb-2 text-2xl font-extrabold text-primary-navy sm:text-3xl">Partner With Property Baap Ecosystem</h2>
            <p className="mb-6 text-sm leading-relaxed text-secondary-text">Share your details and we&apos;ll continue the conversation on WhatsApp.</p>
            <form onSubmit={handlePartnerSubmit} className="grid gap-3">
              <input required placeholder="Your name *" value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className="min-h-12 rounded-lg border border-border-color bg-white px-4 text-sm text-primary-navy outline-none focus:border-primary" />
              <input required type="tel" pattern="[+]?[0-9 ()-]{10,}" placeholder="Phone number *" value={partnerForm.phone} onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })} className="min-h-12 rounded-lg border border-border-color bg-white px-4 text-sm text-primary-navy outline-none focus:border-primary" />
              <div ref={partnerTypeRef} className="relative">
                <button type="button" onClick={() => setPartnerTypeOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={partnerTypeOpen} className="flex min-h-12 w-full items-center justify-between rounded-lg border border-border-color bg-white px-4 text-left text-sm text-primary-navy outline-none transition-colors focus:border-primary">
                  <span className={partnerForm.type ? "text-primary-navy" : "text-secondary-text/60"}>{partnerForm.type || "Select partner type"}</span>
                  <ChevronDown className={`h-4 w-4 text-primary transition-transform ${partnerTypeOpen ? "rotate-180" : ""}`} />
                </button>
                {partnerTypeOpen && (
                  <div role="listbox" className="absolute left-0 right-0 top-full z-20 mt-1 max-h-52 overflow-y-auto rounded-lg border border-border-color bg-white p-1 shadow-xl">
                    {partnerTypes.map((type) => (
                      <button key={type} type="button" role="option" aria-selected={partnerForm.type === type} onClick={() => { setPartnerForm({ ...partnerForm, type }); setPartnerTypeOpen(false); }} className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${partnerForm.type === type ? "bg-primary/10 font-semibold text-primary" : "text-primary-navy hover:bg-light-navy hover:text-primary"}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <textarea required rows={3} placeholder="Tell us briefly about your network or work" value={partnerForm.message} onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })} className="resize-none rounded-lg border border-border-color bg-white px-4 py-3 text-sm text-primary-navy outline-none focus:border-primary" />
              <button type="submit" className="mt-2 rounded-lg bg-primary px-5 py-3 font-bold text-white transition-colors hover:bg-primary-dark">Register Via WhatsApp</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FooterFinal;
