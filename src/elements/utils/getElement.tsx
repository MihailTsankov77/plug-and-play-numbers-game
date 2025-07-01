import { RandomNumbersGenerator } from "../components/generators/RandomNumbersGenerator";
import { ElementType, TypeOption } from "../components/radio.selector/RadioSelector";
import { DelayTransformator } from "../components/transformators/Delay";
import { MultiplyTransformator } from "../components/transformators/Multiply";
import { SumTransformator } from "../components/transformators/Sum";

export const getElement = (type: ElementType, option: TypeOption) => {
  if (type === "generator") {
    switch (option) {
      case "Random Number":
        return <RandomNumbersGenerator />;
      case "Something Else":
        return <div>Something Else Generator</div>;
      default:
        console.error("Unknown generator option: " + option);
        return null;
    }
  } else if (type === "transformator") {
    switch (option) {
      case "Plus 5":
        // TODO: Implement input
        return <SumTransformator sumWith={5} input={5} />;
      case "Multiply by 2":
        // TODO: Implement input
        return <MultiplyTransformator factor={2} input={5} />;
      case "Delay 5 Seconds":
        return <DelayTransformator seconds={5} input={5} />;
      default:
        console.error("Unknown transformator option: " + option);
        return null;
    }
  }

  console.error("Unknown element type: " + type);
  return null;
};