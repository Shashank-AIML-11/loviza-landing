// Where the real LOVIZA app lives. Every "sign in / get started" button on this
// landing site sends visitors there. Override per environment with VITE_APP_URL.
export const APP_URL = (import.meta.env.VITE_APP_URL ?? "https://app.loviza.click").replace(
  /\/$/,
  "",
);
export const AUTH_URL = `${APP_URL}/auth`;
