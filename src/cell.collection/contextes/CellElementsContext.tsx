import React, { createContext, useContext } from "react";
import { useCellElements } from "../hooks/useCellElements";

const CellElementsContext = createContext<ReturnType<typeof useCellElements> | null>(null);

export const CellElementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useCellElements();

  return (
    <CellElementsContext.Provider value={value}>
      {children}
    </CellElementsContext.Provider>
  );
};

export const useCellElementsContext = () => {
  const context = useContext(CellElementsContext);
  if (!context) {
    throw new Error("useCellElementsContext must be used within a CellElementsProvider");
  }
  return context;
};
