import { memo } from "react";
import "./Cell.css";
import { AddButton } from "../addButton/AddButton";

export type CellProps = {};

export const Cell = memo(function Cell(props: CellProps) {
  return (
    <div className="cell">
      <AddButton />
    </div>
  );
});
