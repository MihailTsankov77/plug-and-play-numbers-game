import { useCallback, useState } from "react";
import {
  ElementType,
  TypeOption,
} from "../../elements/components/radio.selector/RadioSelector";
import { CellId } from "../types/Cell";

type CellElement = Record<CellId, { type: ElementType; option: TypeOption }>;

export const useCellElements = () => {
  const [cellElements, setCellElements] = useState<CellElement>({});

  const addElement = useCallback(
    (id: string, type: ElementType, option: TypeOption) => {
      setCellElements((prev) => ({ ...prev, [id]: { type, option } }));
    },
    []
  );

  return {
    addElement,
    cellElements,
  };
};
