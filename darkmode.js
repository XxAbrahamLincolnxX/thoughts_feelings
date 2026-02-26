const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

const STORAGE_KEY = "theme";

/* ---------- Helpers ---------- */

function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  const isLight = theme === "light";

  body.classList.toggle("light", isLight);

  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
  }
}

function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

/* ---------- Initialization ---------- */

(function initTheme() {
  const savedTheme = getSavedTheme();
  const initialTheme = savedTheme || getSystemPreference();

  applyTheme(initialTheme);
})();

/* ---------- Toggle Handler ---------- */

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isCurrentlyLight = body.classList.contains("light");
    const newTheme = isCurrentlyLight ? "dark" : "light";

    applyTheme(newTheme);
    saveTheme(newTheme);
  });
}

/* ---------- Listen for system changes ---------- */

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

mediaQuery.addEventListener("change", (e) => {
  // Only update if user has NOT explicitly chosen a theme
  if (!getSavedTheme()) {
    const newTheme = e.matches ? "dark" : "light";
    applyTheme(newTheme);
  }
});