/** Command-palette / Konami easter eggs. */

export const EASTER_EGG_EVENT = "rudra-easter-egg";
export const SECRET_THEME_ID = "yc-batch";
export const SECRET_THEME_UNLOCK_KEY = "rudra-secret-yc-unlocked";

export type EasterEggId = "konami" | "tiber" | "yc";

export type EasterEggDetail = {
  id: EasterEggId;
};

export function dispatchEasterEgg(id: EasterEggId): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EASTER_EGG_EVENT, { detail: { id } satisfies EasterEggDetail }));
}

export function isSecretThemeUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SECRET_THEME_UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlockSecretTheme(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SECRET_THEME_UNLOCK_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

/** ↑↑↓↓←→←→BA */
export const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;
