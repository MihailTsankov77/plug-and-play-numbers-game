import { useMemo } from "react";
import { CellConfig } from "../types/Cell";

// TODO: rework to use width and height from CellConfig
export function useCellNeighborsById(
  cells: CellConfig[][]
): Record<string, string[]> {
  return useMemo(() => {
    const neighborsById: Record<string, string[]> = {};

    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellId = cell.id;
        const neighbors: string[] = [];

        const directions = [
          [-1, 0], // up
          [0, 1], // right
          [1, 0], // down
          [0, -1], // left
        ];

        for (const [dy, dx] of directions) {
          const neighborY = y + dy;
          const neighborX = x + dx;

          if (
            neighborY >= 0 &&
            neighborY < cells.length &&
            neighborX >= 0 &&
            neighborX < cells[neighborY].length
          ) {
            neighbors.push(cells[neighborY][neighborX].id);
          }
        }

        neighborsById[cellId] = neighbors;
      });
    });

    return neighborsById;
  }, [cells]);
}
