import { useMemo } from "react";
import { CellId } from "../types/Cell";
import { PossibleConnection } from "../types/Connections";
import { Dimensions } from "../types/Dimensions";
import { useCellElementsContext } from "../contextes/CellElementsContext";

const EPSILON = 0.1;

export function useCellsPossibleConnections(
  cellDimensions: Record<CellId, Dimensions>
): PossibleConnection[] {
  const { cellElements } = useCellElementsContext();

  return useMemo(() => {
    const connections: PossibleConnection[] = [];

    const cells = Object.entries(cellDimensions).map(([id, dimensions]) => ({
      id,
      ...dimensions,
    }));

    for (let i = 0; i < cells.length; i++) {
      const cellA = cells[i];

      for (let j = i + 1; j < cells.length; j++) {
        const cellB = cells[j];

        const isHorizontallyAdjacent =
          Math.abs(cellA.x + cellA.width - cellB.x) < EPSILON ||
          Math.abs(cellB.x + cellB.width - cellA.x) < EPSILON;
        const isVerticallyAdjacent =
          Math.abs(cellA.y + cellA.height - cellB.y) < EPSILON ||
          Math.abs(cellB.y + cellB.height - cellA.y) < EPSILON;

        const hasHorizontalOverlap =
          cellA.y < cellB.y + cellB.height && cellA.y + cellA.height > cellB.y;

        const hasVerticalOverlap =
          cellA.x < cellB.x + cellB.width && cellA.x + cellA.width > cellB.x;

        if (isHorizontallyAdjacent && hasHorizontalOverlap) {
          const middleY =
            (Math.max(cellA.y, cellB.y) +
              Math.min(cellA.y + cellA.height, cellB.y + cellB.height)) /
            2;
          const middleX =
            cellA.x < cellB.x ? cellA.x + cellA.width : cellB.x + cellB.width;

          connections.push({
            ...(cellA.x < cellB.x
              ? { from: cellA.id, to: cellB.id }
              : { from: cellB.id, to: cellA.id }),
            direction: "horizontal",
            coordinates: { x: middleX, y: middleY },
          });
        }

        if (isVerticallyAdjacent && hasVerticalOverlap) {
          const middleX =
            (Math.max(cellA.x, cellB.x) +
              Math.min(cellA.x + cellA.width, cellB.x + cellB.width)) /
            2;
          const middleY =
            cellA.y < cellB.y ? cellA.y + cellA.height : cellB.y + cellB.height;

          connections.push({
            ...(cellA.y < cellB.y
              ? { from: cellA.id, to: cellB.id }
              : { from: cellB.id, to: cellA.id }),
            direction: "vertical",
            coordinates: { x: middleX, y: middleY },
          });
        }
      }
    }

    // Remove cells without elements and between generators
    const result = connections.filter((connection) => {
      return (
        cellElements[connection.from] &&
        cellElements[connection.to] &&
        !(
          cellElements[connection.from]?.type === "generator" &&
          cellElements[connection.to]?.type === "generator"
        )
      );
    });

    return result;
  }, [cellDimensions, cellElements]);
}
