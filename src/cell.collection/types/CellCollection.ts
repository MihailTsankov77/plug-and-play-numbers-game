import { CellId } from "./Cell";

export type CellRow = {
  id: string;
  type: "row";
  children: (CellId | CellColumn)[];
};

export type CellColumn = {
  id: string;
  type: "column";
  children: CellRow[];
};

export type CellCollection = CellRow | CellColumn;
