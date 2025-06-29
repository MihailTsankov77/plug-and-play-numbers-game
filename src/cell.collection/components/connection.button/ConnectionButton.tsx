import { memo } from "react";
import { Coordinates } from "../../types/Dimensions";
import { PossibleConnection } from "../../types/Connections";
import "./ConnectionButton.css";

export const ConnectionButton = memo(function ConnectionButton(props: {
  coordinates: Coordinates;
  possibleConnection: PossibleConnection;
}) {
  return (
    <div
      className="connection-button-container"
      style={{
        position: "absolute",
        left: `${props.coordinates.x}px`,
        top: `${props.coordinates.y}px`,
      }}
    >
      <div className="connection-button" />
    </div>
  );
});
