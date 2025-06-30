import { memo } from "react";
import "./CellBlock.css";
import { Cell } from "../cell/Cell";
import { CellId, CellCollection, CellColumn, CellRow } from "../../types/Cell";
import { Direction } from "../../types/Dimensions";

type CommonProps = {
  addCell: (containerId: string, cellId: CellId, direction: Direction) => void;
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

  return (
    <div className="cell-row">
      {props.children.map((child) =>
        typeof child === "string" ? (
          <Cell key={child} id={child} addCell={addCell} />
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

  return (
    <div className="cell-column">
      {props.children.map((child) =>
        typeof child === "string" ? (
          <Cell key={child} id={child} addCell={addCell} />
        ) : (
          <Row key={child.id} {...props} {...child} />
        )
      )}
    </div>
  );
});
