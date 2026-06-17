const LinkedInWatermark = () => (
  <a
    href="https://www.linkedin.com/in/valentyna-sydorovska/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      bottom: "72px",
      left: "16px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: "rgba(10, 102, 194, 0.9)",
      color: "#ffffff",
      fontSize: "11px",
      fontFamily: "sans-serif",
      fontWeight: "600",
      padding: "6px 12px",
      borderRadius: "20px",
      textDecoration: "none",
      backdropFilter: "blur(4px)",
      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      letterSpacing: "0.2px",
      opacity: "0.85",
      transition: "opacity 0.2s ease",
    }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
    Demo page · Made by Valentyna Sydorovska
  </a>
);

export default LinkedInWatermark;
