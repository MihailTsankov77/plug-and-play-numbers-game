import { Dialog } from "../../../common/components/dialog/Dialog";
import {
  RadioSelector,
  ElementType,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";

export const AddItemDialog = ({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (type: ElementType, option: TypeOption) => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <RadioSelector
        onSubmit={onAdd}
      />
    </Dialog>
  );
};
