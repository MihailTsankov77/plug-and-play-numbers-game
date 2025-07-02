import { BaseAction } from "../BaseAction/BaseAction";

export const RandomNumbersGenerator = ({ value }: { value?: number }) => {
  return <BaseAction title="Random Numbers Generator" value={value} />;
};
