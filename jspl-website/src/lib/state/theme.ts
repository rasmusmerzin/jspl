import { get, writable } from "svelte/store";

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

export const theme = writable(
  localStorage.getItem("theme") || (darkModeQuery.matches ? "dark" : "light"),
);

export function toggleTheme() {
  theme.update((value) => (value === "dark" ? "light" : "dark"));
  saveTheme();
}

function saveTheme() {
  const isDarkMode = get(theme) === "dark";
  if (isDarkMode === darkModeQuery.matches) localStorage.removeItem("theme");
  else localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

setTimeout(() => {
  darkModeQuery.addEventListener("change", (event) => {
    theme.set(event.matches ? "dark" : "light");
  });
  theme.subscribe((value) => document.documentElement.setAttribute("theme", value));
});
