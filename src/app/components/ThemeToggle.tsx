type Theme = "dark" | "light";

interface ThemeToggleProps {
  theme: Theme;
  onChange: (t: Theme) => void;
}

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-1 p-1"
      style={{
        background: theme === "dark" ? "rgba(28,20,9,0.95)" : "rgba(255,252,245,0.95)",
        border: "1px solid rgba(201,146,63,0.35)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Label */}
      <span
        className="px-3 py-1"
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: theme === "dark" ? "rgba(242,230,204,0.5)" : "rgba(30,20,9,0.5)",
        }}
      >
        Wersja:
      </span>

      {(["dark", "light"] as Theme[]).map((t) => {
        const active = theme === t;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className="px-4 py-2 transition-all duration-200"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: active ? 700 : 400,
              background: active ? "var(--primary)" : "transparent",
              color: active
                ? (theme === "dark" ? "#110d07" : "#f8f2e6")
                : (theme === "dark" ? "rgba(242,230,204,0.6)" : "rgba(30,20,9,0.6)"),
              border: "none",
              cursor: "pointer",
            }}
          >
            {t === "dark" ? "🕯 Ciemna" : "☀ Jasna"}
          </button>
        );
      })}
    </div>
  );
}
