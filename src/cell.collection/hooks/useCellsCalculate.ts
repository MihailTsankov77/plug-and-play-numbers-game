import { elementToFunctionMap } from "../../elements/utils/functionToElement";
import { Connection } from "../types/Connections";
import { useState } from "react";
import { useCellElementsContext } from "../contextes/CellElementsContext";
import { CellId } from "../types/Cell";

export const useCellsCalculate = () => {
  const [values, setValues] = useState<
    Record<
      CellId,
      {
        value: number;
        func: ((n: number[]) => void) | ((n: number[]) => number);
      }
    >
  >({});

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

    console.log("Initial array:", array);

    calculate({ array, connections });

    console.log("Final values:", values);
    console.log("Connections:", connections);
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
          [item.id]: { value, func: info.func },
        }));
        console.log(
          `Calculated value for item ${item.id}: ${value}, inputs: ${item.inputs}`
        );

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
          console.log(`Adding value ${value} to item ${toItem.id} inputs.`);
          toItem.inputs.push(value);
        } else {
          console.warn(
            `No item found for connection to ${connection.to}. Adding new item.`
          );
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
    values,
  };
};
