import { memo } from "react";
import "./RowExpander.css";
import { AddButton } from "../addButton/AddButton";

export const RowExpander = memo(function RowExpander(props: {
  onPress: () => void;
}) {
  return (
    <div className="row-expander" onClick={props.onPress}>
      <AddButton animated size="small" />
    </div>
  );
});
