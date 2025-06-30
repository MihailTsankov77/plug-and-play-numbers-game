import { CellId, CellColumn, CellRow } from "../types/Cell";

function generateUUID(): string {
  return crypto.randomUUID();
}

export function generateCellId(): CellId {
  return `cell-${generateUUID()}`;
}

export function generateCellRow(children: CellId[]): CellRow {
  return {
    id: generateUUID(),
    type: "row",
    children,
  };
}

export function generateCellColumn(children: CellId[]): CellColumn {
  return {
    id: generateUUID(),
    type: "column",
    children,
  };
}
