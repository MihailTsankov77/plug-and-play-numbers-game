import { memo } from "react";
import "./ColumnExpander.css";
import { AddButton } from "../addButton/AddButton";

export const ColumnExpander = memo(function ColumnExpander(props: {
  onPress: () => void;
}) {
  return (
    <div className="column-expander" onClick={props.onPress}>
      <AddButton animated size="small" />
    </div>
  );
});
