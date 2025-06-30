import { useCallback, useState } from "react";
import { ElementType, TypeOption } from "../../elements/components/radio.selector/RadioSelector";

export const useCellElements = () => {
  const [cellElements, setCellElements] = useState<
    { id: string; type?: ElementType; option?: TypeOption }[]
  >([]);

  const registerCell = useCallback((id: string) => {
    if (!cellElements.some((cell) => cell.id === id)) {
      setCellElements((prev) => [...prev, { id }]);
    }
  }, []);

  const addElement = useCallback(
    (id: string, type: ElementType, option: TypeOption) => {
      alert("Adding element to cell: " + id);
      setCellElements((prev) =>
        prev.map((cell) => (cell.id === id ? { ...cell, type, option } : cell))
      );
    },
    []
  );

  const getElementById = useCallback(
    (id: string) => {
      return cellElements.find((cell) => cell.id === id);
    },
    [cellElements]
  );

  return {
    registerCell,
    addElement,
    getElementById,
    cellElements,
  };
};
