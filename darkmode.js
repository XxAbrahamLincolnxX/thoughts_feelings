const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

const STORAGE_KEY = "theme";

function getSystemPreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setButtonState(theme) {
  if (!toggleBtn) return;

  const isLight = theme === "light";
  toggleBtn.setAttribute("aria-pressed", isLight ? "true" : "false");
  toggleBtn.textContent = isLight ? "Dark mode" : "Light mode";
}

function applyTheme(theme) {
  body.classList.toggle("light", theme === "light");
  setButtonState(theme);
}

function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

// Init
(function initTheme() {
  const savedTheme = getSavedTheme();
  const initialTheme = savedTheme || getSystemPreference();
  applyTheme(initialTheme);
})();

// Toggle click
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const newTheme = body.classList.contains("light") ? "dark" : "light";
    applyTheme(newTheme);
    saveTheme(newTheme);
  });
}

// System changes (only if user hasn't chosen)
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (e) => {
  if (!getSavedTheme()) {
    applyTheme(e.matches ? "dark" : "light");
  }
});