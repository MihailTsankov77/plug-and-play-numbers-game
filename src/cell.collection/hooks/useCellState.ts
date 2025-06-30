import { useCallback, useState } from "react";
import { CellConfig, CellId } from "../types/Cell";
import { Direction } from "../types/Dimensions";
import { CellCollection, CellColumn, CellRow } from "../types/CellCollection";
import { generateEmptyCell } from "../utils/generateCell";

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

function updateCollection(
  collection: CellCollection,
  updatedElement: CellCollection
): CellCollection {
  if (collection.id === updatedElement.id) {
    return updatedElement;
  }

  const newChildren = collection.children.map((child) => {
    if (typeof child === "string") return child;
    return updateCollection(child, updatedElement);
  });

  return { ...collection, children: newChildren as any };
}

// TODO maybe improve this so that columns can accept cells as children it will flatten the structure
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

  const addNewCell = useCallback(() => {
    const newCell = generateEmptyCell({ x: 0, y: 0 });

    setCellsById((prev) => ({ ...prev, [newCell.id]: newCell }));
    return newCell.id;
  }, []);

  const addToRow = useCallback(
    (containerId: string, cellId: CellId, direction: Direction) => {
      setCellCollection((prev) => {
        const container = findElementById(prev, containerId);
        if (!container || container.type !== "row") {
          console.error(`Container with id ${containerId} not found`);
          return prev;
        }

        const newChildren = container.children;

        const index = newChildren.indexOf(cellId);
        if (index === -1) {
          console.error(
            `Cell with id ${cellId} not found in container ${containerId}`,
            cellCollection
          );
          return prev;
        }

        // TODO coordinates
        switch (direction) {
          case "up": {
            newChildren[index] = generateColumn([
              generateRow([addNewCell()]),
              generateRow([cellId]),
            ]);

            break;
          }
          case "down": {
            newChildren[index] = generateColumn([
              generateRow([cellId]),
              generateRow([addNewCell()]),
            ]);

            break;
          }
          case "left": {
            newChildren.splice(index, 0, addNewCell());
            break;
          }
          case "right": {
            newChildren.splice(index + 1, 0, addNewCell());
            break;
          }

          default: {
            direction satisfies never;
          }
        }

        container.children = newChildren;
        return updateCollection(prev, container);
      });
    },
    []
  );

  return {
    cellCollection,
    cellsById,
    addCell: addToRow,
  };
}
