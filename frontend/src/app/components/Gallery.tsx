import { useState, useRef, useCallback } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLanguage } from "../context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

// flex-basis % resolves against the container's CONTENT width (clientWidth minus padding).
// With paddingLeft=P% and paddingRight=P%, content width = W*(1-2P).
// So actual slide width = W*(1-2P)*flexBasis.
// Correct scrollLeft to centre slide i:
//   left_i = paddingLeft + i*(slideW+gap) + slideW/2 - W/2
//          = i*(slideW+gap) - ((W-slideW)/2 - paddingLeft)
//          = i*(slideW+gap) - centerOffset
function computeCarouselMetrics(el: HTMLDivElement, isMobile: boolean) {
  const W = el.clientWidth;
  const paddingPct = isMobile ? 0.06 : 0.14;
  const flexBasis  = isMobile ? 0.88 : 0.72;
  const slideW     = W * (1 - 2 * paddingPct) * flexBasis;
  const gap        = 12;
  const centerOffset = (W - slideW) / 2 - W * paddingPct;
  return { slideW, gap, centerOffset };
}

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
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isCarousel = isMobile || isTablet;
  const { t } = useLanguage();
  const g = t.gallery;
  const captions = g.captions as unknown as string[];

  const scrollToSlide = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const { slideW, gap, centerOffset } = computeCarouselMetrics(el, isMobile);
    const left = Math.max(0, index * (slideW + gap) - centerOffset);
    isScrolling.current = true;
    el.scrollTo({ left, behavior: "smooth" });
    setActiveSlide(index);
    setTimeout(() => { isScrolling.current = false; }, 600);
  }, [isMobile]);

  const handleScroll = useCallback(() => {
    if (isScrolling.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const { slideW, gap, centerOffset } = computeCarouselMetrics(el, isMobile);
    const index = Math.round((el.scrollLeft + centerOffset) / (slideW + gap));
    setActiveSlide(Math.min(Math.max(index, 0), IMAGE_SRCS.length - 1));
  }, [isMobile]);

  const prev = () => scrollToSlide(Math.max(activeSlide - 1, 0));
  const next = () => scrollToSlide(Math.min(activeSlide + 1, IMAGE_SRCS.length - 1));

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

        {isCarousel ? (
          /* ── Carousel (mobile + tablet) ── */
          <div style={{ position: "relative" }}>
            {/* Arrows */}
            {activeSlide > 0 && (
              <button
                onClick={prev}
                aria-label="Previous"
                style={{
                  position: "absolute", left: isMobile ? 4 : 12, top: "50%", transform: "translateY(-50%)",
                  zIndex: 10, width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(17,13,7,0.72)", border: "1px solid rgba(201,146,63,0.4)",
                  color: "#c9923f", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(4px)", transition: "background 0.2s",
                }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {activeSlide < IMAGE_SRCS.length - 1 && (
              <button
                onClick={next}
                aria-label="Next"
                style={{
                  position: "absolute", right: isMobile ? 4 : 12, top: "50%", transform: "translateY(-50%)",
                  zIndex: 10, width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(17,13,7,0.72)", border: "1px solid rgba(201,146,63,0.4)",
                  color: "#c9923f", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(4px)", transition: "background 0.2s",
                }}
              >
                <ChevronRight size={20} />
              </button>
            )}

            {/* Scroll container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              style={{
                display: "flex",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                gap: 12,
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                paddingLeft: isMobile ? "6%" : "14%",
                paddingRight: isMobile ? "6%" : "14%",
              }}
            >
              {IMAGE_SRCS.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(i)}
                  style={{
                    flex: `0 0 ${isMobile ? "88%" : "72%"}`,
                    scrollSnapAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                    transform: activeSlide === i ? "scale(1)" : "scale(0.96)",
                    opacity: activeSlide === i ? 1 : 0.7,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(17,13,7,0.75) 0%, transparent 55%)",
                    display: "flex", alignItems: "flex-end", padding: 20,
                  }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontStyle: "italic", color: "#f2e6cc" }}>
                      {captions[i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 24 }}>
              {IMAGE_SRCS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: 8,
                    height: 8,
                    background: activeSlide === i ? "var(--primary)" : "var(--border)",
                    border: "none", cursor: "pointer",
                    borderRadius: "50%",
                    transition: "background 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── Masonry grid (desktop) ── */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "auto", gap: 10 }}>
            {IMAGE_SRCS.map((img, i) => (
              <div
                key={i}
                style={{
                  gridRow: i === 0 ? "span 2" : "span 1",
                  position: "relative", overflow: "hidden", cursor: "pointer",
                  aspectRatio: i !== 0 ? "4/3" : undefined,
                  minHeight: i === 0 ? 400 : undefined,
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
        )}
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

      <style>{`
        .group:hover img { transform: scale(1.05); }
        .group-hover\\:opacity-100:is(.group:hover *) { opacity: 1 !important; }
        .group-hover\\:scale-105:is(.group:hover *) { transform: scale(1.05); }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
