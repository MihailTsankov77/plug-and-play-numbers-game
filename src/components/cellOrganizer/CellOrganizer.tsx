import { memo, useState } from "react";
import "./CellOrganizer.css";
import { Cell, CellProps } from "../cell/Cell";
import { CellRow } from "../cellRow/CellRow";
import { AddButton } from "../addButton/AddButton";
import { ColumnExpander } from "../columnExpander/ColumnExpande";
import { RowExpander } from "../rowExpander/RowExpander";

export const CellOrganizer = memo(function CellOrganizer(props: {}) {
  const [cellsGrid, setCellsGrid] = useState<CellProps[][]>([
    [{}, {}],
    [{}, {}],
  ]);

  return (
    <div className="cell-organizer-1">
      <ColumnExpander onPress={() => {}} />
      <div className="cell-organizer-2">
        <RowExpander onPress={() => {}} />
        <div className="cell-container">
          {cellsGrid.map((cellsPerRow, index) => (
            <CellRow key={index} cells={cellsPerRow} />
          ))}
        </div>
        <RowExpander onPress={() => {}} />
      </div>
      <ColumnExpander onPress={() => {}} />
    </div>
  );
});
