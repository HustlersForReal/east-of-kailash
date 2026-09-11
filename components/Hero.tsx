'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building2, TrendingUp, Plus } from 'lucide-react';
import { areaProfiles } from '@/lib/data';

const locations = [
  'Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F', 'Block G',
  'DDA Flats', 'Schools', 'Hospitals', 'Nursing Home',
  'Community Centre', 'Cinema Hall',
];

const quickFilters: never[] = [];

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[500px] sm:min-h-[520px] lg:min-h-[720px] xl:min-h-[760px] flex items-center py-4 sm:py-6 lg:py-12">
      <video autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover object-center">
        <source src="https://res.cloudinary.com/s8hu1xkw/video/upload/v1789155623/EOK-FInal-compressed_yz0ahn.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-primary-navy/30" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 py-4 sm:py-6 lg:py-6 text-center sm:px-6 lg:px-8">
        <NameBlocks />
        <Headline />
        <Subtitle />
        <SearchSection />
        <Chips />
        <Stats />
      </div>
    </section>
  );
}

function NameBlocks() {
  const target = 'EAST OF KAILASH';
  const chars = target.split('');
  const [letters, setLetters] = useState<string[]>(chars.map((c) => (c === ' ' ? c : 'A')));
  const [revealed, setRevealed] = useState(chars.map(() => false));

  useEffect(() => {
    const randomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const intervals = chars.map((char, i) => {
      if (char === ' ') return null;
      const delay = 800 + Math.random() * 1600;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= delay) {
          setLetters((prev) => {
            const next = [...prev];
            next[i] = char;
            return next;
          });
          setRevealed((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
          clearInterval(interval);
        } else {
          setLetters((prev) => {
            const next = [...prev];
            next[i] = randomLetter();
            return next;
          });
        }
      }, 50);

      return interval;
    });

    return () => intervals.forEach((interval) => interval && clearInterval(interval));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWord = (indices: number[], large = false) => (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
      {indices.map((i) => (
        <div
          key={i}
          className={`${large ? 'w-[40px] h-[52px] sm:w-10 sm:h-12' : 'w-[36px] h-[46px] sm:w-10 sm:h-12'} md:w-12 md:h-16 flex items-center justify-center rounded-md backdrop-blur-md border transition-all duration-300 ${
            revealed[i]
              ? 'bg-white/10 border-gold-accent/40 shadow-lg shadow-gold-accent/10'
              : 'bg-white/5 border-white/15'
          }`}
        >
          <span className={`${large ? 'text-[20px]' : 'text-[18px]'} sm:text-2xl md:text-4xl font-black tabular-nums transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${
            revealed[i] ? 'text-gold-accent' : 'text-white/70'
          }`}>
            {letters[i]}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
      {/* Mobile: 2 lines — EAST OF (bada) / KAILASH */}
      <div className="flex flex-col items-center gap-1 sm:hidden">
        <div className="flex items-center justify-center gap-1">
          {renderWord([0, 1, 2, 3], true)}
          <div className="w-2" />
          {renderWord([5, 6], true)}
        </div>
        {renderWord([8, 9, 10, 11, 12, 13, 14])}
      </div>
      {/* Desktop: single line */}
      <div className="hidden sm:flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
        {chars.map((c, i) =>
          c === ' ' ? (
            <div key={i} className="w-2 sm:w-3" />
          ) : (
            <div
              key={i}
              className={`w-10 h-14 md:w-12 md:h-16 flex items-center justify-center rounded-md backdrop-blur-md border transition-all duration-300 ${
                revealed[i]
                  ? 'bg-white/10 border-gold-accent/40 shadow-lg shadow-gold-accent/10'
                  : 'bg-white/5 border-white/15'
              }`}
            >
              <span className={`text-[26px] md:text-4xl font-black tabular-nums transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] ${
                revealed[i] ? 'text-gold-accent' : 'text-white/70'
              }`}>
                {letters[i]}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Headline() {
  return (
    <h1 className="text-[30px] xs:text-[32px] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white mb-2 sm:mb-3 leading-[1.1] tracking-tight">
      PRESTIGE HAS AN ADDRESS,
      <br />
      <span className="text-gold-accent">IT&apos;S EAST OF KAILASH</span>
    </h1>
  );
}

function Subtitle() {
  return (
    <p className="text-[14px] sm:text-base md:text-lg lg:text-xl text-white/70 max-w-[90%] sm:max-w-2xl mx-auto mb-3.5 sm:mb-5 leading-relaxed px-2 sm:px-0">
      Your Trusted South Delhi Real Estate Partner. Buy, sell, rent or invest across Blocks A&ndash;G, DDA Flats and the Community Centre belt of East of Kailash.
    </p>
  );
}

function SearchSection() {
  const router = useRouter();
  const [locationText, setLocationText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState('');
  const lastIndex = useRef(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFocusedRef = useRef(false);
  const cycleRef = useRef(0);

  const suggestions = userInput.trim()
    ? areaProfiles.filter((a) =>
        a.name.toLowerCase().includes(userInput.toLowerCase())
      )
    : [];

  const handleSelect = (slug: string) => {
    setUserInput('');
    router.push(`/area/${slug}`);
  };

  const handleSearch = () => {
    if (!userInput.trim()) return;
    const match = areaProfiles.find((a) =>
      a.name.toLowerCase().includes(userInput.toLowerCase())
    );
    if (match) {
      handleSelect(match.slug);
    } else {
      router.push('/#explore');
    }
  };

  // Placeholder typewriter: runs ONLY while blurred. Focus kills the loop
  // instantly and clears text; blur restarts a fresh loop. This fixes the
  // glitch where typing continued behind input or never resumed after blur.
  useEffect(() => {
    isFocusedRef.current = isFocused;
    if (isFocused) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setLocationText('');
      return;
    }

    let cancelled = false;
    const myCycle = ++cycleRef.current;

    const schedule = (fn: () => void, ms: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!cancelled && myCycle === cycleRef.current) fn();
      }, ms);
    };

    const pickLocation = () => {
      let index = Math.floor(Math.random() * locations.length);
      if (locations.length > 1) {
        while (index === lastIndex.current) {
          index = Math.floor(Math.random() * locations.length);
        }
      }
      lastIndex.current = index;
      return locations[index];
    };

    const runCycle = () => {
      if (cancelled || myCycle !== cycleRef.current || isFocusedRef.current) return;
      const location = pickLocation();
      let i = 0;
      let deleting = false;

      const type = () => {
        if (cancelled || myCycle !== cycleRef.current || isFocusedRef.current) return;
        if (!deleting) {
          setLocationText(location.slice(0, i + 1));
          i++;
          if (i <= location.length) {
            schedule(type, 40 + Math.random() * 30);
          } else {
            schedule(() => { deleting = true; type(); }, 2000);
          }
        } else {
          setLocationText(location.slice(0, i));
          i--;
          if (i >= 0) {
            schedule(type, 20);
          } else {
            schedule(runCycle, 400);
          }
        }
      };

      type();
    };

    // Small delay so blur→placeholder doesn't flash mid-transition.
    schedule(runCycle, 250);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [isFocused]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[92%] xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mb-2.5 sm:mb-3">
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-1.5 sm:p-2 flex flex-col sm:flex-row items-stretch gap-1.5 sm:gap-2">
          <div className="relative flex-grow flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-xl min-w-0 border border-white/10">
            <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-white/70 shrink-0 relative z-10" />
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-white px-3 sm:px-5 pl-[42px] sm:pl-[52px] py-3.5 sm:py-4 text-[15px] sm:text-base z-20 caret-white placeholder:text-white/40"
            />
            {!userInput && !isFocused && (
              <span className="absolute left-[42px] sm:left-[52px] right-3 top-1/2 -translate-y-1/2 text-[15px] sm:text-base pointer-events-none z-10 whitespace-nowrap overflow-hidden text-ellipsis text-left">
                <span className="text-white/50">Search For </span>
                <span className="text-white">{locationText}</span>
                <span
                  className={`inline-block w-[2px] h-[18px] sm:h-5 bg-white/70 ml-[1px] align-middle ${
                    cursorVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </span>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-gold-accent hover:bg-white text-primary-navy px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-[15px] sm:text-base transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            Search
          </button>
        </div>
        {isFocused && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-xl p-2 max-h-[300px] overflow-y-auto z-50">
            {suggestions.map((area) => (
              <button
                key={area.slug}
                onMouseDown={() => handleSelect(area.slug)}
                className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg hover:bg-light-navy/60 transition-colors group"
              >
                <MapPin className="w-4 h-4 text-gold-accent shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-primary-navy group-hover:text-gold-accent transition-colors truncate">{area.name}</div>
                  <div className="text-xs text-secondary-text truncate">{area.tagline}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chips() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-5 max-w-full px-1">
      <button
        onClick={() => router.push('/circle-rates')}
        className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200"
      >
        <TrendingUp className="w-3.5 h-3.5" />
        Circle Rates
      </button>
      <button
        onClick={() => router.push('/list-your-property')}
        className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gold-accent hover:bg-gold-accent/90 border border-gold-accent text-primary-navy text-xs sm:text-sm font-semibold transition-all duration-200"
      >
        <Plus className="w-3.5 h-3.5" />
        List Your Property
      </button>
    </div>
  );
}

function Stats() {
  const stats = [
    { value: '50+', label: 'Years of Trust' },
    { value: '7', label: 'Residential Blocks' },
    { value: '14', label: 'Areas Mapped' },
    { value: '1,000+', label: 'Families Served' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-5 sm:gap-6 md:gap-10 pt-5 sm:pt-6 mt-1 border-t border-white/20 w-full max-w-[92%] xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-[26px] xs:text-[28px] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-gold-accent drop-shadow-lg">
            {stat.value}
          </div>
          <div className="text-[10px] sm:text-xs md:text-sm text-white/50 mt-1 uppercase tracking-wider font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
