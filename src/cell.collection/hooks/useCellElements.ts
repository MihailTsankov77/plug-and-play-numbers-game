import {useCallback, useState } from "react";
import {
  ElementType,
  TypeOption,
} from "../../elements/components/radio.selector/RadioSelector";

type BaseCell = { id: string };

type GeneratorCell = {
  type: "generator";
  option: TypeOption;
  output?: number;
};

type TransformatorCell = {
  type: "transformator";
  option: TypeOption;
  input?: string[]; // Ids
  output?: number;
  transform?: (input: number | number[]) => number;
};

type CellElement = BaseCell &
  (Partial<GeneratorCell> | Partial<TransformatorCell>);

const isTransformatorCell = (
  cell: CellElement
): cell is BaseCell & TransformatorCell => {
  return cell.type === "transformator";
}

const isGeneratorCell = (
  cell: CellElement
): cell is BaseCell & GeneratorCell => {
  return cell.type === "generator";
}

export const useCellElements = () => {
  const [cellElements, setCellElements] = useState<CellElement[]>([]);

  const registerCell = useCallback((id: string) => {
    setCellElements((prev) =>
      prev.some((cell) => cell.id === id) ? prev : [...prev, { id }]
    );
  }, []);

  const addElement = useCallback(
    (id: string, type: ElementType, option: TypeOption) => {
      setCellElements((prev) =>
        prev.map((cell) => (cell.id === id ? { ...cell, type, option } : cell))
      );
    },
    []
  );

  const getElementById = useCallback(
    (id: string) => cellElements.find((cell) => cell.id === id),
    [cellElements]
  );

  const getInput = useCallback(
    (id: string) => {
      const cell = getElementById(id);

      if (cell && isTransformatorCell(cell)) {
        return cell.input?.map((el) => {
          const inputCell = getElementById(el);
          if (inputCell?.type) {
            return inputCell.output;
          }
          return undefined;
        });
      }
      return undefined;
    },
    [getElementById]
  );

  const addInput = useCallback((id: string, inputId: string) => {
    const existingCell = getElementById(id);
    if (existingCell && isTransformatorCell(existingCell)) {
      setCellElements(prev =>
        prev.map(cellItem =>
          cellItem.id === id && isTransformatorCell(cellItem)
            ? { ...cellItem, input: [...(cellItem.input ?? []), inputId] }
            : cellItem
        )
      );
    }
  }, [getElementById]);

  const removeInput = useCallback((id: string, inputId: string) => {
    const existingCell = getElementById(id);
    if (existingCell && isTransformatorCell(existingCell)) {
      setCellElements(prev =>
        prev.map(cellItem =>
          cellItem.id === id && isTransformatorCell(cellItem)
            ? { ...cellItem, input: cellItem.input?.filter(el => el !== inputId) }
            : cellItem
        )
      );
    }
  }, [getElementById]);

  const getOutput = useCallback(
    (id: string): number | undefined => {
      const cell = getElementById(id);

      if (!cell?.type) return undefined;

      return cell.output;
    },
    [getElementById]
  );

  return {
    registerCell,
    addElement,
    getElementById,
    getInput,
    cellElements,
    getOutput,
    addInput,
    removeInput
  };
};
