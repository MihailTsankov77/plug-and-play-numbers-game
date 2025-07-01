import { memo, useLayoutEffect, useRef, useCallback, useState } from "react";
import "./Cell.css";
import { CellId } from "../../types/Cell";
import { AddCellButton } from "../add.cell.button/AddCellButton";
import { Direction } from "../../types/Dimensions";
import { useCellDimensionsContext } from "../../hooks/useCellsDimensions";
import { AddButton } from "../add.button/AddButton";
import {
  ElementType,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";
import { AddItemDialog } from "../add.item.dialog/AddItemDialog";
import { RandomNumbersGenerator } from "../../../elements/components/generators/RandomNumbersGenerator";
import { SumTransformator } from "../../../elements/components/transformators/Sum";
import { MultiplyTransformator } from "../../../elements/components/transformators/Multiply";

export const Cell = memo(function Cell(props: {
  id: CellId;
  addCell: (cellId: CellId, direction: Direction) => void;
  addElement: (id: string, type: ElementType, option: TypeOption) => void;
  element?: { type: ElementType; option: TypeOption } | undefined;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { setDimensions } = useCellDimensionsContext();

  const onPress = (direction: Direction) => {
    props.addCell(props.id, direction);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleAddElement = useCallback(
    (type: ElementType, option: TypeOption) => {
      props.addElement(props.id, type, option);
      handleClose();
    },
    [props.addElement, props.id, handleClose]
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const rect = entry.target.getBoundingClientRect();
      const { left, top } = rect;

      setDimensions(props.id, { x: left, y: top, width, height });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="cell-container-0" ref={containerRef}>
      <div className="cell-container-1">
        <AddCellButton direction="up" addCell={onPress} />
        <div className="cell-container-2">
          <AddCellButton direction="left" addCell={onPress} />
          <div className="cell">
            {props.element ? (
              getElement(props.element.type, props.element.option)
            ) : (
              <AddButton animated onPress={handleOpen} />
            )}

            {open && (
              <AddItemDialog
                open={open}
                onClose={handleClose}
                onAdd={handleAddElement}
              />
            )}
          </div>
          <AddCellButton direction="right" addCell={onPress} />
        </div>
        <AddCellButton direction="down" addCell={onPress} />
      </div>
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
};
