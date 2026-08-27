import { investmentReasons } from '@/lib/data';

export function WhyInvest() {
  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32" style={{ backgroundColor: '#FBFCFD' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Investment</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight">
            Why Invest in East of Kailash?
          </h2>
          <p className="text-secondary-text text-base sm:text-lg">
            Strong fundamentals make this planned South Delhi colony a highly sought-after destination for homebuyers and investors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {investmentReasons.map((reason, idx) => (
            <div key={idx} className="group bg-white border-[3px] border-primary-navy p-5 sm:p-6 hover:border-gold-accent hover:shadow-md transition-all duration-200">
              <span className="text-primary-navy text-2xl sm:text-3xl font-bold tracking-wider group-hover:text-gold-accent transition-colors">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-bold text-primary-navy text-sm sm:text-base mt-3 mb-1.5 leading-snug group-hover:text-gold-accent transition-colors">
                {reason.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
