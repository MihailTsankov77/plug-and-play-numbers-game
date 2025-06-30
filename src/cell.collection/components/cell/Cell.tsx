import { memo } from "react";
import "./Cell.css";
import { AddButton } from "../add.button/AddButton";
import { CellConfig } from "../../types/Cell";
import { AddCellButton } from "../add.cell.button/AddCellButton";
import { Direction } from "../../types/Dimensions";

export const Cell = memo(function Cell(props: CellConfig) {
  const onPress = (direction: Direction) => {
    // props.addCell(direction);
  };

  return (
    <div className="cell-container-1">
      <AddCellButton direction="up" addCell={onPress} />
      <div className="cell-container-2">
        <AddCellButton direction="left" addCell={onPress} />
        <div className="cell">
          {/* <AddButton animated /> */}
          <div className="cell-id">ID: {props.id}</div>
          x: {props.dimensions.x}, y: {props.dimensions.y}
        </div>
        <AddCellButton direction="right" addCell={onPress} />
      </div>
      <AddCellButton direction="down" addCell={onPress} />
    </div>
  );
});
