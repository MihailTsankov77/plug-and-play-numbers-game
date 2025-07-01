import {
  ElementType,
  GeneratorOption,
  TransformatorOption,
  TypeOption,
} from "../components/radio.selector/RadioSelector";

export const elementToFunctionMap: Record<
  TypeOption,
  {
    min: number;
    max: number;
    func: (input: number[]) => number;
  }
> = {
  "Random Number": {
    min: 0,
    max: 0,
    func: (input: number[]) => Math.floor(Math.random() * 100),
  },
  "Something Else": { min: 0, max: 0, func: (input: number[]) => 42 },
  "Plus 5": {
    min: 1,
    max: 4,
    func: (input: number[]) => input.reduce((acc, val) => acc + val, 5),
  },
  "Multiply by 2": {
    min: 1,
    max: 4,
    func: (input: number[]) => input.reduce((acc, val) => acc * val, 2),
  },
  "Delay 5 Seconds": {
    min: 1,
    max: 1,
    func: (input: number[]) => setTimeout(() => input, 5000),
  },
};
