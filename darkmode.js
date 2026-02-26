const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

// Load saved theme or system preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.classList.toggle("dark", savedTheme === "dark");
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.toggle("dark", prefersDark);
}

// Toggle function
toggleBtn.addEventListener("click", () => {
  root.classList.toggle("dark");

  const isDark = root.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});