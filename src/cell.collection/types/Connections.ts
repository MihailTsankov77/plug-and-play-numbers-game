import { CellId } from "./Cell";
import { Coordinates } from "./Dimensions";

export type Connection = {
  from: CellId;
  to: CellId;
  state: "left" | "right" | "inactive";
};

export type PossibleConnection = Omit<Connection, "state"> & {
  direction: "horizontal" | "vertical";
  coordinates: Coordinates;
};
