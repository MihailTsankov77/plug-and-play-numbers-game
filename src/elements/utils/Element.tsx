import { CellId } from "../../cell.collection/types/Cell";
import { BaseAction } from "../components/BaseAction/BaseAction";
import {
  ElementType,
  TypeOption,
} from "../components/radio.selector/RadioSelector";

const generatorTexts: Record<TypeOption, string> = {
  "Random Number": "Generate a random number",
  "Something Else": "Do something else",
  "Even Number": "Generate an even number",
  "Odd Number": "Generate an odd number",
  "Plus 5": "+ 5 ",
  "Multiply by 2": "x 2",
  "Mod 10": "% 10",
  Sum: "Sum",
};

export const Element = (props: {
  type: ElementType;
  option: TypeOption;
  cellId: CellId;
  value?: number;
}) => {
  return (
    <BaseAction
      value={props.value}
      title={generatorTexts[props.option] || "Unknown Generator"}
    />
  );
};
