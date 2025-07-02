import { memo, useRef, useCallback, useState, useEffect } from "react";
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
import { Element } from "../../../elements/utils/Element";
import { useCellElementsContext } from "../../contextes/CellElementsContext";

export const Cell = memo(function Cell(props: {
  id: CellId;
  addCell: (cellId: CellId, direction: Direction) => void;
  value?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addElement, cellElements } = useCellElementsContext();

  const { setDimensions } = useCellDimensionsContext();

  const onPress = (direction: Direction) => {
    props.addCell(props.id, direction);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleAddElement = useCallback(
    (type: ElementType, option: TypeOption) => {
      addElement(props.id, type, option);
      handleClose();
    },
    [addElement, props.id, handleClose]
  );

  useEffect(() => {
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

  const element = cellElements[props.id];

  return (
    <div className="cell-container-0" ref={containerRef}>
      <div className="cell-container-1">
        <AddCellButton direction="up" addCell={onPress} />
        <div className="cell-container-2">
          <AddCellButton direction="left" addCell={onPress} />
          <div className="cell">
            {element ? (
              <Element
                type={element.type}
                option={element.option}
                cellId={props.id}
                value={props.value}
              />
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
