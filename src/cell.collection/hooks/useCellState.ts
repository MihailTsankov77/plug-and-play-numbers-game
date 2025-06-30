import { useCallback, useState } from "react";
import { CellId, CellCollection } from "../types/Cell";
import { Direction } from "../types/Dimensions";
import {
  generateCellColumn,
  generateCellId,
  generateCellRow,
} from "../utils/generators";

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

const TransformDirectionsForColumn: Record<Direction, Direction> = {
  up: "left",
  down: "right",
  left: "up",
  right: "down",
};

export function useCellState(): {
  cellCollection: CellCollection;
  addCell: (containerId: string, cellId: CellId, direction: Direction) => void;
} {
  const [cellCollection, setCellCollection] = useState<CellCollection>(() =>
    generateCellRow([generateCellId()])
  );

  const addCell = useCallback(
    (containerId: string, cellId: CellId, _direction: Direction) => {
      setCellCollection((prev) => {
        const container = findElementById(prev, containerId);
        if (!container) {
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

        const direction =
          container.type === "column"
            ? TransformDirectionsForColumn[_direction]
            : _direction;

        const generator =
          container.type === "column" ? generateCellRow : generateCellColumn;

        switch (direction) {
          case "up": {
            newChildren[index] = generator([generateCellId(), cellId]);

            break;
          }
          case "down": {
            newChildren[index] = generator([cellId, generateCellId()]);

            break;
          }
          case "left": {
            newChildren.splice(index, 0, generateCellId());
            break;
          }
          case "right": {
            newChildren.splice(index + 1, 0, generateCellId());
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
    addCell,
  };
}
