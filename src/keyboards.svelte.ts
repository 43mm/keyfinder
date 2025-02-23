import { DEFAULT_NAME, STORAGE_KEY } from "./consts";
import type { Key, SavedKeyboard } from "./types";
import USEnglish from "./layouts/us.json";

const currentLayout: Key[][] = USEnglish;

function loadInitialState(): SavedKeyboard[] {
  const initState = [{ name: DEFAULT_NAME, data: currentLayout }];
  if (typeof window === "undefined") return initState;
  const savedLayouts = localStorage.getItem(STORAGE_KEY);
  return savedLayouts ? JSON.parse(savedLayouts) : initState;
}

export let keyboards: SavedKeyboard[] = $state(loadInitialState());
