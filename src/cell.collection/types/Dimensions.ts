export type Coordinates = {
  x: number;
  y: number;
};

export type Dimensions = Coordinates & {
  width: number;
  height: number;
};

export type Direction = "up" | "down" | "left" | "right";
