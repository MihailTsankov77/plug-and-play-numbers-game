import { memo, useCallback, useState } from "react";
import "./CellOrganizer.css";
import { Cell, CellProps } from "../cell/Cell";
import { CellRow } from "../cellRow/CellRow";
import { AddButton } from "../addButton/AddButton";
import { ColumnExpander } from "../columnExpander/ColumnExpande";
import { RowExpander } from "../rowExpander/RowExpander";

const MaxDimensions = {
  rows: 6,
  columns: 6,
};

export const CellOrganizer = memo(function CellOrganizer(props: {}) {
  const [cellsGrid, setCellsGrid] = useState<CellProps[][]>([[{}]]);

  const addRow = useCallback((direction: "top" | "bottom") => {
    setCellsGrid((prevGrid) => {
      if (prevGrid.length >= MaxDimensions.rows) {
        return prevGrid;
      }

      const newRow: CellProps[] = prevGrid[0].map(() => ({}));

      if (direction === "top") {
        return [newRow, ...prevGrid];
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
        const newCell: CellProps = {};
        if (direction === "left") {
          return [newCell, ...row];
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
