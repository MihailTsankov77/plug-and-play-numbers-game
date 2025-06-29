import { memo } from "react";
import { Coordinates } from "../../types/Dimensions";
import { PossibleConnection } from "../../types/Connections";
import "./ConnectionButton.css";

export type ConnectionButtonProps = Coordinates & PossibleConnection;

export const ConnectionButton = memo(function ConnectionButton(
  props: ConnectionButtonProps
) {
  return (
    <div
      className="connection-button-container"
      style={{
        position: "absolute",
        left: `${props.x}px`,
        top: `${props.y}px`,
      }}
    >
      <div className="connection-button" />
    </div>
  );
});
