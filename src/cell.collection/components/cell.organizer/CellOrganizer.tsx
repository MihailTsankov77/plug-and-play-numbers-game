import { memo, useCallback, useState } from "react";
import "./CellOrganizer.css";
import { CellRow } from "../cell.row/CellRow";
import { ColumnExpander } from "../column.expander/ColumnExpande";
import { RowExpander } from "../row.expander/RowExpander";
import { CellConfig } from "../../types/Cell";
import { generateEmptyCell } from "../../utils/generateCell";
import { Coordinates } from "../../types/Dimensions";

const MaxDimensions = {
  rows: 6,
  columns: 6,
};

export const CellOrganizer = memo(function CellOrganizer() {
  const [cellsGrid, setCellsGrid] = useState<CellConfig[][]>(() => [
    [generateEmptyCell({ x: 0, y: 0 })],
  ]);

  const addRow = useCallback((direction: "top" | "bottom") => {
    setCellsGrid((prevGrid) => {
      if (prevGrid.length >= MaxDimensions.rows) {
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
    setCellsGrid((prevGrid) => {
      if (prevGrid[0].length >= MaxDimensions.columns) {
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

  const disableAddColumn = cellsGrid[0].length >= MaxDimensions.columns;
  const disableAddRow = cellsGrid.length >= MaxDimensions.rows;

  return (
    <div className="cell-organizer-1">
      <ColumnExpander
        onPress={handleAddColumnLeft}
        disabled={disableAddColumn}
      />

      <div className="cell-organizer-2">
        <RowExpander onPress={handleAddRowTop} disabled={disableAddRow} />

        <div className="cell-container">
          {cellsGrid.map((cellsPerRow, index) => (
            <CellRow key={index} cells={cellsPerRow} />
          ))}
        </div>

        <RowExpander onPress={handleAddRowBottom} disabled={disableAddRow} />
      </div>

      <ColumnExpander
        onPress={handleAddColumnRight}
        disabled={disableAddColumn}
      />
    </div>
  );
});
