import { memo } from "react";
import {
  Connection,
  ConnectionEvent,
  PossibleConnection,
} from "../../types/Connections";
import "./ConnectionButton.css";

type ConnectionState = "inactive" | "left" | "right";

export const ConnectionButton = memo(function ConnectionButton(props: {
  possibleConnection: PossibleConnection;
  connections: Connection[];
  invalidConnections: Connection[];
  addConnection: (connection: ConnectionEvent) => void;
}) {
  const allConnections = [...props.connections, ...props.invalidConnections];

  const state: ConnectionState = allConnections.some(
    (connection) =>
      connection.from === props.possibleConnection.from &&
      connection.to === props.possibleConnection.to
  )
    ? "right"
    : allConnections.some(
        (connection) =>
          connection.from === props.possibleConnection.to &&
          connection.to === props.possibleConnection.from
      )
    ? "left"
    : "inactive";

  const isValidConnection =
    state === "inactive" ||
    props.connections.some(
      (connection) =>
        (connection.from === props.possibleConnection.from &&
          connection.to === props.possibleConnection.to) ||
        (connection.from === props.possibleConnection.to &&
          connection.to === props.possibleConnection.from)
    );

  const onPress = () => {
    switch (state) {
      case "inactive": {
        props.addConnection({
          from: props.possibleConnection.from,
          to: props.possibleConnection.to,
        });
        break;
      }
      case "right": {
        props.addConnection({
          from: props.possibleConnection.to,
          to: props.possibleConnection.from,
        });
        break;
      }
      case "left": {
        props.addConnection({
          from: props.possibleConnection.from,
          to: props.possibleConnection.to,
          delete: true,
        });
        break;
      }
      default: {
        state satisfies never;
        break;
      }
    }
  };

  const coordinates = props.possibleConnection.coordinates;

  return (
    <div
      className="connection-button-container"
      style={{
        position: "absolute",
        left: `${coordinates.x}px`,
        top: `${coordinates.y}px`,
      }}
    >
      <div
        className={`connection-button ${state}`}
        style={{
          backgroundColor: isValidConnection ? "wheat" : "red",
        }}
        onClick={onPress}
      >
        <img
          src={`src/cell.collection/components/connection.button/assets/${state}.png`}
          style={
            props.possibleConnection.direction === "vertical"
              ? {
                  transform: "rotate(90deg)",
                }
              : undefined
          }
        />
      </div>
    </div>
  );
});
