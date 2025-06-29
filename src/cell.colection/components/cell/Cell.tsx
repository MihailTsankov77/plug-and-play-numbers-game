import { memo } from "react";
import "./Cell.css";
import { AddButton } from "../add.button/AddButton";
import { CellConfig } from "../../types/Cell";

export const Cell = memo(function Cell(props: CellConfig) {
  return (
    <div className="cell">
      <AddButton />
    </div>
  );
});
