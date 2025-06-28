import { memo } from "react";
import "./AddButton.css";

export const AddButton = memo(function AddButton(props: {
  onPress: () => void;
  animated?: boolean;
}) {
  return (
    <button
      className={`add-button ${props.animated ? "animated" : ""}`}
      onClick={props.onPress}
    >
      +
    </button>
  );
});
