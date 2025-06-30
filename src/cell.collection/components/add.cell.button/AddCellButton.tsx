import { memo } from "react";
import "./AddCellButton.css";
import { AddButton } from "../add.button/AddButton";
import { Direction } from "../../types/Dimensions";

export const AddCellButton = memo(function AddCellButton(props: {
  direction: Direction;
  addCell: (direction: Direction) => void;
}) {
  const onPress = () => {
    props.addCell(props.direction);
  };

  return (
    <div className="add-cell-button-container">
      <div className="add-cell-button-mask" />
      <div className="add-cell-button-wrapper">
        <AddButton size="small" onPress={onPress} />
      </div>
    </div>
  );
});
