import { memo } from "react";
import "./CellBlock.css";
import { Cell } from "../cell/Cell";
import { CellConfig, CellId } from "../../types/Cell";
import {
  CellCollection,
  CellColumn,
  CellRow,
} from "../../types/CellCollection";
import { Direction } from "../../types/Dimensions";

type CommonProps = {
  cellsById: Record<string, CellConfig>;
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
          <Cell key={child} {...props.cellsById[child]} addCell={addCell} />
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
      {props.children.map((row) =>
        typeof row === "string" ? (
          <Cell key={row} {...props.cellsById[row]} addCell={addCell} />
        ) : (
          <Row key={row.id} {...props} {...row} />
        )
      )}
    </div>
  );
});
