"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, MapPin, FileText, Calendar, User, Building2, ShieldCheck, MapPinned, PenLine } from "lucide-react";

// Same-origin proxy routes (this portal now runs a server, so it hosts its
// own /api/property/* endpoints like the 110024 portal does).
const API_URL = '/api/property';

interface PropertyRecord {
  reg_no: string;
  reg_date: string;
  first_party: string;
  second_party: string;
  property_address: string;
  deed_type: string;
  property_type: string;
  sro_name: string;
}

export function PropertySearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [captchaUrl, setCaptchaUrl] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [captcha, setCaptcha] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [results, setResults] = useState<PropertyRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const captchaImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (query.trim().split(/\s+/).length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSuggesting(true);
      try {
        const res = await fetch(`${API_URL}/suggest?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) setSuggestions(data.results);
      } catch { /* ignore */ }
      setSuggesting(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const selectAddress = (addr: string) => {
    setSelectedAddress(addr);
    setQuery(addr);
    setShowSuggestions(false);
    setSuggestions([]);
    setCaptchaReady(false);
    setCaptchaUrl("");
    setSessionId("");
    setCaptcha("");
    setError("");
  };

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    setError("");
    setCaptchaReady(false);
    try {
      const res = await fetch(`${API_URL}/captcha?t=${Date.now()}`);
      const data = await res.json();
      if (data.success) {
        setSessionId(data.session_id);
        setCaptchaUrl(data.image_url);
        setCaptchaKey(prev => prev + 1);

        const img = new Image();
        img.src = data.image_url;
        img.onload = () => {
          setCaptchaReady(true);
          setCaptchaLoading(false);
        };
        img.onerror = () => {
          setError("Failed to load captcha image. Try again.");
          setCaptchaLoading(false);
        };
      } else {
        setError("Captcha service unavailable. Try again.");
        setCaptchaLoading(false);
      }
    } catch {
      setError("Failed to load captcha. Try again.");
      setCaptchaLoading(false);
    }
  };

  const refreshCaptcha = async () => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/captcha?t=${Date.now()}`);
      const data = await res.json();
      if (data.success) {
        setSessionId(data.session_id);
        setCaptchaUrl(data.image_url);
        setCaptchaKey(prev => prev + 1);
        setCaptcha("");
        const img = new Image();
        img.src = data.image_url;
        img.onload = () => setCaptchaReady(true);
      }
    } catch {
      setError("Failed to refresh captcha.");
    }
  };

  const handleSearch = async () => {
    if (!captcha.trim() || !selectedAddress || !sessionId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, address: selectedAddress, captcha: captcha.trim() }),
      });
      const data = await res.json();

      if (data.success && data.records && data.records.length > 0) {
        setResults(data.records);
        setShowResults(true);
      } else if (data.detail === "Invalid session" || data.error?.includes("session")) {
        setError("Session expired. Loading new captcha...");
        setCaptchaReady(false);
        await loadCaptcha();
        setCaptcha("");
        setError("Session refreshed. Enter new captcha and try again.");
      } else {
        setError("No records found or invalid captcha. Try again.");
        await refreshCaptcha();
        setCaptcha("");
      }
    } catch {
      setError("Search failed. Please try again.");
    }
    setLoading(false);
  };

  const resetSearch = () => {
    setQuery("");
    setSelectedAddress("");
    setCaptcha("");
    setResults([]);
    setShowResults(false);
    setError("");
    setCaptchaReady(false);
    setCaptchaUrl("");
    setSessionId("");
  };

  const filteredResults = results.filter(r => r.reg_no || r.first_party || r.second_party || r.property_address || r.deed_type);

  return (
    <div className="bg-white border-[3px] border-primary-navy min-h-[500px] flex flex-col relative">
      <div className="bg-primary-navy p-6 shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-gold-accent" />
          Search East of Kailash Records
        </h3>
        <p className="text-light-navy/60 text-sm mt-1">Find registration details of any property in Delhi</p>
      </div>

      <div className="p-6 flex-1 flex flex-col min-h-0">
        {!showResults ? (
          <div className="flex-1 flex flex-col min-h-0 gap-4">
            <div className="relative shrink-0">
              <label className="block text-sm font-semibold text-secondary-text mb-2">Enter Property Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); if (selectedAddress) { setSelectedAddress(""); setCaptchaReady(false); setCaptchaUrl(""); setSessionId(""); } }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
                  placeholder="e.g. Hauz Khas Village, New Delhi"
                  className="w-full px-4 py-3.5 pr-12 border border-border-color focus:border-gold-accent outline-none text-sm"
                />
                {suggesting ? (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-accent animate-spin" />
                ) : (
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-text/40" />
                )}
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-30 left-0 right-0 top-full mt-2 max-h-[280px] bg-white border border-border-color overflow-y-auto thin-scroll">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onMouseDown={() => selectAddress(s)}
                      className="w-full text-left px-5 py-4 hover:bg-gold-accent/10 text-[15px] text-secondary-text flex items-start gap-3 border-b border-border-color last:border-0 transition-colors leading-relaxed"
                    >
                      <MapPin className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedAddress && (
              <div className="flex items-center gap-2 px-4 py-3 bg-gold-accent/10 border border-gold-accent/20">
                <MapPin className="w-4 h-4 text-gold-accent shrink-0" />
                <span className="text-sm text-primary-navy font-medium">{selectedAddress}</span>
                <button onClick={resetSearch} className="ml-auto text-secondary-text/50 hover:text-red-500 text-xs font-medium">Clear</button>
              </div>
            )}

            {selectedAddress && !captchaReady && (
              <button
                onClick={loadCaptcha}
                disabled={captchaLoading}
                className="w-full bg-gold-accent hover:bg-primary-navy hover:text-white text-primary-navy font-bold py-4 transition-all flex items-center justify-center gap-2 disabled:opacity-60 text-base uppercase tracking-wider"
              >
                {captchaLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Loading Captcha...</>
                ) : (
                  <><ShieldCheck className="w-5 h-5" /> Load Captcha</>
                )}
              </button>
            )}

            {!selectedAddress && !captchaReady && (
              <div className="pt-4 pb-8">
                <p className="text-xs font-semibold text-secondary-text/60 uppercase tracking-wider mb-6 text-center">How It Works</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex-1 flex flex-col items-center gap-2.5">
                    <div className="w-14 h-14 bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center">
                      <MapPinned className="w-6 h-6 text-gold-accent" />
                    </div>
                    <span className="text-xs font-medium text-secondary-text text-center leading-tight">Enter Address</span>
                  </div>
                  <div className="w-8 h-px bg-border-color shrink-0" />
                  <div className="flex-1 flex flex-col items-center gap-2.5">
                    <div className="w-14 h-14 bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center">
                      <PenLine className="w-6 h-6 text-gold-accent" />
                    </div>
                    <span className="text-xs font-medium text-secondary-text text-center leading-tight">Solve Captcha</span>
                  </div>
                  <div className="w-8 h-px bg-border-color shrink-0" />
                  <div className="flex-1 flex flex-col items-center gap-2.5">
                    <div className="w-14 h-14 bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gold-accent" />
                    </div>
                    <span className="text-xs font-medium text-secondary-text text-center leading-tight">View Records</span>
                  </div>
                </div>
              </div>
            )}

            {captchaReady && captchaUrl && (
              <div className="p-5 bg-page-bg border border-border-color space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="shrink-0">
                    <img
                      key={captchaKey}
                      ref={captchaImgRef}
                      src={captchaUrl}
                      alt="Captcha"
                      className="w-56 h-12 border border-border-color"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Type code shown"
                      className="w-full h-12 px-4 border border-border-color focus:border-gold-accent outline-none text-sm tracking-widest font-medium text-primary-navy text-center placeholder:text-secondary-text/40 bg-white"
                      maxLength={10}
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleSearch}
              disabled={loading || !captcha.trim() || !captchaReady || !selectedAddress}
              className="w-full bg-gold-accent hover:bg-primary-navy hover:text-white text-primary-navy font-bold py-4 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-base uppercase tracking-wider"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? "Searching..." : "Search Property"}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-page-bg px-4 py-2.5 flex items-center gap-2 text-sm border border-border-color">
                <MapPin className="w-4 h-4 text-gold-accent shrink-0" />
                <span className="text-secondary-text font-medium truncate max-w-[240px]">{selectedAddress}</span>
                <span className="text-border-color">|</span>
                <span className="text-gold-accent font-bold">{filteredResults.length} record{filteredResults.length > 1 ? "s" : ""}</span>
              </div>
              <button onClick={resetSearch} className="text-sm text-gold-accent hover:underline font-semibold">New Search</button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {filteredResults.map((record, i) => (
                <div key={i} className="bg-white border-[3px] border-primary-navy p-5 hover:border-gold-accent hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    {record.reg_no && (
                      <span className="text-xs font-bold text-gold-accent uppercase tracking-wider">Reg. No: {record.reg_no}</span>
                    )}
                    {record.property_type && (
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        record.property_type === "Residential" ? "bg-primary-navy text-white" : "bg-gold-accent text-primary-navy"
                      }`}>
                        {record.property_type}
                      </span>
                    )}
                  </div>

                  {record.first_party && (
                    <h4 className="font-bold text-primary-navy text-base mb-3 leading-snug">{record.first_party}</h4>
                  )}

                  <div className="space-y-2 text-sm">
                    {record.second_party && (
                      <div className="flex gap-2">
                        <User className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                        <span className="text-secondary-text"><strong className="text-primary-navy">Buyer:</strong> {record.second_party}</span>
                      </div>
                    )}
                    {record.reg_date && (
                      <div className="flex gap-2">
                        <Calendar className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                        <span className="text-secondary-text"><strong className="text-primary-navy">Date:</strong> {record.reg_date}</span>
                      </div>
                    )}
                    {record.deed_type && (
                      <div className="flex gap-2">
                        <FileText className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                        <span className="text-secondary-text"><strong className="text-primary-navy">Deed:</strong> {record.deed_type}</span>
                      </div>
                    )}
                    {record.sro_name && (
                      <div className="flex gap-2">
                        <Building2 className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                        <span className="text-secondary-text"><strong className="text-primary-navy">SRO:</strong> {record.sro_name}</span>
                      </div>
                    )}
                    {record.property_address && (
                      <div className="flex gap-2">
                        <MapPin className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                        <span className="text-secondary-text">{record.property_address}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gold-accent/10 border border-gold-accent/20">
              <p className="text-xs text-secondary-text">
                <strong className="text-primary-navy">Disclaimer:</strong> Data sourced from Delhi Government eSearch portal. For official records, please verify at the Sub-Registrar Office.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm border border-red-100">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}