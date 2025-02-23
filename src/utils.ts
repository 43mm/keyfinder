import { DEFAULT_NAME, KEYBOARD_LAYOUTS, STORAGE_KEY } from "./consts";
import type { KeyboardLayout, NamedKeyboard } from "./types";

export const getBlankKeyboard = (layout: KeyboardLayout): NamedKeyboard => {
  return {
    name: DEFAULT_NAME,
    data: KEYBOARD_LAYOUTS[layout],
  };
};

export const getInitialState = (layout: KeyboardLayout): NamedKeyboard[] => {
  const BLANK_KEYBOARD = getBlankKeyboard(layout);
  const initState = [BLANK_KEYBOARD];
  if (typeof window === "undefined") return initState;

  const savedLayouts = localStorage.getItem(STORAGE_KEY);
  return savedLayouts ? JSON.parse(savedLayouts) : initState;
};
