import { useCallback, useState } from "react";
import "./CellOrganizer.css";
import { CellConfig } from "../../types/Cell";
import { generateEmptyCell } from "../../utils/generateCell";
import { MaxNumberOfCells } from "./constants";

export function useCellState(initStateFn: () => CellConfig[][]): {
  cells: CellConfig[][];
  setters: {
    top: () => void;
    bottom: () => void;
    left: () => void;
    right: () => void;
  };
} {
  const [cells, setCells] = useState<CellConfig[][]>(initStateFn);

  const addRow = useCallback((direction: "top" | "bottom") => {
    setCells((prevGrid) => {
      if (prevGrid.length >= MaxNumberOfCells.rows) {
        return prevGrid;
      }

      const y = direction === "top" ? 0 : prevGrid.length;

      const newRow: CellConfig[] = prevGrid[0].map((cell) =>
        generateEmptyCell({ y, x: cell.dimensions.x })
      );

      if (direction === "top") {
        const modifyPrevGrid = prevGrid.map((row) =>
          row.map((cell) => ({
            ...cell,
            dimensions: {
              ...cell.dimensions,
              y: cell.dimensions.y + 1,
            },
          }))
        );

        return [newRow, ...modifyPrevGrid];
      }

      return [...prevGrid, newRow];
    });
  }, []);

  const addColumn = useCallback((direction: "left" | "right") => {
    setCells((prevGrid) => {
      if (prevGrid[0].length >= MaxNumberOfCells.columns) {
        return prevGrid;
      }

      return prevGrid.map((row) => {
        const newCell: CellConfig = generateEmptyCell({
          x: direction === "left" ? 0 : row.length,
          y: row[0].dimensions.y,
        });

        if (direction === "left") {
          const modifyPrevRow = row.map((cell) => ({
            ...cell,
            dimensions: {
              ...cell.dimensions,
              x: cell.dimensions.x + 1,
            },
          }));

          return [newCell, ...modifyPrevRow];
        }

        return [...row, newCell];
      });
    });
  }, []);

  const handleAddRowTop = useCallback(() => addRow("top"), [addRow]);
  const handleAddRowBottom = useCallback(() => addRow("bottom"), [addRow]);
  const handleAddColumnLeft = useCallback(() => addColumn("left"), [addColumn]);
  const handleAddColumnRight = useCallback(
    () => addColumn("right"),
    [addColumn]
  );

  return {
    cells,
    setters: {
      top: handleAddRowTop,
      bottom: handleAddRowBottom,
      left: handleAddColumnLeft,
      right: handleAddColumnRight,
    },
  };
}
