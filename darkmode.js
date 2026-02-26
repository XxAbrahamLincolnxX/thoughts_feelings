const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

const STORAGE_KEY = "theme";

function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

function setButton(theme) {
  if (!toggleBtn) return;
  const isLight = theme === "light";
  toggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
  toggleBtn.textContent = isLight ? "Dark" : "Light";
}

function applyTheme(theme) {
  body.classList.toggle("light", theme === "light");
  setButton(theme);
}

// Init
(function initTheme() {
  const initial = getSavedTheme() || getSystemPreference();
  applyTheme(initial);
})();

// Toggle
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const next = body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
    saveTheme(next);
  });
}

// System changes only if user hasn't chosen
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (e) => {
  if (!getSavedTheme()) {
    applyTheme(e.matches ? "dark" : "light");
  }
});