import { Dialog } from "../../../common/components/dialog/Dialog";
import {
  RadioSelector,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";

export const AddItemDialog = ({
  open,
  onClose,
  cellId,
}: {
  open: boolean;
  onClose: () => void;
  cellId: string;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <RadioSelector
        onSubmit={(type: TypeOption, option: string) => {
          alert(`Selected: ${type} - ${option} for Cell ID: ${cellId}`);
          onClose();
        }}
      />
    </Dialog>
  );
};
