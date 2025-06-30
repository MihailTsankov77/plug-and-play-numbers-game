import { useRandomNumber } from "../../hooks/useRandomNumber";
import { BaseAction } from "../BaseAction/BaseAction";

export const RandomNumbersGenerator = () => {
  const { randomNumber, refreshRandomNumber } = useRandomNumber(1, 100);

  return (
    <BaseAction
      title="Random Numbers Generator"
      value={randomNumber}
      onButtonClick={refreshRandomNumber}
    />
  );
};
