import { memo } from "react";
import "./CellRow.css";
import { Cell } from "../cell/Cell";
import { CellConfig } from "../../types/Cell";

export const CellRow = memo(function CellRow(props: { cells: CellConfig[] }) {
  return (
    <div className="cell-row">
      {props.cells.map((cell) => (
        <Cell key={cell.id} {...cell} />
      ))}
    </div>
  );
});
