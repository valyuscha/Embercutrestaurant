import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number) {
  const dow = new Date(year, month, 1).getDay();
  return (dow + 6) % 7;
}

interface Props {
  value: string;
  onChange: (val: string) => void;
  style?: React.CSSProperties;
  required?: boolean;
  name?: string;
}

export function DatePicker({ value, onChange, style, required, name }: Props) {
  const { t } = useLanguage();
  const MONTHS = t.datepicker.months as unknown as string[];
  const DAYS = t.datepicker.days as unknown as string[];
  const today = new Date();
  const parsed = value ? new Date(value + "T00:00:00") : null;

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(parsed ? parsed.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed ? parsed.getMonth() : today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const displayValue = parsed
    ? `${String(parsed.getDate()).padStart(2, "0")}.${String(parsed.getMonth() + 1).padStart(2, "0")}.${parsed.getFullYear()}`
    : "";

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = firstDayOfMonth(viewYear, viewMonth);

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isSelected = (day: number) =>
    parsed && parsed.getFullYear() === viewYear && parsed.getMonth() === viewMonth && parsed.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const now = new Date(); now.setHours(0, 0, 0, 0);
    return d < now;
  };

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <input type="hidden" name={name} value={value} required={required} />

      <div
        onClick={() => setOpen(o => !o)}
        style={{
          ...style,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", userSelect: "none",
          color: displayValue ? "var(--foreground)" : "var(--muted-foreground)",
        }}
      >
        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px" }}>
          {displayValue || t.datepicker.placeholder}
        </span>
        <CalendarIcon />
      </div>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 300,
          background: "var(--card)", border: "1px solid var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)", width: 284, padding: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <NavBtn onClick={prevMonth} dir="prev" />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "var(--foreground)", fontWeight: 400 }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <NavBtn onClick={nextMonth} dir="next" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", padding: "4px 0" }}>
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const selected = !!isSelected(day);
              const past = isPast(day);
              const todayMark = isToday(day);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={past}
                  onClick={() => !past && selectDate(day)}
                  style={{
                    fontFamily: "'Lato', sans-serif", fontSize: "13px",
                    padding: "6px 0", textAlign: "center", border: "none",
                    cursor: past ? "default" : "pointer",
                    background: selected ? "var(--primary)" : "transparent",
                    color: selected ? "var(--primary-foreground)" : past ? "var(--muted-foreground)" : "var(--foreground)",
                    opacity: past ? 0.35 : 1,
                    outline: todayMark && !selected ? "1px solid var(--primary)" : "none",
                    outlineOffset: "-1px",
                    transition: "background 0.15s ease",
                  }}
                  onMouseOver={e => { if (!past && !selected) e.currentTarget.style.background = "var(--secondary)"; }}
                  onMouseOut={e => { if (!selected) e.currentTarget.style.background = "transparent"; }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
      <rect x="1" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="5" cy="10.5" r="0.8" fill="currentColor" />
      <circle cx="8" cy="10.5" r="0.8" fill="currentColor" />
      <circle cx="11" cy="10.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function NavBtn({ onClick, dir }: { onClick: () => void; dir: "prev" | "next" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--foreground)", padding: "4px 8px", opacity: 0.7, transition: "opacity 0.15s" }}
      onMouseOver={e => (e.currentTarget.style.opacity = "1")}
      onMouseOut={e => (e.currentTarget.style.opacity = "0.7")}
    >
      {dir === "prev" ? "‹" : "›"}
    </button>
  );
}
