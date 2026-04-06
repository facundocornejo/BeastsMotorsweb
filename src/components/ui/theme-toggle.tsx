"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  showLabel?: boolean;
}

export default function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = document.documentElement.getAttribute("data-theme") as "dark" | "light";
    if (stored) setTheme(stored);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("beast-theme", next);
    setTheme(next);
  }

  if (!mounted) return null;

  const label = theme === "dark" ? "Modo claro" : "Modo oscuro";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 transition-colors ${
        showLabel
          ? "px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium text-dark-800 hover:bg-gray-200 w-full"
          : "text-white/80 hover:text-white p-1"
      }`}
      aria-label={label}
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Sun className="w-5 h-5" aria-hidden="true" />
      )}
      {showLabel && <span>{label}</span>}
    </button>
  );
}
