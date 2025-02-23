import type { Colour, Key, KeyboardLayout } from "./types";
import USEnglish from "./layouts/us.json";

export const STORAGE_KEY = "keyboards";
export const LAYOUT_KEY = "layouts";
export const DEFAULT_NAME = "unnamed";

export const KEYBOARD_LAYOUTS: Record<KeyboardLayout, Key[][]> = {
  "US English": USEnglish,
};

export const COLOUR_CLASS_MAP: Record<Colour, string> = {
  slate: "bg-slate-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  lime: "bg-lime-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
};
