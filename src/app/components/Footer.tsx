import { useWindowWidth } from "../hooks/useWindowWidth";
import { scrollToSection } from "./Nav";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px 40px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: isMobile ? 24 : 48, marginBottom: 56 }}>

          <div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 4 }}>Premium Steakhouse</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", fontWeight: 500, color: "var(--foreground)", marginBottom: 14 }}>EmberCut</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "var(--muted-foreground)" }}>{f.brandDesc}</p>
          </div>

          <div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 20 }}>{f.navHeading}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(f.links as [string, string][]).map(([label, href]) => (
                <button key={href} onClick={() => scrollToSection(href)} style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", transition: "color 0.18s ease", padding: 0 }}
                  onMouseOver={e => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseOut={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
                >{label}</button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 20 }}>{f.contactHeading}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { text: "ul. Krzyża 17, 31-022 Kraków", href: null },
                { text: "+48 800 931 311", href: "tel:+48800931311" },
              ].map((c) =>
                c.href ? (
                  <a key={c.text} href={c.href} style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "var(--muted-foreground)", textDecoration: "none", transition: "color 0.18s ease" }}
                    onMouseOver={e => (e.currentTarget.style.color = "var(--primary)")}
                    onMouseOut={e => (e.currentTarget.style.color = "var(--muted-foreground)")}
                  >{c.text}</a>
                ) : (
                  <p key={c.text} style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", color: "var(--muted-foreground)" }}>{c.text}</p>
                )
              )}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 28, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", letterSpacing: "0.05em" }}>{f.copyright}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 1, background: "var(--primary)", opacity: 0.45 }} />
            <span style={{ color: "var(--primary)", fontSize: "13px" }}>✦</span>
            <div style={{ width: 28, height: 1, background: "var(--primary)", opacity: 0.45 }} />
          </div>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", letterSpacing: "0.05em" }}>{f.location}</p>
        </div>
      </div>
    </footer>
  );
}
