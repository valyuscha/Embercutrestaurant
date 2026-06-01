import { useEffect } from "react";
import { Link } from "react-router";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLanguage } from "../context/LanguageContext";
import { menuData } from "../i18n/menuData";

export function FullMenu() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const { t, lang } = useLanguage();
  const fm = t.fullMenu;

  const MENU = menuData[lang] ?? menuData.pl;

  return (
    <main style={{ background: "var(--background)", minHeight: "100vh", paddingTop: 96 }}>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "28px 16px 32px" : "48px 24px 56px", textAlign: "center" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40,
            fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--muted-foreground)", textDecoration: "none",
            transition: "color 0.18s ease",
          }}
          onMouseOver={e => (e.currentTarget.style.color = "var(--primary)")}
          onMouseOut={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
        >
          {fm.back}
        </Link>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 14 }}>
          EmberCut Restaurant · ul. Krzywa 17, Kraków
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 400, color: "var(--foreground)", lineHeight: 1.1, marginBottom: 20 }}>
          {fm.heading}
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 64, height: 1, background: "var(--primary)", opacity: 0.5 }} />
          <span style={{ color: "var(--primary)", fontSize: "16px" }}>✦</span>
          <div style={{ width: 64, height: 1, background: "var(--primary)", opacity: 0.5 }} />
        </div>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "var(--muted-foreground)", lineHeight: 1.7 }}>
          {fm.desc}
        </p>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        {MENU.map((section, si) => (
          <div key={section.category} style={{ marginBottom: si < MENU.length - 1 ? 64 : 0 }}>

            {/* Category heading */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, color: "var(--foreground)", lineHeight: 1 }}>
                  {section.subtitle}
                </h2>
              </div>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {/* 2-column grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 1, background: "var(--border)" }}>
              {section.items.map((item) => (
                <div
                  key={item.name}
                  style={{ background: "var(--card)", padding: isMobile ? "14px 16px" : "20px 24px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: item.desc ? 6 : 0 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.35, flex: 1 }}>
                      {item.name}
                      {"seasonal" in item && item.seasonal && (
                        <span style={{
                          display: "inline-block", verticalAlign: "middle", marginLeft: 8,
                          background: "var(--primary)", color: "var(--primary-foreground)",
                          fontFamily: "'Lato', sans-serif", fontSize: "8px", letterSpacing: "0.2em",
                          textTransform: "uppercase", fontWeight: 700, padding: "2px 6px", lineHeight: 1.4,
                        }}>
                          {t.menu.seasonal}
                        </span>
                      )}
                    </h3>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", fontWeight: 700, color: "var(--primary)", flexShrink: 0, marginTop: 2, whiteSpace: "nowrap" }}>
                      {item.price}
                    </span>
                  </div>
                  {item.desc && (
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "var(--muted-foreground)", lineHeight: 1.55, fontStyle: "normal" }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
              {!isMobile && section.items.length % 2 !== 0 && (
                <div style={{ background: "var(--card)" }} />
              )}
            </div>

          </div>
        ))}

        {/* Footer note */}
        <div style={{ textAlign: "center", marginTop: 56, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
          <span style={{ color: "var(--primary)", fontSize: "18px" }}>✦</span>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "var(--muted-foreground)", marginTop: 16, lineHeight: 1.7 }}>
            {fm.footer}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24 }}>
            <div style={{ width: 48, height: 1, background: "var(--primary)", opacity: 0.4 }} />
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--primary)" }}>
              EmberCut Restaurant · ul. Krzywa 17 · Kraków
            </p>
            <div style={{ width: 48, height: 1, background: "var(--primary)", opacity: 0.4 }} />
          </div>
        </div>
      </div>
    </main>
  );
}
