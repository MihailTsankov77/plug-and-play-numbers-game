import { CellId } from "./Cell";
import { Coordinates } from "./Dimensions";

export type Connection = {
  from: CellId;
  to: CellId;
};

export type PossibleConnection = Connection & {
  direction: "horizontal" | "vertical";
  coordinates: Coordinates;
};

export type ConnectionEvent = Connection & {
  delete?: boolean;
};
