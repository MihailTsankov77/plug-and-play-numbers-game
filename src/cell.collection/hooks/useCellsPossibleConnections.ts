import { useMemo } from "react";
import { CellId } from "../types/Cell";
import { PossibleConnection } from "../types/Connections";
import { Dimensions } from "../types/Dimensions";

const EPSILON = 0.1;

export function useCellsPossibleConnections(
  cellDimensions: Record<CellId, Dimensions>
): PossibleConnection[] {
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
          connections.push({
            from: cellA.id,
            to: cellB.id,
            direction: "horizontal",
          });
        }

        if (isVerticallyAdjacent && hasVerticalOverlap) {
          connections.push({
            from: cellA.id,
            to: cellB.id,
            direction: "vertical",
          });
        }
      }
    }

    return connections;
  }, [cellDimensions]);
}
