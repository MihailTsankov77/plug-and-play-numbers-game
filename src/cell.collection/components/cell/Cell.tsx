import { memo } from "react";
import "./Cell.css";
import { AddButton } from "../add.button/AddButton";
import { CellConfig } from "../../types/Cell";

export const Cell = memo(function Cell(props: CellConfig) {
  return (
    <div className="cell">
      {/* <AddButton /> */}
      <div className="cell-id">ID: {props.id}</div>
      x: {props.dimensions.x}, y: {props.dimensions.y}
    </div>
  );
});
