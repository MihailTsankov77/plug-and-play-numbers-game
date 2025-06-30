import { useCallback, useState } from "react";
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

function findElementById(
  collection: CellCollection,
  id: string
): CellCollection | undefined {
  if (collection.id === id) {
    return collection;
  }

  for (const child of collection.children) {
    if (typeof child === "string") continue;
    const found = findElementById(child, id);
    if (found) return found;
  }
}

export function useCellState(initStateFn: () => CellConfig): {
  cellCollection: CellCollection;
  cellsById: Record<string, CellConfig>;
  addCell: (containerId: string, cellId: string, direction: Direction) => void;
} {
  const [initCell] = useState(initStateFn);
  const [cellCollection, setCellCollection] = useState<CellCollection>(() =>
    generateRow([initCell.id])
  );
  const [cellsById, setCellsById] = useState<Record<string, CellConfig>>({
    [initCell.id]: initCell,
  });

  const addToRow = useCallback(
    (row: CellRow, cellId: CellId, direction: Direction) => {
      setCellCollection((prevCollection) => {
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
    },
    []
  );

  const addCell = useCallback(
    (containerId: string, cellId: CellId, direction: Direction) => {
      const element = findElementById(cellCollection, containerId);

      if (!element) {
        console.error(
          `Element with id ${containerId} not found in the collection.`
        );
        return;
      }

      switch (element.type) {
        case "row": {
          return addToRow(element, cellId, direction);
        }
        case "column": {
          console.error("Please use rows.");
        }
        default: {
          console.error("Unknown element type:", element);
          return;
        }
      }
    },
    [addToRow]
  );

  return {
    cellCollection,
    cellsById,
    addCell,
  };
}
