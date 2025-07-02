import { memo } from "react";
import { Connection, PossibleConnection } from "../../types/Connections";
import "./ConnectionButton.css";

export const ConnectionButton = memo(function ConnectionButton(props: {
  possibleConnection: PossibleConnection;
  connections: Connection[];
  invalidConnections: Connection[];
  addConnection: (connection: Connection) => void;
}) {
  const findConnection = (connection: Connection) =>
    (connection.from === props.possibleConnection.from &&
      connection.to === props.possibleConnection.to) ||
    (connection.from === props.possibleConnection.to &&
      connection.to === props.possibleConnection.from);

  const validConnections = props.connections.find(findConnection);
  const invalidConnections = !validConnections
    ? props.invalidConnections.find(findConnection)
    : undefined;

  const state = (validConnections ?? invalidConnections)?.state ?? "inactive";

  const isValidConnection = state === "inactive" || validConnections;

  const onPress = () => {
    switch (state) {
      case "inactive": {
        props.addConnection({
          from: props.possibleConnection.from,
          to: props.possibleConnection.to,
          state: "right",
        });
        break;
      }
      case "right": {
        props.addConnection({
          from: props.possibleConnection.to,
          to: props.possibleConnection.from,
          state: "left",
        });
        break;
      }
      case "left": {
        props.addConnection({
          from: props.possibleConnection.from,
          to: props.possibleConnection.to,
          state: "inactive",
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
