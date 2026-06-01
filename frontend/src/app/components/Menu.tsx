import { useState } from "react";
import { Link } from "react-router";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLanguage } from "../context/LanguageContext";

type CategoryKey = "starters" | "soups" | "mains" | "drinks";
const CATEGORY_KEYS: CategoryKey[] = ["starters", "soups", "mains", "drinks"];

export function Menu() {
  const [activeKey, setActiveKey] = useState<CategoryKey>("mains");
  const width = useWindowWidth();
  const isMobile = width < 768;
  const { t } = useLanguage();
  const m = t.menu;

  const items = (m.items as Record<CategoryKey, { name: string; desc: string; price: string; seasonal?: boolean }[]>)[activeKey];

  return (
    <section id="menu" className="py-16 px-6" style={{ background: "var(--secondary)" }}>
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 14 }}>
            {m.overline}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "var(--foreground)", marginBottom: 20 }}>
            {m.heading}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div style={{ width: 56, height: 1, background: "var(--primary)", opacity: 0.45 }} />
            <span style={{ color: "var(--primary)", fontSize: "15px", opacity: 0.7 }}>✦</span>
            <div style={{ width: 56, height: 1, background: "var(--primary)", opacity: 0.45 }} />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORY_KEYS.map((key) => {
            const isActive = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                style={{
                  fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.15em",
                  textTransform: "uppercase", padding: "10px 22px",
                  background: isActive ? "var(--primary)" : "transparent",
                  color: isActive ? "var(--primary-foreground)" : "var(--foreground)",
                  border: `1px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                  fontWeight: isActive ? 700 : 400, cursor: "pointer", transition: "all 0.18s",
                }}
              >
                {(m.categories as Record<CategoryKey, string>)[key]}
              </button>
            );
          })}
        </div>

        {/* Items grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 1, background: "var(--border)" }}>
          {items.map((item) => (
            <div key={item.name} style={{ padding: isMobile ? "16px 16px" : "24px 28px", background: "var(--card)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3, flex: 1 }}>
                  {item.name}
                  {item.seasonal && (
                    <span style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 8, background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "'Lato', sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, padding: "2px 6px", lineHeight: 1.4 }}>
                      {m.seasonal}
                    </span>
                  )}
                </h3>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", fontWeight: 700, color: "var(--primary)", flexShrink: 0, marginTop: 2 }}>{item.price}</span>
              </div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
          {!isMobile && items.length % 2 !== 0 && <div style={{ background: "var(--card)" }} />}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginTop: 36 }}>
          <p style={{ color: "var(--muted-foreground)", fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.08em" }}>
            {m.footer}
          </p>
          <Link
            to="/menu"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", border: "1px solid var(--primary)", color: "var(--primary)", fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.18s ease", background: "transparent" }}
            onMouseOver={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "var(--primary-foreground)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--primary)"; }}
          >
            {m.seeFullMenu}
          </Link>
        </div>
      </div>
    </section>
  );
}
