import { useWindowWidth } from "../hooks/useWindowWidth";
import { scrollToSection } from "./Nav";
import { useLanguage } from "../context/LanguageContext";

export function Offers() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const { t } = useLanguage();
  const o = t.offers;

  const scrollToReservation = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("#reservation");
  };

  return (
    <section id="offers" className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 14 }}>
            {o.overline}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "var(--foreground)", marginBottom: 20 }}>
            {o.heading}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div style={{ width: 56, height: 1, background: "var(--primary)", opacity: 0.45 }} />
            <span style={{ color: "var(--primary)", fontSize: "15px", opacity: 0.7 }}>✦</span>
            <div style={{ width: 56, height: 1, background: "var(--primary)", opacity: 0.45 }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
          {(o.items as { num: string; title: string; desc: string; cta: string }[]).map((item) => (
            <a
              key={item.num}
              href="#reservation"
              onClick={scrollToReservation}
              style={{ padding: isMobile ? "24px 20px" : "40px 32px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 16, transition: "border-color 0.18s ease", textDecoration: "none", cursor: "pointer" }}
              onMouseOver={e => (e.currentTarget.style.borderColor = "var(--primary)")}
              onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 400, color: "var(--primary)", opacity: 0.35, lineHeight: 1 }}>{item.num}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 500, color: "var(--foreground)", lineHeight: 1.3 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "17px", lineHeight: 1.75, color: "var(--muted-foreground)", flex: 1 }}>{item.desc}</p>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                {item.cta} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
