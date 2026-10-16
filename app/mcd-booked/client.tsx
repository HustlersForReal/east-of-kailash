"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, MapPin, User, Calendar, ChevronLeft, ChevronRight, ChevronDown, Building2, ShieldCheck, AlertTriangle, Phone } from "lucide-react";
import Link from "next/link";

const API_URL = "/api/mcd";

interface Zone {
  name: string;
  id: string;
}

interface PropertyResult {
  booking_id: string;
  owner_name: string;
  address: string;
  booking_date: string;
}

export default function MCDBookedPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [zoneId, setZoneId] = useState("");
  const [zoneName, setZoneName] = useState("");
  const [address, setAddress] = useState("");
  const [results, setResults] = useState<PropertyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [zonesLoading, setZonesLoading] = useState(true);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [zoneSearch, setZoneSearch] = useState("");
  const [filterText, setFilterText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const perPage = 10;

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await fetch(`${API_URL}/zones`);
        const data = await res.json();
        if (Array.isArray(data)) setZones(data);
      } catch {
        setError("Failed to load zones.");
      }
      setZonesLoading(false);
    };
    fetchZones();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setZoneSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [dropdownOpen]);

  const filteredZones = zones.filter(z => z.name.toLowerCase().includes(zoneSearch.toLowerCase()));
  const filteredResults = results.filter(r => {
    if (!filterText.trim()) return true;
    const q = filterText.toLowerCase();
    return (r.owner_name && r.owner_name.toLowerCase().includes(q)) ||
           (r.address && r.address.toLowerCase().includes(q)) ||
           (r.booking_id && r.booking_id.toLowerCase().includes(q)) ||
           (r.booking_date && r.booking_date.toLowerCase().includes(q));
  });
  const totalPages = Math.ceil(filteredResults.length / perPage);
  const pagedResults = filteredResults.slice((page - 1) * perPage, page * perPage);

  const selectZone = (z: Zone) => {
    setZoneId(z.id);
    setZoneName(z.name);
    setDropdownOpen(false);
    setZoneSearch("");
  };

  const handleSearch = async () => {
    if (!zoneId || !address.trim()) return;
    setLoading(true);
    setError("");
    setPage(1);
    try {
      const res = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zone_id: zoneId, address: address.trim(), property_type: "booked" }),
      });
      const data = await res.json();
      setResults(data.results || []);
      setSearched(true);
      if (!data.results || data.results.length === 0) {
        setError("No booked properties found for this address.");
      }
    } catch {
      setError("Search failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-primary-navy text-white pt-24 pb-10 sm:pb-16 md:pb-20 px-4 border-b-[6px] border-gold-accent text-center relative">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-white">
            Is Your Property Illegal In The Government Records?
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-light-navy/60 max-w-3xl mx-auto">
            Check the legal status of your existing or the property you are about to buy, so that you don&apos;t regret later!
          </p>
        </div>
      </section>

      <div className="px-4 md:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">

          {/* LEFT - Search & Results */}
          <div className="min-w-0 flex flex-col">
            <div className="bg-white border-[3px] border-primary-navy flex-1">
              <div className="p-4 sm:p-6 md:p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_auto] gap-3 sm:gap-4 items-end">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-text mb-2">Select Zone</label>
                    {zonesLoading ? (
                      <div className="h-11 sm:h-12 bg-page-bg flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin text-gold-accent" />
                      </div>
                    ) : (
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full h-11 sm:h-12 px-4 border border-border-color focus:border-gold-accent outline-none text-sm bg-white text-left flex items-center justify-between"
                        >
                          <span className={zoneName ? "text-primary-navy" : "text-secondary-text/60"}>
                            {zoneName || "Choose zone..."}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-secondary-text/60 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {dropdownOpen && (
                          <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-border-color">
                            <div className="p-2 border-b border-border-color">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/60" />
                                <input
                                  ref={searchInputRef}
                                  type="text"
                                  value={zoneSearch}
                                  onChange={(e) => setZoneSearch(e.target.value)}
                                  placeholder="Search zones..."
                                  className="w-full h-10 pl-9 pr-4 border border-border-color text-sm outline-none focus:border-gold-accent"
                                />
                              </div>
                            </div>
                            <div className="max-h-[240px] overflow-y-auto thin-scroll">
                              {filteredZones.length === 0 ? (
                                <div className="px-4 py-6 text-center text-sm text-secondary-text/60">No zones found</div>
                              ) : (
                                filteredZones.map((z) => (
                                  <button
                                    key={z.id}
                                    onClick={() => selectZone(z)}
                                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                                      z.id === zoneId ? "bg-gold-accent/10 text-primary-navy font-semibold" : "text-secondary-text hover:bg-page-bg"
                                    }`}
                                  >
                                    <Building2 className="w-4 h-4 text-gold-accent shrink-0" />
                                    {z.name}
                                  </button>
                                ))
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary-text mb-2">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="e.g. KARAWAL NAGAR"
                      className="w-full h-11 sm:h-12 px-4 border border-border-color focus:border-gold-accent outline-none text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSearch}
                    disabled={loading || !zoneId || !address.trim()}
                    className="h-11 sm:h-12 px-6 sm:px-8 bg-gold-accent hover:bg-primary-navy hover:text-white text-primary-navy font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    {loading ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 p-3 bg-red-50 text-red-600 text-sm border border-red-100">
                  {error}
                </div>
              )}

              {!searched && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-1 flex flex-col gap-4 sm:gap-5">
                  <div className="border border-border-color p-4 sm:p-5 bg-page-bg/50">
                    <p className="text-xs font-semibold text-secondary-text/60 uppercase tracking-wider mb-4 sm:mb-5">How to Check</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-gold-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary-navy mb-1">1. Select Zone</p>
                          <p className="text-xs text-secondary-text leading-relaxed">Choose the MCD zone where your property is located</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gold-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary-navy mb-1">2. Enter Address</p>
                          <p className="text-xs text-secondary-text leading-relaxed">Type the property address or locality name</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center shrink-0">
                          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gold-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-primary-navy mb-1">3. Get Results</p>
                          <p className="text-xs text-secondary-text leading-relaxed">View all booked properties matching your search</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border-color p-4 sm:p-5">
                    <p className="text-xs font-semibold text-secondary-text/60 uppercase tracking-wider mb-4">Why Check?</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-primary-navy">Before Buying Property</p>
                          <p className="text-xs text-secondary-text">Verify the property is not booked by MCD to avoid legal issues</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-primary-navy">Before Construction</p>
                          <p className="text-xs text-secondary-text">Check if any booking exists to prevent demolition or sealing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-primary-navy">Existing Property Owner</p>
                          <p className="text-xs text-secondary-text">Check your property status and start regularisation if needed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* The Solution: Regularisation moved here */}
                  <div className="border border-border-color p-4 sm:p-5">
                    <p className="text-xs font-semibold text-secondary-text/60 uppercase tracking-wider mb-4">The Solution: Regularisation</p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-50 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <p className="text-sm text-secondary-text leading-relaxed">
                          <strong className="text-primary-navy">Regularisation</strong> is the legal process to get a booked property cleared by MCD. Once regularised, the booking is removed and the property becomes legally clear.
                        </p>
                      </div>
                      <div className="bg-gold-accent/10 border border-gold-accent/20 p-4">
                        <p className="text-sm text-primary-navy font-medium leading-relaxed">
                          EastOfKailash.com handles the entire regularisation process end-to-end, from documentation, MCD coordination, to getting your property cleared.
                        </p>
                      </div>
                      <div className="text-sm text-secondary-text space-y-2">
                        <p className="font-semibold text-primary-navy">What we do:</p>
                        <ul className="space-y-1.5 ml-1">
                          <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span>Verify your property booking status</span></li>
                          <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span>Prepare all required documents</span></li>
                          <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span>File application with MCD</span></li>
                          <li className="flex items-start gap-2"><ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span>Follow up until booking is removed</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-navy p-4 text-center">
                    <p className="text-sm font-bold text-white mb-1">Need Help With Regularisation?</p>
                    <p className="text-xs text-light-navy/60 mb-3">Our experts handle the entire MCD booking clearance process for you.</p>
                    <a
                      href={`https://wa.me/919811110065?text=${encodeURIComponent("*Hello EastOfKailash.com, I need help with MCD regularisation for my property.*")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold-accent hover:bg-primary-navy hover:text-white text-primary-navy font-bold uppercase tracking-wider py-2.5 px-6 transition-all text-sm"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Talk To An Expert
                    </a>
                  </div>
                </div>
              )}

              {searched && results.length > 0 && (
                <div className="border-t border-border-color">
                  <div className="px-4 sm:px-6 md:px-8 py-3 bg-page-bg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-primary-navy">{results.length} booked propert{results.length > 1 ? "ies" : "y"} found</span>
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/60" />
                      <input
                        type="text"
                        value={filterText}
                        onChange={(e) => { setFilterText(e.target.value); setPage(1); }}
                        placeholder="Filter by name, address, ID..."
                        className="w-full h-9 pl-9 pr-4 border border-border-color text-sm outline-none focus:border-gold-accent"
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-border-color">
                    {pagedResults.length === 0 ? (
                      <div className="px-4 sm:px-6 py-8 text-center text-sm text-secondary-text/60">No results match your filter.</div>
                    ) : pagedResults.map((item, i) => (
                      <div key={item.booking_id || i} className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gold-accent/5 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            {item.booking_id && (
                              <span className="text-xs font-bold text-gold-accent uppercase tracking-wider block mb-1">ID: {item.booking_id}</span>
                            )}
                            {item.owner_name && (
                              <div className="flex items-center gap-2 mb-1">
                                <User className="w-4 h-4 text-gold-accent shrink-0" />
                                <span className="text-sm font-medium text-primary-navy">{item.owner_name}</span>
                              </div>
                            )}
                            {item.address && (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                                <span className="text-sm text-secondary-text">{item.address}</span>
                              </div>
                            )}
                          </div>
                          {item.booking_date && (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Calendar className="w-3.5 h-3.5 text-secondary-text/60" />
                              <span className="text-xs text-secondary-text">{item.booking_date}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-border-color flex items-center justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-1.5 sm:p-2 hover:bg-page-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-primary-navy" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => {
                          if (totalPages <= 5) return true;
                          if (page <= 3) return p <= 5;
                          if (page >= totalPages - 2) return p >= totalPages - 4;
                          return Math.abs(p - page) <= 2;
                        })
                        .map((p, idx, arr) => (
                          <span key={p} className="flex items-center">
                            {idx > 0 && arr[idx - 1] !== p - 1 && (
                              <span className="px-1 text-secondary-text/60 text-xs">...</span>
                            )}
                            <button
                              onClick={() => setPage(p)}
                              className={`w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm font-medium transition-colors ${
                                p === page ? "bg-primary-navy text-white" : "hover:bg-page-bg text-secondary-text"
                              }`}
                            >
                              {p}
                            </button>
                          </span>
                        ))}
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-1.5 sm:p-2 hover:bg-page-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-navy" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-gold-accent/10 border border-gold-accent/20">
              <p className="text-xs text-secondary-text">
                <strong className="text-primary-navy">Disclaimer:</strong> Data sourced from Municipal Corporation of Delhi. For official records, please verify at your local MCD office.
              </p>
            </div>
          </div>

          {/* RIGHT - Info Panel */}
          <div className="space-y-4 sm:space-y-6">
            {/* What are Booked Properties */}
            <div className="bg-white border-[3px] border-primary-navy overflow-hidden">
              <div className="bg-primary-navy p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-white">What Are Booked Properties?</h3>
              </div>
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-50 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      When MCD finds <strong className="text-primary-navy">illegal or unauthorized construction</strong> on a property, it officially flags it as <strong className="text-primary-navy">&quot;Booked&quot;</strong>. This means the property has a pending case with the Municipal Corporation of Delhi.
                    </p>
                  </div>
                </div>

                <div className="relative my-4">
                  <div className="border-2 border-red-500 border-dashed p-4 text-center bg-red-50/50">
                    <span className="text-red-500 font-black text-sm uppercase tracking-widest">BOOKED</span>
                    <p className="text-[10px] text-red-400 mt-1">MCD Flagged Property</p>
                  </div>
                </div>

                <div className="text-sm text-secondary-text space-y-2">
                  <p>A booked property can face:</p>
                  <ul className="space-y-1.5 ml-1">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1 shrink-0">-</span>
                      <span>Demolition or sealing by MCD</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1 shrink-0">-</span>
                      <span>Cannot be sold or transferred</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1 shrink-0">-</span>
                      <span>No new construction allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1 shrink-0">-</span>
                      <span>Property value drops significantly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Due Diligence */}
            <div className="bg-white border-[3px] border-primary-navy overflow-hidden">
              <div className="bg-primary-navy p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-white">We Secure Your Investment</h3>
              </div>
              <div className="p-4 sm:p-5 space-y-4">
                <p className="text-sm text-secondary-text leading-relaxed bg-gold-accent/10 border border-gold-accent/30 p-4">
                  For A Detailed Due Diligence Report To Safeguard Your Investment & Solution To Remove Your Property From The Blacklist Of Government – Reach Us Today!
                </p>
                <ul className="space-y-2">
                  {[
                    "30 Years Ownership Check",
                    "Fully Owned/Partially Owned",
                    "Loans/Debts",
                    "Courts Stay/Litigation",
                    "No Pending Dues From All Departments (Electricity, Water, Property Tax, etc.)",
                    "Government Records For Illegal Construction & Building Bye-Laws Violation",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-secondary-text">
                      <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/919811110065?text=${encodeURIComponent("*Hello EastOfKailash.com, I want a due diligence report for my property.*")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold-accent hover:bg-primary-navy hover:text-white text-primary-navy font-bold uppercase tracking-wider py-3 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Get Your Due Diligence Report
                </a>
              </div>
            </div>

            {/* Verified Info */}
            <div className="bg-white border-[3px] border-primary-navy p-4 sm:p-5">
              <h3 className="text-sm font-bold text-primary-navy mb-3">Verified Info Sources</h3>
              <div className="space-y-2 text-xs text-secondary-text">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span>MCD Official Database</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span>Delhi Revenue Department</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span>e-District Delhi Portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

