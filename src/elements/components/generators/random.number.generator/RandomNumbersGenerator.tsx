import { useState } from "react";
import "./RandomNumbersGenerator.css"; 
import Card from "../../card/Card";
import { useRandomNumber } from "../../../hooks/useRandomNumber";

export const RandomNumbersGenerator = () => {
  const { randomNumber, refreshRandomNumber } =useRandomNumber(1, 100)

  return (
    <Card >
      <div className="rng-wrapper">
        <h4 className="rng-title">Random Numbers Generator</h4>
        <div className="number-box">{randomNumber}</div>
        <GenerateButton onClick={refreshRandomNumber}/>
      </div>
    </Card>
  );
};

const GenerateButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="rng-button" onClick={onClick}>
      Next
    </button>
  );
}