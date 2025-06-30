import { useCallback, useMemo, useState } from "react";
import { CellConfig, CellId } from "../types/Cell";
import { Direction } from "../types/Dimensions";
import { CellCollection, CellColumn, CellRow } from "../types/CellCollection";

function generateRow(children: (CellId | CellColumn)[]): CellRow {
  return {
    id: crypto.randomUUID(),
    type: "row",
    children,
  };
}

function generateColumn(children: CellRow[]): CellColumn {
  return {
    id: crypto.randomUUID(),
    type: "column",
    children,
  };
}

function findElementById<Type extends "row" | "column">(
  type: Type,
  collection: CellCollection,
  id: string
): (CellCollection & { type: Type }) | undefined {
  if (collection.type === type && collection.id === id) {
    return collection as CellCollection & { type: Type };
  }

  for (const child of collection.children) {
    if (typeof child === "string") continue;
    const found = findElementById(type, child, id);
    if (found) return found;
  }
}

export function useCellState(initStateFn: () => CellConfig): {
  cellCollection: CellCollection;
  cellsById: Record<string, CellConfig>;
  setters: {
    addToRow: (id: string, direction: Direction) => void;
    addToColumn: (id: string, direction: Direction) => void;
  };
} {
  const [initCell] = useState(initStateFn);
  const [cellCollection, setCellCollection] = useState<CellCollection>(() =>
    generateRow([initCell.id])
  );
  const [cellsById, setCellsById] = useState<Record<string, CellConfig>>({
    [initCell.id]: initCell,
  });

  const addToRow = useCallback((id: string, direction: Direction) => {
    setCellCollection((prevCollection) => {
      const row = findElementById("row", prevCollection, id);

      if (!row) return prevCollection;

      switch (direction) {
        case "up": {
          break;
        }
        case "down": {
          break;
        }
        case "left": {
          break;
        }
        case "right": {
          break;
        }

        default: {
          direction satisfies never;
        }
      }

      return prevCollection;
    });
  }, []);

  const addToColumn = useCallback((id: string, direction: Direction) => {
    setCellCollection((prevCollection) => {
      const column = findElementById("column", prevCollection, id);

      if (!column) return prevCollection;

      switch (direction) {
        case "up": {
          break;
        }
        case "down": {
          break;
        }
        case "left": {
          break;
        }
        case "right": {
          break;
        }

        default: {
          direction satisfies never;
        }
      }

      return prevCollection;
    });
  }, []);

  const setters = useMemo(
    () => ({
      addToRow,
      addToColumn,
    }),
    [addToRow, addToColumn]
  );

  return {
    cellCollection,
    cellsById,
    setters,
  };
}
