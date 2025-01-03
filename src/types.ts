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
