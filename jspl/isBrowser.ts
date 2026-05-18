export const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined" && window.window === window;
