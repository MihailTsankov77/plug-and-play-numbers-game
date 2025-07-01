import { useCallback } from "react";
import { useRandomNumber } from "../../hooks/useRandomNumber";
import { BaseAction } from "../BaseAction/BaseAction";

export const MultiplyTransformator = ({factor, input} : {input: number; factor: number}) => {
  const transform = useCallback((value: number): number => {
    return value * factor;
  }, [factor]);

  return (
    <BaseAction
      title={`x ${factor}`}
      value={transform(input)}
    />
  );
};
