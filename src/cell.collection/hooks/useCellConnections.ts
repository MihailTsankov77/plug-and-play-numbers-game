import { useMemo } from "react";
import { CellConfig } from "../types/Cell";
import { Connection } from "../types/Connections";

// TODO: rework to use width and height from CellConfig
export function useCellConnections(cells: CellConfig[][]): Connection[] {
  return useMemo(() => {
    const connections: Connection[] = [];

    cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellId = cell.id;

        // Check only bottom and right neighbors, because the other are already checked
        // from the previous cells
        const directions = [
          [0, 1], // right
          [1, 0], // down
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
            connections.push({
              from: cellId,
              to: cells[neighborY][neighborX].id,
              direction: dy === 0 ? "horizontal" : "vertical",
            });
          }
        }
      });
    });

    return connections;
  }, [cells]);
}
