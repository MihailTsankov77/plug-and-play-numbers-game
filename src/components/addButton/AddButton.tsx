import { memo } from "react";
import "./AddButton.css";

export const AddButton = memo(function AddButton(props: {
  onPress?: () => void;
  /** @default `medium` */
  size?: "small" | "medium";
  animated?: boolean;
}) {
  const sizeClass = props.size === "small" ? "small" : "medium";

  return (
    <button
      className={`add-button ${props.animated ? "animated" : ""} ${sizeClass}`}
      onClick={props.onPress}
    >
      +
    </button>
  );
});
