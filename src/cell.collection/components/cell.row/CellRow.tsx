import { memo, useCallback, useEffect, useMemo } from "react";
import "./CellRow.css";
import { Cell } from "../cell/Cell";
import { CellConfig } from "../../types/Cell";
import {
  ElementType,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";

export const CellRow = memo(function CellRow(props: {
  cells: CellConfig[];
  register: (id: string) => void;
  addElement: (id: string, type: ElementType, option: TypeOption) => void;
  getElementById: (
    id: string
  ) => { id: string; type?: ElementType; option?: TypeOption } | undefined;
}) {
  useEffect(() => {
    props.cells.forEach((cell) => {
      props.register(cell.id);
    });
  }, [props.cells, props.register]);

  const getElement = useCallback((id: string) => {
    const element = props.getElementById(id);
    if (element?.option && element?.type) {
      return { type: element.type, option: element.option };
    }
    return undefined;
  }, [props.getElementById]);

  return (
    <div className="cell-row">
      {props.cells.map((cell) => (
        <Cell config={cell} addElement={props.addElement} element={getElement(cell.id)} />
      ))}
    </div>
  );
});
