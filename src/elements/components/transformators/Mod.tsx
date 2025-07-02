import { BaseAction } from "../BaseAction/BaseAction";

export const ModTransformator = ({
  factor,
  value,
}: {
  value?: number;
  factor: number;
}) => {
  return <BaseAction title={`mod ${factor}`} value={value} />;
};
