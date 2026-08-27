'use client';

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { site } from '@/lib/site';

export function ExclusiveDealsForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const message = `Hi, I'm interested in Exclusive Deals.\n\nName: ${name}\nPhone: ${phone}`;
    window.open(site.whatsapp(message), '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-gold-accent/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-gold-accent" />
        </div>
        <h3 className="text-lg font-bold mb-2">Thank You!</h3>
        <p className="text-light-navy/60 text-sm">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm outline-none focus:border-gold-accent transition-colors placeholder:text-white/30"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">Phone Number</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm outline-none focus:border-gold-accent transition-colors placeholder:text-white/30"
          placeholder="Your phone number"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gold-accent text-primary-navy hover:bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
      >
        Submit
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
