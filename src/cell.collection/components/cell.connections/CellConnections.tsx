import { memo } from "react";
import { Connection, ConnectionEvent } from "../../types/Connections";
import { ConnectionButton } from "../connection.button/ConnectionButton";
import { useCellsPossibleConnections } from "../../hooks/useCellsPossibleConnections";
import { Dimensions } from "../../types/Dimensions";

export const CellConnections = memo(function CellConnections(props: {
  cellDimensions: Record<string, Dimensions>;
  connections: Connection[];
  addConnection: (connection: ConnectionEvent) => void;
}) {
  const possibleConnections = useCellsPossibleConnections(props.cellDimensions);

  return (
    <>
      {possibleConnections.map((possibleConnection, index) => (
        <ConnectionButton
          key={index}
          possibleConnection={possibleConnection}
          connections={props.connections}
          addConnection={props.addConnection}
        />
      ))}
    </>
  );
});
