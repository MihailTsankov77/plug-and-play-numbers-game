import { memo } from "react";
import "./CellRow.css";
import { Cell, CellProps } from "../cell/Cell";

export const CellRow = memo(function CellRow(props: { cells: CellProps[] }) {
  return (
    <div className="cell-row">
      {props.cells.map((cell, index) => (
        <Cell key={index} {...cell} />
      ))}
    </div>
  );
});
