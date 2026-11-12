import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  PHONE_COUNTRIES,
  DEFAULT_PHONE_COUNTRY,
  type PhoneCountry,
} from "@/lib/phoneCountries";

type Props = {
  value: PhoneCountry;
  onChange: (country: PhoneCountry) => void;
};

export default function PhoneCountrySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 40);
    }
  }, [open]);

  const filtered = PHONE_COUNTRIES.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dial.includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative flex-shrink-0" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="h-full flex items-center gap-1.5 px-3 py-3 rounded-l-lg text-sm transition-colors duration-150"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRight: "none",
          color: "rgba(237,233,227,0.85)",
          minWidth: "108px",
        }}
      >
        <span className="text-base leading-none" aria-hidden="true">{value.flag}</span>
        <span className="font-data text-xs tracking-tight">{value.dial}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/35 ml-auto transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 z-50 rounded-xl overflow-hidden w-[280px] sm:w-[320px]"
          style={{
            background: "rgba(10,14,26,0.98)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
          }}
          role="listbox"
        >
          <div
            className="flex items-center gap-2 px-3 py-2.5 border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <Search className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pays ou indicatif…"
              className="w-full bg-transparent text-sm text-white/80 placeholder-white/25 outline-none"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-white/30 text-xs">Aucun résultat</li>
            )}
            {filtered.map((c) => {
              const selected = c.code === value.code && c.dial === value.dial;
              return (
                <li key={`${c.code}-${c.dial}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(c);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-100"
                    style={{
                      background: selected ? "rgba(201,169,110,0.1)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = selected
                        ? "rgba(201,169,110,0.1)"
                        : "transparent";
                    }}
                  >
                    <span className="text-lg leading-none w-6 text-center" aria-hidden="true">
                      {c.flag}
                    </span>
                    <span className="flex-1 text-sm text-white/75 truncate">{c.name}</span>
                    <span
                      className="font-data text-xs"
                      style={{ color: selected ? "#C9A96E" : "rgba(237,233,227,0.4)" }}
                    >
                      {c.dial}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export { DEFAULT_PHONE_COUNTRY };
