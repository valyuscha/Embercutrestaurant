import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLanguage } from "../context/LanguageContext";

export function Location() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const { t } = useLanguage();
  const l = t.location;

  return (
    <section id="location" className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 56, alignItems: "start" }}>

          {/* Info */}
          <div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 16 }}>
              {l.overline}
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 3.8vw, 48px)", fontWeight: 400, color: "var(--foreground)", lineHeight: 1.2, marginBottom: 20 }}>
              {l.heading}<br />
              <em style={{ fontStyle: "italic", color: "var(--primary)" }}>{l.headingEm}</em>
            </h2>
            <div style={{ width: 64, height: 1, background: "var(--primary)", opacity: 0.65, marginBottom: 32 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 36 }}>
              {(l.blocks as { label: string; lines: string[] }[]).map((block) => (
                <div key={block.label} style={{ display: "flex", gap: 18 }}>
                  <div style={{ width: 3, alignSelf: "stretch", background: "var(--primary)", opacity: 0.5 }} />
                  <div>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--muted-foreground)", display: "block", marginBottom: 5 }}>
                      {block.label}
                    </span>
                    {block.lines.map((line) => (
                      <p key={line} style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", color: "var(--foreground)", lineHeight: 1.7 }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://maps.google.com/?q=Świętego+Krzyża+17,+31-023+Kraków"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 24px", border: "1px solid var(--primary)", color: "var(--primary)",
                fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.18em",
                textTransform: "uppercase", textDecoration: "none", transition: "all 0.18s ease", background: "transparent",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "var(--primary-foreground)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--primary)"; }}
            >
              {l.mapsBtn}
            </a>
          </div>

          {/* Restaurant photo with address overlay */}
          <div style={{ position: "relative", minHeight: isMobile ? 280 : 460, overflow: "hidden" }}>
            <img
              src="https://images.pexels.com/photos/32804621/pexels-photo-32804621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="EmberCut Restaurant — wejście, Świętego Krzyża 17, Kraków"
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: isMobile ? 280 : 460, display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.12) 100%)",
              display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 36,
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 44, height: 44, border: "2px solid #c9923f", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 12px", background: "rgba(0,0,0,0.5)",
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#c9923f">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 3vw, 28px)", color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.9)", marginBottom: 6 }}>Świętego Krzyża 17</p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.32em", color: "#c9923f", textShadow: "0 2px 8px rgba(0,0,0,1)", textTransform: "uppercase" }}>Kraków, Polska</p>
              </div>
            </div>
            <div style={{ position: "absolute", top: 0, right: 0, width: 28, height: 28, borderTop: "2px solid #c9923f", borderRight: "2px solid #c9923f", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 28, height: 28, borderBottom: "2px solid #c9923f", borderLeft: "2px solid #c9923f", pointerEvents: "none" }} />
          </div>

        </div>
      </div>
    </section>
  );
}
