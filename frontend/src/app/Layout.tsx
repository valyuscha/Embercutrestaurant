import { Outlet } from "react-router";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import LinkedInWatermark from "./components/LinkedInWatermark";

function LayoutInner() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0c0d0e; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
        input:focus, select:focus, textarea:focus {
          border-color: var(--primary) !important;
          outline: none !important;
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 15%, transparent);
        }
        ::selection {
          background: color-mix(in srgb, var(--primary) 30%, transparent);
          color: var(--foreground);
        }
        .theme-light {
          --background: #f1eee8;
          --foreground: #213029;
          --card: #faf7f2;
          --card-foreground: #213029;
          --primary: #354f42;
          --primary-foreground: #f1eee8;
          --secondary: #e3ded2;
          --secondary-foreground: #213029;
          --muted: #e3ded2;
          --muted-foreground: #416151;
          --accent: #cb9f6b;
          --accent-foreground: #213029;
          --border: rgba(53, 79, 66, 0.2);
          --input-background: #e3ded2;
          --ring: #354f42;
        }
      `}</style>
      <Nav />
      <Outlet />
      <Footer />
      <ThemeToggle theme={theme} onChange={setTheme} />
      <LinkedInWatermark />
    </>
  );
}

export function Layout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <LayoutInner />
      </ThemeProvider>
    </LanguageProvider>
  );
}
