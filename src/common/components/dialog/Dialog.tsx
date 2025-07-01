import React from "react";
import "./Dialog.css";

export const Dialog = ({
  open,
  onClose,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  if (!open) return null;

  return (
    <div className={`dialog-backdrop ${className}`} onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close-button" onClick={onClose}>
          ✕
        </button>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};
