import "@testing-library/jest-dom";

// Polyfill per jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    // compat legacy API:
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
