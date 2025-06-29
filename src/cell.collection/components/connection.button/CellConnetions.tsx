import { memo } from "react";
import { CellConfig } from "../../types/Cell";
import { Coordinates, Dimensions } from "../../types/Dimensions";
import { PossibleConnection } from "../../types/Connections";

export const CellConnections = memo(function CellConnections(props: {
  cells: CellConfig[][];
  connections: PossibleConnection[];
  cellConfigDimensions: Dimensions;
}) {
  // TODO maybe improve move upwards
  const cellsById = props.cells
    .flat()
    .reduce<Record<string, CellConfig>>((acc, cell) => {
      acc[cell.id] = cell;
      return acc;
    }, {});

  const connectionLocations = props.connections.map<Coordinates>(
    ({ from, to, direction }) => {
      const fromCell = cellsById[from];
      const toCell = cellsById[to];

      if (!fromCell || !toCell) {
        console.warn(
          `CellConnections: Missing cell for connection from ${from} to ${to}`
        );
        return { x: 0, y: 0 };
      }

      switch (direction) {
        case "horizontal": {
          return {
            x:
              props.cellConfigDimensions.x +
              props.cellConfigDimensions.width * (fromCell.dimensions.x + 1),
            y:
              props.cellConfigDimensions.y +
              props.cellConfigDimensions.height * (fromCell.dimensions.y + 0.5),
          };
        }
        case "vertical": {
          return {
            x:
              props.cellConfigDimensions.x +
              props.cellConfigDimensions.width * (fromCell.dimensions.x + 0.5),
            y:
              props.cellConfigDimensions.y +
              props.cellConfigDimensions.height * (fromCell.dimensions.y + 1),
          };
        }
        default: {
          direction satisfies never;
          return { x: 0, y: 0 };
        }
      }
    }
  );

  return (
    <>
      {connectionLocations.map((coord, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${coord.x}px`,
            top: `${coord.y}px`,
            width: "18px",
            height: "18px",
            backgroundColor: "red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)", // Center the dot
            pointerEvents: "none", // Avoid blocking interactions
          }}
        />
      ))}
    </>
  );
});
