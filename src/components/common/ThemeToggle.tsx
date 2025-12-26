

"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Run only on client
  useEffect(() => {
    const saved =
      (localStorage.getItem("theme") as "dark" | "light") || "dark";

    setTheme(saved);
    document.documentElement.className = saved;
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem("theme", next);
  }

  // Preventing hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="
        px-3 py-1 rounded border border-gray-500 text-sm
        dark:text-white dark:border-gray-600
        light:text-black light:border-gray-400
      "
    >
      {theme === "dark" ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
