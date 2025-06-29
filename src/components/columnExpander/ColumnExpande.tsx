import { memo } from "react";
import "./ColumnExpander.css";
import { AddButton } from "../addButton/AddButton";

export const ColumnExpander = memo(function ColumnExpander(props: {
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`column-expander ${props.disabled ? "disabled" : "enabled"}`}
      onClick={!props.disabled ? props.onPress : undefined}
    >
      <AddButton animated size="small" />
    </div>
  );
});
