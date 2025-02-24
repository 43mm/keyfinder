export type KeyboardLayout = "US English";
export type LayoutState = {
  current: KeyboardLayout;
};

export type Key = {
  id?: number;
  name?: string;
  length: number;
  alignLeft?: boolean;
  alignRight?: boolean;
};

export type Colour = "slate" | "red" | "orange" | "lime" | "sky" | "violet";

export type KeyState = Key & {
  command?: string;
  colour?: Colour;
};

export type NamedKeyboard = {
  name: string;
  data: KeyState[][];
};

export type KeyboardState = {
  data: NamedKeyboard[];
};
