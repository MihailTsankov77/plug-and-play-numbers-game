import { memo } from "react";
import "./RowExpander.css";
import { AddButton } from "../addButton/AddButton";

export const RowExpander = memo(function RowExpander(props: {
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`row-expander ${props.disabled ? "disabled" : "enabled"}`}
      onClick={!props.disabled ? props.onPress : undefined}
    >
      <AddButton animated size="small" />
    </div>
  );
});
