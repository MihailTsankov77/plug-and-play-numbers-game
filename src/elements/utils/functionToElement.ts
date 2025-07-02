import {
  ElementType,
  GeneratorOption,
  TransformatorOption,
  TypeOption,
} from "../components/radio.selector/RadioSelector";

export function* generateNumbers({
  condition,
}: {
  condition: (i: number) => boolean;
}): Generator<number> {
  for (let i = 1; ; i++) {
    if (condition(i)) {
      yield i;
    }
  }
}

const numbersGenerators: Partial<
  Record<TypeOption, Generator<number, any, any>>
> = {
  "Odd Number": generateNumbers({ condition: (num) => num % 2 === 1 }),
  "Even Number": generateNumbers({ condition: (num) => num % 2 === 0 }),
};

export const elementToFunctionMap: Record<
  TypeOption,
  {
    min: number;
    max: number;
    func: (input: number[]) => number | Promise<number>;
  }
> = {
  "Random Number": {
    min: 0,
    max: 0,
    func: () => Math.floor(Math.random() * 100),
  },
  "Even Number": {
    min: 0,
    max: 0,
    func: () => numbersGenerators["Even Number"]?.next().value,
  },
  "Odd Number": {
    min: 0,
    max: 0,
    func: () => numbersGenerators["Odd Number"]?.next().value,
  },
  "Something Else": {
    min: 0,
    max: 0,
    func: () => 42,
  },
  "Plus 5": {
    min: 1,
    max: 4,
    func: (input) => input.reduce((acc, val) => acc + val, 5),
  },
  "Multiply by 2": {
    min: 1,
    max: 4,
    func: (input) => input.reduce((acc, val) => acc * val, 2),
  },
  "Mod 10": {
    min: 1,
    max: 1,
    func: (input) => input[0] % 10,
  },
  Sum: {
    min: 1,
    max: 4,
    func: (input) => input.reduce((acc, val) => acc + val, 0),
  },
  Delay: {
    min: 1,
    max: 1,
    func: (input: number[]) => {
      return new Promise(() => setTimeout(() => input[0], 5000));
    },
  },
};
