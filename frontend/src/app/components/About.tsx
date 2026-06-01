import { useLanguage } from "../context/LanguageContext";

export function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">

          {/* Image column */}
          <div className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img
                src="https://images.unsplash.com/photo-1560130934-590b85fc08e7?w=800&h=1000&fit=crop&auto=format"
                alt="EmberCut Restaurant — intimate dining corner with warm atmosphere"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 108, height: 108,
              background: "var(--primary)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              textAlign: "center", gap: 2,
            }}>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--primary-foreground)" }}>{a.sinceLabel}</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "34px", fontWeight: 400, lineHeight: 1, color: "var(--primary-foreground)" }}>25+</span>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--primary-foreground)" }}>{a.sinceYears}</span>
            </div>
            <div style={{ position: "absolute", top: -12, left: -12, width: 40, height: 40, borderTop: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }} />
          </div>

          {/* Text column */}
          <div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 16 }}>
              {a.overline}
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 3.8vw, 50px)", fontWeight: 400, color: "var(--foreground)", lineHeight: 1.2, marginBottom: 20 }}>
              {a.heading}<br />
              <em style={{ fontStyle: "italic", color: "var(--primary)" }}>{a.headingEm}</em>
            </h2>
            <div style={{ width: 64, height: 1, background: "var(--primary)", opacity: 0.65, marginBottom: 28 }} />

            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "19px", lineHeight: 1.85, color: "var(--foreground)", marginBottom: 20 }}>
              {a.p1}
            </p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", lineHeight: 1.85, color: "var(--muted-foreground)", marginBottom: 36 }}>
              {a.p2}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {(a.awards as { name: string; sub: string }[]).map((award) => (
                <div key={award.name + award.sub} style={{ border: "1px solid var(--border)", padding: "10px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "var(--primary)" }}>{award.name}</span>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{award.sub}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
