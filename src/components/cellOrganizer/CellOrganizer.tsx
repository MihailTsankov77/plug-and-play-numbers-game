import { memo, useState } from "react";
import "./CellOrganizer.css";
import { Cell } from "../cell/Cell";
import { CellRow } from "../cellRow/CellRow";

export const CellOrganizer = memo(function CellOrganizer(props: {}) {
  const [cellsPerRow, setCellsPerRow] = useState<number[]>([1, 2]);

  const cellHeight = window.innerHeight / cellsPerRow.length;

  return (
    <div className="cell-container">
      {cellsPerRow.map((cells, index) => (
        <CellRow key={index} cells={cells} height={cellHeight} />
      ))}
    </div>
  );
});
