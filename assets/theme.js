"use strict";

(() => {
  const key = "avanade-fde-theme";
  let preference;
  try { preference = localStorage.getItem(key); } catch {}
  if (!["light", "dark"].includes(preference)) preference = null;
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#0b1629" : "#ff5800";
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }
  apply(preference || "dark");
  window.FDETheme = {
    set(theme) {
      if (!["light", "dark"].includes(theme)) return;
      preference = theme;
      try { localStorage.setItem(key, theme); } catch {}
      apply(theme);
    }
  };
})();