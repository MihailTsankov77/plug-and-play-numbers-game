import { useState } from "react";
import Card from "../card/Card";
import "./BaseAction.css";

export const BaseAction = ({
  title,
  value,
  className,
  buttonText = "Next",
  onButtonClick,
}: {
  title: string;
  value: number | string;
  className?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}) => {
  return (
    <Card className={className}>
      <div className="wrapper">
        <div className="title">{title}</div>
        <div className="number-box">{value}</div>
        {onButtonClick && (
          <button className="button" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </Card>
  );
};
