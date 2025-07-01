import { elementToFunctionMap } from "../../elements/utils/functionToElement";
import { CellId } from "../types/Cell";
import { Connection } from "../types/Connections";
import {
  ElementType,
  TypeOption,
} from "../../elements/components/radio.selector/RadioSelector";
import { useState } from "react";

export const useCellsCalculate = ({
  connections,
  generatorElements,
  cellElements,
}: {
  connections: Connection[];
  generatorElements: string[];
  cellElements: Record<string, { type: ElementType; option: TypeOption }>;
}) => {
  const [values, setValues] = useState<Record<string, number>>({});

  const triggerCalculation = () => {
    const array = generatorElements.map((element) => ({
      id: element,
      connections_count: 0,
      inputs: [],
    }));

    console.log("Initial array:", array);

    calculate({ array });
  };

  const calculate = async ({
    array,
  }: {
    array: { id: string; connections_count: number; inputs: number[] }[];
  }) => {
    if (array.length === 0) {
      console.log(values);
      console.log(connections);
      return;
    }

    for (const item of array) {
      console.log(
        `Processing item: ${item.id}, connections_count: ${item.connections_count}, inputs: ${item.inputs}`
      );
      if (item.connections_count <= item.inputs.length) {
        console.log(`Processing item: ${item.id} with inputs: ${item.inputs}`);
        array = array.filter((i) => i.id !== item.id);
        console.log(`Removed item: ${item.id} from array.`);

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
        setValues((prev) => ({ ...prev, [item.id]: value }));
        console.log(
          `Calculated value for item ${item.id}: ${value}, inputs: ${item.inputs}`
        );
      }
      updateConnectionsCountAndInputs({
        connections,
        item,
        array,
        value: values[item.id] || 0,
      });
    }
    setTimeout(() => {
      calculate({ array });
    }, 1000);
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
  };
};
