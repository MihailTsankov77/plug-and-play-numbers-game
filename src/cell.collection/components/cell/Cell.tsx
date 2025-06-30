import { memo, useCallback, useState } from "react";
import "./Cell.css";
import { AddButton } from "../add.button/AddButton";
import { CellConfig } from "../../types/Cell";
import { AddItemDialog } from "../add.item.dialog/AddItemDialog";

export const Cell = memo(function Cell(props: CellConfig) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className="cell">
      <AddButton onPress={handleOpen} />
      {open && <AddItemDialog open={open} onClose={handleClose} cellId={props.id} />}
    </div>
  );
});
