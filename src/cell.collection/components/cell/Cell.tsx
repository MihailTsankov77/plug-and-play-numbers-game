import { memo, useLayoutEffect, useRef } from "react";
import "./Cell.css";
import { CellConfig, CellId } from "../../types/Cell";
import { AddCellButton } from "../add.cell.button/AddCellButton";
import { Direction } from "../../types/Dimensions";
import { useCellDimensionsContext } from "../../hooks/useCellsDimensions";
import { AddButton } from "../add.button/AddButton";

export const Cell = memo(function Cell(
  props: CellConfig & {
    addCell: (cellId: CellId, direction: Direction) => void;
  }
) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { setDimensions } = useCellDimensionsContext();

  const onPress = (direction: Direction) => {
    props.addCell(props.id, direction);
  };

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
            <AddButton animated />
          </div>
          <AddCellButton direction="right" addCell={onPress} />
        </div>
        <AddCellButton direction="down" addCell={onPress} />
      </div>
    </div>
  );
});
