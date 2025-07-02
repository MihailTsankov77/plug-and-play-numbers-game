import { memo } from "react";
import { Connection, PossibleConnection } from "../../types/Connections";
import { ConnectionButton } from "../connection.button/ConnectionButton";

export const CellConnections = memo(function CellConnections(props: {
  possibleConnections: PossibleConnection[];
  connections: Connection[];
  invalidConnections: Connection[];
  addConnection: (connection: Connection) => void;
}) {
  return (
    <>
      {props.possibleConnections.map((possibleConnection, index) => (
        <ConnectionButton
          key={index}
          possibleConnection={possibleConnection}
          connections={props.connections}
          invalidConnections={props.invalidConnections}
          addConnection={props.addConnection}
        />
      ))}
    </>
  );
});
