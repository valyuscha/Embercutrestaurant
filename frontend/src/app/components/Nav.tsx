import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLanguage } from "../context/LanguageContext";
import type { Lang } from "../i18n/translations";

export function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const nav = document.querySelector("nav");
  const offset = nav ? nav.getBoundingClientRect().height : 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

const LANGS: { code: Lang; label: string }[] = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hasHero = isHome;
  const isMobile = useWindowWidth() < 960;
  const { t, lang, setLang } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.menu, href: "/menu" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.offers, href: "#offers" },
    { label: t.nav.location, href: "#location" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href.startsWith("#")) {
      if (!isHome) {
        navigate("/");
        setTimeout(() => scrollToSection(href), 100);
      } else {
        scrollToSection(href);
      }
    }
  };

  const overHero = hasHero && !scrolled;
  const linkColor = overHero ? "#ffffff" : "var(--foreground)";
  const logoSubColor = overHero ? "#ffffff" : "var(--foreground)";
  const accentColor = overHero ? "#e8c97a" : "var(--primary)";
  const textShadow = overHero ? "0 1px 8px rgba(0,0,0,0.7)" : "none";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.4s, border-bottom 0.4s, backdrop-filter 0.4s",
      background: overHero ? "transparent" : "var(--background)",
      borderBottom: overHero ? "none" : "1px solid var(--border)",
      backdropFilter: overHero ? "none" : "blur(14px)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="#hero" onClick={(e) => handleLink(e, "#hero")} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: accentColor, textShadow }}>
            Premium Steakhouse
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, color: logoSubColor, lineHeight: 1, transition: "color 0.3s", textShadow }}>
            EmberCut
          </span>
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  if (l.href.startsWith("/")) {
                    e.preventDefault();
                    setMenuOpen(false);
                    navigate(l.href);
                  } else {
                    handleLink(e, l.href);
                  }
                }}
                style={{
                  fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.14em",
                  textTransform: "uppercase", color: linkColor, textDecoration: "none",
                  transition: "color 0.18s ease", textShadow,
                }}
                onMouseOver={e => (e.currentTarget.style.color = accentColor)}
                onMouseOut={e => (e.currentTarget.style.color = linkColor)}
              >
                {l.label}
              </a>
            ))}

            {/* Language switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {LANGS.map((l, i) => (
                <span key={l.code} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {i > 0 && <span style={{ color: accentColor, opacity: 0.4, fontSize: "10px" }}>|</span>}
                  <button
                    onClick={() => setLang(l.code)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.12em",
                      color: lang === l.code ? accentColor : linkColor,
                      opacity: lang === l.code ? 1 : 0.55,
                      padding: "2px 0",
                      transition: "color 0.18s ease, opacity 0.18s ease",
                      textShadow,
                    }}
                    onMouseOver={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = accentColor; }}
                    onMouseOut={e => { e.currentTarget.style.opacity = lang === l.code ? "1" : "0.55"; e.currentTarget.style.color = lang === l.code ? accentColor : linkColor; }}
                  >
                    {l.label}
                  </button>
                </span>
              ))}
            </div>

            <a
              href="#reservation"
              onClick={(e) => handleLink(e, "#reservation")}
              style={{
                fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.18em",
                textTransform: "uppercase", padding: "10px 20px",
                border: `1px solid ${accentColor}`, color: accentColor,
                textDecoration: "none", background: "transparent", transition: "all 0.18s ease", textShadow,
              }}
              onMouseOver={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = "#110d07"; e.currentTarget.style.borderColor = accentColor; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accentColor; e.currentTarget.style.borderColor = accentColor; }}
            >
              {t.nav.reservation}
            </a>
          </div>
        )}

        {/* Mobile: language switcher + hamburger */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Mobile language switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {LANGS.map((l, i) => (
                <span key={l.code} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {i > 0 && <span style={{ color: accentColor, opacity: 0.4, fontSize: "10px" }}>|</span>}
                  <button
                    onClick={() => setLang(l.code)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.1em",
                      color: lang === l.code ? accentColor : (overHero ? "#f0e4cc" : "var(--foreground)"),
                      opacity: lang === l.code ? 1 : 0.55,
                      padding: "2px 0",
                    }}
                  >
                    {l.label}
                  </button>
                </span>
              ))}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: 24, height: 2,
                  background: overHero ? "#f0e4cc" : "var(--foreground)",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translateY(8px)"
                    : i === 2 ? "rotate(-45deg) translateY(-8px)" : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div style={{
          overflow: "hidden", maxHeight: menuOpen ? 400 : 0,
          transition: "max-height 0.3s ease",
          background: "var(--background)",
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        }}>
          <div style={{ padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => {
                if (l.href.startsWith("/")) { e.preventDefault(); setMenuOpen(false); navigate(l.href); }
                else handleLink(e, l.href);
              }}
                style={{
                  fontFamily: "'Lato', sans-serif", fontSize: "13px", letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "var(--foreground)",
                  textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--border)",
                }}
              >
                {l.label}
              </a>
            ))}
            <a href="#reservation" onClick={(e) => handleLink(e, "#reservation")}
              style={{
                marginTop: 12, textAlign: "center", padding: 14,
                border: "1px solid var(--primary)", color: "var(--primary)",
                fontFamily: "'Lato', sans-serif", fontSize: "12px",
                letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none",
              }}
            >
              {t.nav.reservation}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
