import { memo } from "react";
import "./CellOrganizer.css";
import { CellRow } from "../cell.row/CellRow";
import { ColumnExpander } from "../column.expander/ColumnExpander";
import { RowExpander } from "../row.expander/RowExpander";
import { generateEmptyCell } from "../../utils/generateCell";
import { MaxNumberOfCells } from "./constants";
import { useCellState } from "./useCellState";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cells, setters } = useCellState(() => [
    [generateEmptyCell({ x: 0, y: 0 })],
  ]);

  const disableAddColumn = cells[0].length >= MaxNumberOfCells.columns;
  const disableAddRow = cells.length >= MaxNumberOfCells.rows;

  return (
    <div className="cell-organizer-1">
      <ColumnExpander onPress={setters.left} disabled={disableAddColumn} />

      <div className="cell-organizer-2">
        <RowExpander onPress={setters.top} disabled={disableAddRow} />

        <div className="cell-container">
          {cells.map((cellsPerRow, index) => (
            <CellRow key={index} cells={cellsPerRow} />
          ))}
        </div>

        <RowExpander onPress={setters.bottom} disabled={disableAddRow} />
      </div>

      <ColumnExpander onPress={setters.right} disabled={disableAddColumn} />
    </div>
  );
});
