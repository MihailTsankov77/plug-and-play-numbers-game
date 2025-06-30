export type CellId = string;

export type CellRow = {
  id: string;
  type: "row";
  children: (CellId | CellColumn)[];
};

export type CellColumn = {
  id: string;
  type: "column";
  children: (CellId | CellRow)[];
};

export type CellCollection = CellRow | CellColumn;
