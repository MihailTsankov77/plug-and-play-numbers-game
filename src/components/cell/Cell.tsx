import { memo } from "react";
import "./Cell.css";
import { AddButton } from "../addButton/AddButton";

export const Cell = memo(function Cell(props: {}) {
  return (
    <div className="cell">
      <AddButton />
    </div>
  );
});
