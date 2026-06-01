import { useEffect, useState } from "react";
import { scrollToSection } from "./Nav";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { t } = useLanguage();
  const h = t.hero;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=1920&h=1080&fit=crop&auto=format"
          alt="EmberCut Restaurant — elegant dining room with ambient lighting"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.55) 100%)"
        }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-primary opacity-70" />

      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 1.3s ease, transform 1.3s ease",
        }}
      >
        <p style={{
          fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.45em",
          textTransform: "uppercase", color: "#c9923f", marginBottom: "20px",
        }}>
          {h.tagline}
        </p>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 9vw, 100px)", fontWeight: 400, letterSpacing: "-0.01em", color: "#f2e6cc", lineHeight: 1.05, marginBottom: "8px" }}>
          Ember
        </h1>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 9vw, 100px)", fontWeight: 400, fontStyle: "italic", color: "#cdad2e", lineHeight: 1.05, marginBottom: "28px" }}>
          Cut
        </h1>

        <div className="flex items-center justify-center gap-5 mb-8">
          <div style={{ width: 64, height: 1, background: "#c9923f", opacity: 0.6 }} />
          <span style={{ color: "#c9923f", fontSize: "16px" }}>✦</span>
          <div style={{ width: 64, height: 1, background: "#c9923f", opacity: 0.6 }} />
        </div>

        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: "21px", lineHeight: 1.75, fontStyle: "italic",
          color: "#e8e0d0", maxWidth: 520, margin: "0 auto 40px",
        }}>
          {h.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("#reservation")}
            style={{
              fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 700,
              background: "#c9923f", color: "#110d07", border: "none",
              padding: "16px 36px", cursor: "pointer", transition: "opacity 0.18s ease",
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >
            {h.bookTable}
          </button>
          <button
            onClick={() => scrollToSection("#menu")}
            style={{
              fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.22em",
              textTransform: "uppercase", background: "transparent", color: "#e0d0b0",
              border: "1px solid rgba(224,208,176,0.45)", padding: "16px 36px",
              cursor: "pointer", transition: "all 0.18s ease",
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "#c9923f"; e.currentTarget.style.color = "#c9923f"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(224,208,176,0.45)"; e.currentTarget.style.color = "#e0d0b0"; }}
          >
            {h.seeMenu}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.55 }}>
        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c4a97a" }}>{h.scroll}</span>
        <div style={{ width: 1, height: 48, background: "rgba(196,169,122,0.3)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "40%", background: "#c9923f", animation: "scrollLine 2s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`@keyframes scrollLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }`}</style>
    </section>
  );
}
