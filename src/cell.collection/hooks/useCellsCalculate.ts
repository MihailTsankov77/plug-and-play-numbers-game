import { elementToFunctionMap } from "../../elements/utils/functionToElement";
import { Connection } from "../types/Connections";
import { useState } from "react";
import { useCellElementsContext } from "../contextes/CellElementsContext";
import { CellId } from "../types/Cell";

export function useCellsCalculate(): {
  valuesByCellId: Record<CellId, number | undefined>;
  triggerCalculation: (params: { connections: Connection[] }) => void;
} {
  const [values, setValues] = useState<Record<CellId, number>>({});

  const { cellElements, generatorElements } = useCellElementsContext();

  const triggerCalculation = ({
    connections,
  }: {
    connections: Connection[];
  }) => {
    setValues({});

    const array = generatorElements.map((element) => ({
      id: element,
      connections_count: 0,
      inputs: [],
    }));

    calculate({ array, connections });
  };

  const calculate = async ({
    array,
    connections,
  }: {
    array: { id: CellId; connections_count: number; inputs: number[] }[];
    connections: Connection[];
  }) => {
    if (array.length === 0) {
      return;
    }

    const nextArray = [...array];

    for (const item of array) {
      if (item.connections_count <= item.inputs.length) {
        const element = cellElements[item.id];
        const info = elementToFunctionMap[element.option];

        if (!info) {
          console.error(`Element ${item.id} has no function defined.`);
          continue;
        }

        if (info.min > item.inputs.length || info.max < item.inputs.length) {
          console.error(
            `Element ${item.id} has invalid inputs: ${item.inputs}. Expected between ${info.min} and ${info.max}.`
          );
          continue;
        }

        const value = info.func(item.inputs);
        setValues((prev) => ({
          ...prev,
          //   Тук е проверката дали е Promise, ако е, изчакваме да се изпълни
          [item.id]: value,
        }));

        updateConnectionsCountAndInputs({
          connections,
          item,
          array: nextArray,
          value,
        });

        // Remove the item after processing
        const index = nextArray.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          nextArray.splice(index, 1);
        }
      }
    }

    // Continue processing the remaining array after a delay
    setTimeout(() => {
      calculate({ array: nextArray, connections });
    }, 500);
  };

  const updateConnectionsCountAndInputs = ({
    connections,
    item,
    array,
    value,
  }: {
    connections: Connection[];
    item: { id: string; connections_count: number; inputs: number[] };
    array: { id: string; connections_count: number; inputs: number[] }[];
    value: number;
  }) => {
    for (const connection of connections) {
      if (connection.from === item.id) {
        const toItem = array.find((i) => i.id === connection.to);
        if (toItem) {
          toItem.inputs.push(value);
        } else {
          array.push({
            id: connection.to,
            connections_count: getConnectionsCount(connections, connection.to),
            inputs: [value],
          });
        }
      }
    }
  };

  const getConnectionsCount = (
    connections: Connection[],
    id: string
  ): number => {
    return connections.filter((c) => c.to === id).length;
  };

  return {
    triggerCalculation,
    valuesByCellId: values,
  };
}
