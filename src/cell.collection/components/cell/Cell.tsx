import { memo, useCallback, useState } from "react";
import "./Cell.css";
import { AddButton } from "../add.button/AddButton";
import { CellConfig } from "../../types/Cell";
import { AddItemDialog } from "../add.item.dialog/AddItemDialog";
import {
  ElementType,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";
import { RandomNumbersGenerator } from "../../../elements/components/generators/RandomNumbersGenerator";
import { SumTransformator } from "../../../elements/components/transformators/Sum";
import { MultiplyTransformator } from "../../../elements/components/transformators/Multiply";

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
        // TODO: Implement input
        return <SumTransformator sumWith={5} input={5} />;
      case "Multiply by 2":
        // TODO: Implement input
        return <MultiplyTransformator factor={2} input={5} />;
      default:
        return null;
    }
  }

  return null;
}