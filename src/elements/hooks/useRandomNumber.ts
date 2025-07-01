import { useState } from "react";


export const useRandomNumber = (min: number, max: number): {
    randomNumber: number;
    refreshRandomNumber: () => void;
}  => {
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  const refreshRandomNumber = () => {
    setRandomNumber(generateRandomNumber());
  };

  return { randomNumber, refreshRandomNumber };
}