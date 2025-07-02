import React, { useMemo, useState } from "react";
import { Button } from "../../../common/components/button/Button";
import { RadioButton } from "../../../common/components/radiobutton/RadioButton";

const typeOptions = ["generator", "transformator"] as const;
export type ElementType = (typeof typeOptions)[number];

const generatorOptions = [
  "Random Number",
  "Even Number",
  "Odd Number",
  "Something Else",
] as const;
const transformatorOptions = [
  "Plus 5",
  "Multiply by 2",
  "Mod 10",
  "Sum",
  "Delay",
] as const;

export type GeneratorOption = (typeof generatorOptions)[number];
export type TransformatorOption = (typeof transformatorOptions)[number];

const options = [...generatorOptions, ...transformatorOptions];
export type TypeOption = (typeof options)[number];

export const RadioSelector = ({
  onSubmit,
}: {
  onSubmit: (type: ElementType, option: TypeOption) => void;
}) => {
  const [selectedType, setSelectedType] = useState<ElementType | null>(null);
  const [selectedOption, setSelectedOption] = useState<TypeOption | null>(null);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as ElementType;
    setSelectedType(value);
    setSelectedOption(null);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as TypeOption);
  };

  const options = {
    generator: generatorOptions,
    transformator: transformatorOptions,
  };

  const generateText = useMemo(() => {
    if (selectedType === "generator") {
      return "Choose a Generator:";
    }
    return "Choose a Transformator:";
  }, [selectedType]);

  return (
    <>
      <h3>Select Type</h3>
      {typeOptions.map((type, index) => (
        <RadioButton
          key={index}
          value={type}
          checked={selectedType === type}
          onChange={handleTypeChange}
          text={type.charAt(0).toUpperCase() + type.slice(1)}
        />
      ))}

      {selectedType && (
        <>
          <h4>{generateText}</h4>
          {options[selectedType].map((option, index) => (
            <RadioButton
              key={index}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              text={option}
              className="block"
            />
          ))}
        </>
      )}

      {selectedType && selectedOption && (
        <Button onClick={() => onSubmit(selectedType, selectedOption)} />
      )}
    </>
  );
};
