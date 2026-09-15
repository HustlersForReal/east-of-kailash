import { BadgeIndianRupee, UserCheck, Sparkles, Lock, Eye, Search, Shield, CreditCard, Heart, Gift } from 'lucide-react';

const features = [
  {
    icon: BadgeIndianRupee,
    title: "Minimum Commission",
    description: "We charge less and provide more value than your favorite dealer.",
  },
  {
    icon: UserCheck,
    title: "Personalized Assistance",
    description: "A dedicated partner with every service to handle everything from beginning to the end.",
  },
  {
    icon: Sparkles,
    title: "Especially For You",
    description: "Tailored solutions especially for every case.",
  },
  {
    icon: Lock,
    title: "Privacy Kept At Every Step",
    description: "Just between you and us. We never discuss about you, not even with your son.",
  },
  {
    icon: Eye,
    title: "100% Transparent",
    description: "Transparent service module. Zero surprises and hidden charges.",
  },
  {
    icon: Search,
    title: "Ins & Outs",
    description: "Horoscope of every property. Everything you should know.",
  },
  {
    icon: Shield,
    title: "Liaisoning Experts",
    description: "100% government compliances. Nothing left, nothing misunderstood, no botherations from the government.",
  },
  {
    icon: CreditCard,
    title: "Pay Your Way",
    description: "Flexible payment options that best fits your profile. We value you.",
  },
  {
    icon: Heart,
    title: "Forever With You",
    description: "Lifelong Relationship. We were there, we are still here and we will always be there for you. We don't believe in kaam khatam – Baat Khatam.",
  },
];

const bonuses = [
  "Free sale deed / rent agreement registration.",
  "Free mutation (transfer of property title).",
  "Free valuation reports (capital gain / market value).",
  "Free electricity / Water mutation.",
];

export function SaveMyMoney() {
  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 mb-10 sm:mb-14">
          <div className="lg:col-span-7">
            <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-4 sm:mb-6 tracking-tight leading-[1.1]">
              Your One Stop Shop For Everything Property.
            </h2>
            <p className="text-secondary-text text-base sm:text-lg leading-relaxed mb-4">
              From the founders of saledeed.com, EastOfKailash.com is an entity which has been trusted and appreciated by thousands of property owners. An Actual One Stop Shop that provides comprehensive services covering your entire real estate journey at a single platform.
            </p>
            <p className="text-secondary-text text-sm sm:text-base leading-relaxed">
              There is no one who can serve you the way we do. We not only save your time but also give you combination of packages that saves your overall cost for your specific property need.
            </p>
          </div>
          <div className="lg:col-span-5 flex items-center">
            <div className="bg-primary-navy text-white p-6 sm:p-8 w-full">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-gold-accent" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/60">
                  Complementary Bonus
                </h3>
              </div>
              <p className="text-light-navy/50 text-sm mb-5 leading-relaxed">
                We are known to introduce a one of its kind complementary services on many of our deals like:
              </p>
              <ul className="space-y-3">
                {bonuses.map((bonus, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-gold-accent mt-0.5 shrink-0">&#10003;</span>
                    <span className="text-light-navy/70 text-sm leading-relaxed">{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group flex items-start gap-4 px-5 sm:px-6 py-5 sm:py-6 bg-white border-[3px] border-primary-navy hover:border-gold-accent hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-navy flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
                  <Icon className="w-5 h-5 text-white group-hover:text-primary-navy transition-colors" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-primary-navy mb-1 group-hover:text-gold-accent transition-colors leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
