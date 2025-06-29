import { memo, useState } from "react";
import "./CellOrganizer.css";
import { Cell, CellProps } from "../cell/Cell";
import { CellRow } from "../cellRow/CellRow";

export const CellOrganizer = memo(function CellOrganizer(props: {}) {
  const [cellsGrid, setCellsGrid] = useState<CellProps[][]>([
    [{}, {}],
    [{}, {}],
  ]);

  return (
    <div className="cell-container">
      {cellsGrid.map((cellsPerRow, index) => (
        <CellRow key={index} cells={cellsPerRow} />
      ))}
    </div>
  );
});
