import { memo, useCallback, useEffect } from "react";
import "./CellBlock.css";
import { Cell } from "../cell/Cell";
import { CellId, CellCollection, CellColumn, CellRow } from "../../types/Cell";
import { Direction } from "../../types/Dimensions";
import {
  ElementType,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";

type CommonProps = {
  addCell: (containerId: string, cellId: CellId, direction: Direction) => void;
  register: (id: string) => void;
  addElement: (id: string, type: ElementType, option: TypeOption) => void;
  getElementById: (
    id: string
  ) => { id: string; type?: ElementType; option?: TypeOption } | undefined;
};

export const CellBlock = memo(function CellBlock(
  props: {
    cellCollection: CellCollection;
  } & CommonProps
) {
  switch (props.cellCollection.type) {
    case "row": {
      return <Row {...props} {...props.cellCollection} />;
    }
    case "column": {
      return <Column {...props} {...props.cellCollection} />;
    }
    default:
      props.cellCollection satisfies never;

      console.error("Unknown cell collection type:", props.cellCollection);
      break;
  }
});

const Row = memo(function Row(props: CellRow & CommonProps) {
  const addCell = (cellId: CellId, direction: Direction) => {
    props.addCell(props.id, cellId, direction);
  };

  useEffect(() => {
    props.children
      .filter((cell) => typeof cell === "string")
      .forEach((cell) => {
        props.register(cell);
      });
  }, [props.children, props.register]);

  const getElement = useCallback(
    (id: string) => {
      const element = props.getElementById(id);
      if (element?.option && element?.type) {
        return { type: element.type, option: element.option };
      }
      return undefined;
    },
    [props.getElementById]
  );

  return (
    <div className="cell-row">
      {props.children.map((child) =>
        typeof child === "string" ? (
          <Cell
            key={child}
            id={child}
            addCell={addCell}
            addElement={props.addElement}
            element={getElement(child)}
          />
        ) : (
          <Column key={child.id} {...props} {...child} />
        )
      )}
    </div>
  );
});

const Column = memo(function Column(props: CellColumn & CommonProps) {
  const addCell = (cellId: CellId, direction: Direction) => {
    props.addCell(props.id, cellId, direction);
  };

  useEffect(() => {
    props.children
      .filter((cell) => typeof cell === "string")
      .forEach((cell) => {
        props.register(cell);
      });
  }, [props.children, props.register]);

  const getElement = useCallback(
    (id: string) => {
      const element = props.getElementById(id);
      if (element?.option && element?.type) {
        return { type: element.type, option: element.option };
      }
      return undefined;
    },
    [props.getElementById]
  );

  return (
    <div className="cell-column">
      {props.children.map((child) =>
        typeof child === "string" ? (
          <Cell
            key={child}
            id={child}
            addCell={addCell}
            addElement={props.addElement}
            element={getElement(child)}
          />
        ) : (
          <Row key={child.id} {...props} {...child} />
        )
      )}
    </div>
  );
});
