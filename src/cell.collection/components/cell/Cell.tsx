import { memo, useCallback, useState } from "react";
import "./Cell.css";
import { AddButton } from "../add.button/AddButton";
import { CellConfig } from "../../types/Cell";
import { AddItemDialog } from "../add.item.dialog/AddItemDialog";
import {
  ElementType,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";
import { RandomNumbersGenerator } from "../../../elements/components/generators/random.number.generator/RandomNumbersGenerator";

export const Cell = memo(function Cell(props: {
  config: CellConfig;
  addElement: (id: string, type: ElementType, option: TypeOption) => void;
  element?: { type: ElementType; option: TypeOption } | undefined;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleAddElement = useCallback(
    (type: ElementType, option: TypeOption) => {
      props.addElement(props.config.id, type, option);
      handleClose();
    },
    [props.addElement, props.config.id, handleClose]
  );

  return (
    <div className="cell">
      {props.element ? getElement(props.element.type, props.element.option) : (<AddButton onPress={handleOpen} />)}
      
      {open && (
        <AddItemDialog
          open={open}
          onClose={handleClose}
          onAdd={handleAddElement}
        />
      )}
    </div>
  );
});


const getElement = (type: ElementType, option: TypeOption) => {
  if (type === "generator") {
    switch (option) {
      case "Random Number":
        return <RandomNumbersGenerator />;
      case "Something Else":
        return <div>Something Else Generator</div>;
      default:
        return null;
    }
  } else if (type === "transformator") {
    switch (option) {
      case "Plus 5":
        return <div>Plus 5 Transformator</div>;
      case "Multiply by 2":
        return <div>Multiply by 2 Transformator</div>;
      default:
        return null;
    }
  }

  return null;
}