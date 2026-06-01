import { useState } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLanguage } from "../context/LanguageContext";

const IMAGE_SRCS = [
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=1100&fit=crop&auto=format", alt: "EmberCut Restaurant — elegant dining room" },
  { src: "https://images.unsplash.com/photo-1759382904778-6994716b1aa1?w=800&h=540&fit=crop&auto=format", alt: "Steaks cooking over open flames on a charcoal grill" },
  { src: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=800&h=540&fit=crop&auto=format", alt: "Medium rare sliced steak served on a white ceramic plate" },
  { src: "https://images.unsplash.com/photo-1706650616334-97875fae8521?w=800&h=540&fit=crop&auto=format", alt: "Steak with asparagus and a glass of wine — gourmet pairing" },
  { src: "https://images.unsplash.com/photo-1469234496837-d0101f54be3e?w=800&h=540&fit=crop&auto=format", alt: "Wine glasses on a table by the window" },
  { src: "https://images.unsplash.com/photo-1628610698415-81371ab387e9?w=800&h=540&fit=crop&auto=format", alt: "Sliced premium meat served on a black pan" },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const { t } = useLanguage();
  const g = t.gallery;
  const captions = g.captions as unknown as string[];

  return (
    <section id="gallery" className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 14 }}>
            {g.overline}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "var(--foreground)" }}>
            {g.heading}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gridTemplateRows: "auto", gap: 10 }}>
          {IMAGE_SRCS.map((img, i) => (
            <div
              key={i}
              style={{
                gridRow: (!isMobile && i === 0) ? "span 2" : "span 1",
                position: "relative", overflow: "hidden", cursor: "pointer",
                aspectRatio: (isMobile || i !== 0) ? "4/3" : undefined,
                minHeight: (!isMobile && i === 0) ? 400 : undefined,
              }}
              className="group"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease", display: "block" }}
                className="group-hover:scale-105"
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(17,13,7,0.78) 0%, transparent 55%)",
                opacity: 0, transition: "opacity 0.3s",
                display: "flex", alignItems: "flex-end", padding: 20,
              }}
                className="group-hover:opacity-100"
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontStyle: "italic", color: "#f2e6cc" }}>
                  {captions[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(17,13,7,0.96)", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? 12 : 24 }}
          onClick={() => setLightbox(null)}
        >
          <div style={{ position: "relative", maxWidth: 900, width: "100%" }} onClick={(e) => e.stopPropagation()}>
            <img
              src={IMAGE_SRCS[lightbox].src.replace("w=800", "w=1400")}
              alt={IMAGE_SRCS[lightbox].alt}
              style={{ width: "100%", objectFit: "contain", maxHeight: "80vh" }}
            />
            <p style={{ textAlign: "center", marginTop: 16, fontFamily: "'Playfair Display', serif", fontSize: "18px", fontStyle: "italic", color: "#c4a97a" }}>
              {captions[lightbox]}
            </p>
            <button
              style={{ position: "absolute", top: -40, right: 0, background: "none", border: "none", color: "#c4a97a", fontSize: "22px", cursor: "pointer" }}
              onClick={() => setLightbox(null)}
            >✕</button>
          </div>
        </div>
      )}

      <style>{`.group:hover img { transform: scale(1.05); } .group-hover\\:opacity-100:is(.group:hover *) { opacity: 1 !important; } .group-hover\\:scale-105:is(.group:hover *) { transform: scale(1.05); }`}</style>
    </section>
  );
}
