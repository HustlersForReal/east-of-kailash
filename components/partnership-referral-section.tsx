"use client";

import { Handshake, ArrowRight, BadgePercent, Users, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { WhatsAppLink } from "./WhatsAppLink";

export function PartnershipReferralSection() {
  const points = [
    { icon: <BadgePercent className="w-5 h-5" />, title: "Earn on Every Referral", desc: "Get rewarded for every genuine buyer or seller you connect with us." },
    { icon: <Users className="w-5 h-5" />, title: "For Dealers & Professionals", desc: "Property dealers, lawyers, architects and ex-govt experts welcome." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Trusted Payouts", desc: "Transparent, on-time referral payouts with full deal visibility." },
  ];

  return (
    <section className="py-10 sm:py-16 bg-white border-y border-primary-navy/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold-accent/15 flex items-center justify-center mx-auto lg:mx-0 mb-5">
              <Handshake className="w-6 h-6 sm:w-8 sm:h-8 text-gold-accent" />
            </div>
            <h2 className="font-extrabold text-2xl sm:text-4xl text-primary-navy tracking-[-0.02em] mb-4">
              Partner With Us, <span className="text-gold-accent">Earn With Us</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-secondary-text max-w-md mx-auto lg:mx-0 mb-6">
              Know someone buying or selling in East of Kailash? Refer them to {site.name} and earn referral rewards on every closed deal.
            </p>
            <WhatsAppLink
              message={`Hello ${site.name}, I want to partner with you as a referral partner.`}
              className="inline-flex items-center justify-center gap-2 bg-primary-navy hover:bg-secondary-navy text-white font-bold rounded-lg px-8 py-3.5 text-sm sm:text-base transition-colors"
            >
              Become a Partner
              <ArrowRight className="w-4 h-4" />
            </WhatsAppLink>
          </div>
          <div className="grid gap-3 sm:gap-4">
            {points.map((p) => (
              <div key={p.title} className="flex items-start gap-3 bg-light-navy rounded-xl px-4 sm:px-5 py-4 border border-border-color">
                <div className="w-9 h-9 rounded-lg bg-gold-accent/15 flex items-center justify-center shrink-0 text-gold-accent">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-primary-navy">{p.title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-secondary-text mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
