import React from "react";
import "./Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`custom-card ${className ? className : ""}`}>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;


