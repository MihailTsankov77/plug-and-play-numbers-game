import { useCallback } from "react";
import { BaseAction } from "../BaseAction/BaseAction";

export const SumTransformator = ({sumWith, input} : {input: number; sumWith: number}) => {
  const transform = useCallback((value: number): number => {
    return value + sumWith;
  }, [sumWith]);

  return (
    <BaseAction
      title={`+ ${sumWith}`}
      value={transform(input)}
    />
  );
};
