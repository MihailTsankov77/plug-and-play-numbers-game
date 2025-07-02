import { CellId } from "../../cell.collection/types/Cell";
import { RandomNumbersGenerator } from "../components/generators/RandomNumbersGenerator";
import {
  ElementType,
  TypeOption,
} from "../components/radio.selector/RadioSelector";
import { ModTransformator } from "../components/transformators/Mod";
import { MultiplyTransformator } from "../components/transformators/Multiply";
import { SumTransformator } from "../components/transformators/Sum";

export const Element = (props: {
  type: ElementType;
  option: TypeOption;
  cellId: CellId;
  value?: number;
}) => {
  if (props.type === "generator") {
    switch (props.option) {
      case "Random Number":
        return <RandomNumbersGenerator value={props.value} />;
      case "Something Else":
        return <div>Something Else Generator</div>;
      default:
        console.error("Unknown generator option: " + props.option);
        return null;
    }
  } else if (props.type === "transformator") {
    switch (props.option) {
      case "Plus 5":
        return <SumTransformator sumWith={5} value={props.value} />;
      case "Multiply by 2":
        return <MultiplyTransformator factor={2} value={props.value} />;
      case "Mod 10":
        return <ModTransformator factor={10} value={props.value} />;
      default:
        console.error("Unknown transformator option: " + props.option);
        return null;
    }
  }

  console.error("Unknown element type: " + props.type);
  return null;
};
