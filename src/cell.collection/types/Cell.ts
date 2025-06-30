import { Dimensions } from "./Dimensions";

export type CellId = string;

export type CellConfig = {
  id: CellId;
  // TODO remove this
  dimensions: Dimensions;
};
