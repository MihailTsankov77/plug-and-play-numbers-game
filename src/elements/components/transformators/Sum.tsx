import { useCallback } from "react";
import { BaseAction } from "../BaseAction/BaseAction";

export const SumTransformator = ({
  sumWith,
  value,
}: {
  value?: number;
  sumWith: number;
}) => {
  return <BaseAction title={`+ ${sumWith}`} value={value} />;
};
