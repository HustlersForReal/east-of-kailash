'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building2, TrendingUp } from 'lucide-react';
import { areaProfiles } from '@/lib/data';

const locations = [
  'Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F', 'Block G',
  'DDA Flats', 'Schools', 'Hospitals', 'Nursing Home',
  'Community Centre', 'Cinema Hall',
];

const quickFilters = [
  { label: 'DDA Flats', icon: Building2, slug: '/area/dda-flats' },
  { label: 'Block A', icon: MapPin, slug: '/area/block-a' },
  { label: 'Community Centre', icon: TrendingUp, slug: '/area/community-centre-1' },
  { label: 'Commercial', icon: TrendingUp, slug: null },
];

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[500px] h-[calc(100svh-5rem)]">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center">
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-primary-navy/30" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-10 lg:px-8 lg:py-8">
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

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-3 sm:mb-4 lg:mb-5 flex-wrap">
      {chars.map((c, i) =>
        c === ' ' ? (
          <div key={i} className="w-2 sm:w-3" />
        ) : (
          <div
            key={i}
            className={`w-7 h-10 sm:w-9 sm:h-12 md:w-12 md:h-16 flex items-center justify-center rounded-md backdrop-blur-md border transition-all duration-300 ${
              revealed[i]
                ? 'bg-white/10 border-gold-accent/40 shadow-lg shadow-gold-accent/10'
                : 'bg-white/5 border-white/15'
            }`}
          >
            <span className={`text-lg sm:text-2xl md:text-4xl font-bold tabular-nums transition-colors duration-300 ${
              revealed[i] ? 'text-gold-accent' : 'text-white/60'
            }`}>
              {letters[i]}
            </span>
          </div>
        )
      )}
    </div>
  );
}

function Headline() {
  return (
    <h1 className="text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 leading-[1.1] tracking-tight">
      PRESTIGE HAS AN ADDRESS,
      <br />
      <span className="text-gold-accent">IT&apos;S EAST OF KAILASH</span>
    </h1>
  );
}

function Subtitle() {
  return (
    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-[90%] sm:max-w-2xl mx-auto mb-5 sm:mb-7 lg:mb-8 leading-relaxed">
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

  const getRandomLocation = () => {
    let index;
    do {
      index = Math.floor(Math.random() * locations.length);
    } while (index === lastIndex.current);
    lastIndex.current = index;
    return locations[index];
  };

  useEffect(() => {
    if (isFocused) return;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const run = () => {
      const location = getRandomLocation();
      let i = 0;
      let deleting = false;

      const type = () => {
        if (cancelled) return;
        if (!deleting) {
          setLocationText(location.slice(0, i + 1));
          i++;
          if (i <= location.length) {
            timeout = setTimeout(type, 40 + Math.random() * 30);
          } else {
            timeout = setTimeout(() => { deleting = true; type(); }, 2000);
          }
        } else {
          setLocationText(location.slice(0, i));
          i--;
          if (i >= 0) {
            timeout = setTimeout(type, 20);
          } else {
            timeout = setTimeout(run, 300);
          }
        }
      };

      type();
    };

    run();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [isFocused]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[92%] xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mb-3 lg:mb-4">
      <div className="relative">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] p-1.5 sm:p-2 flex flex-col sm:flex-row items-stretch gap-1.5 sm:gap-2">
          <div className="relative flex-grow flex items-center gap-2 sm:gap-3 bg-light-navy/60 px-3 sm:px-5 py-3 sm:py-4 rounded-xl min-w-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-text shrink-0 relative z-10" />
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-primary-navy px-3 sm:px-5 pl-[40px] sm:pl-[52px] py-3 sm:py-4 text-sm sm:text-base z-20 caret-primary-navy"
            />
            {!userInput && !isFocused && (
              <span className="absolute left-[40px] sm:left-[52px] right-3 top-1/2 -translate-y-1/2 text-sm sm:text-base pointer-events-none z-10 whitespace-nowrap overflow-hidden text-ellipsis text-left">
                <span className="text-secondary-text/60">Search For </span>
                <span className="text-primary-navy">{locationText}</span>
                <span
                  className={`inline-block w-[2px] h-4 sm:h-5 bg-primary-navy/70 ml-[1px] align-middle ${
                    cursorVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </span>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary-navy hover:bg-gold-accent text-white px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg w-full sm:w-auto"
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

  const handleClick = (filter: (typeof quickFilters)[number]) => {
    if (filter.slug) {
      router.push(filter.slug);
    } else {
      document.getElementById('featured-properties')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 lg:mb-7 max-w-full px-1">
      {quickFilters.map((filter) => (
        <button
          key={filter.label}
          onClick={() => handleClick(filter)}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white/70 hover:text-white text-[11px] sm:text-sm font-medium transition-all duration-200"
        >
          <filter.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          {filter.label}
        </button>
      ))}
      <span className="text-white/20 hidden sm:inline">|</span>
      <button
        onClick={() => document.getElementById('featured-properties')?.scrollIntoView({ behavior: 'smooth' })}
        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white/70 hover:text-white text-[11px] sm:text-sm font-medium transition-all duration-200"
      >
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
          <div className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-gold-accent drop-shadow-lg">
            {stat.value}
          </div>
          <div className="text-[9px] sm:text-xs md:text-sm text-white/50 mt-1 uppercase tracking-wider font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
