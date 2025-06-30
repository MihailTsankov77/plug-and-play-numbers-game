import React, { useMemo, useState } from "react";
import { Button } from "../../../common/components/button/Button";
import { RadioButton } from "../../../common/components/radiobutton/RadioButton";

const typeOptions = ["generator", "transformator"] as const;
export type TypeOption = (typeof typeOptions)[number];

export const RadioSelector = ({
  onSubmit,
}: {
  onSubmit: (type: TypeOption, option: string) => void;
}) => {
  const [selectedType, setSelectedType] = useState<TypeOption | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as TypeOption;
    setSelectedType(value);
    setSelectedOption(null);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const options = {
    generator: ["Gen A", "Gen B", "Gen C"],
    transformator: ["Trans X", "Trans Y"],
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
