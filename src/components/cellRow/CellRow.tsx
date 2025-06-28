import { memo } from "react";
import "./CellRow.css";
import { Cell } from "../cell/Cell";

export const CellRow = memo(function CellRow(props: {
  cells: number;
  height: number;
}) {
  return (
    <div className="cell-row" style={{ height: props.height }}>
      {Array(props.cells).map((_, index) => (
        <Cell key={index} />
      ))}
    </div>
  );
});
