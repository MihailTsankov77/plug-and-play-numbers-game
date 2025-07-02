import { elementToFunctionMap } from "../../elements/utils/functionToElement";
import { Connection } from "../types/Connections";
import { useRef, useState } from "react";
import { useCellElementsContext } from "../contextes/CellElementsContext";
import { CellId } from "../types/Cell";

type Calculation = {
  id: CellId;
  connections_count: number;
  inputs: number[];
};

export function useCellsCalculate(): {
  valuesByCellId: Record<CellId, number | undefined>;
  triggerCalculation: (params: { connections: Connection[] }) => void;
} {
  const [values, setValues] = useState<Record<CellId, number>>({});

  const { cellElements, generatorElements } = useCellElementsContext();

  const calculationsRef = useRef<Calculation[]>([]);

  const triggerCalculation = ({
    connections,
  }: {
    connections: Connection[];
  }) => {
    setValues({});

    calculationsRef.current = generatorElements.map<Calculation>((element) => ({
      id: element,
      connections_count: 0,
      inputs: [],
    }));

    calculate({ connections });
  };

  const calculate = async ({ connections }: { connections: Connection[] }) => {
    if (calculationsRef.current.length === 0) {
      return;
    }

    for (const item of calculationsRef.current) {
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

        switch (info.type) {
          case "sync": {
            const value = info.func(item.inputs);
            setValues((prev) => ({
              ...prev,
              [item.id]: value,
            }));

            updateConnectionsCountAndInputs({
              connections,
              item,
              value,
            });

            // Remove the item after processing
            const index = calculationsRef.current.findIndex(
              (i) => i.id === item.id
            );
            if (index !== -1) {
              calculationsRef.current.splice(index, 1);
            }

            break;
          }

          case "async": {
            info.func(item.inputs).then((value) => {
              setValues((prev) => ({
                ...prev,
                [item.id]: value,
              }));

              updateConnectionsCountAndInputs({
                connections,
                item,
                value,
              });

              // Remove the item after processing
              const index = calculationsRef.current.findIndex(
                (i) => i.id === item.id
              );
              if (index !== -1) {
                calculationsRef.current.splice(index, 1);
              }

              calculate({ connections });
            });
            break;
          }

          default: {
            info satisfies never;
          }
        }
      }
    }

    // Continue processing the remaining array after a delay
    setTimeout(() => {
      calculate({ connections });
    }, 500);
  };

  const updateConnectionsCountAndInputs = ({
    connections,
    item,
    value,
  }: {
    connections: Connection[];
    item: Calculation;
    value: number;
  }) => {
    for (const connection of connections) {
      if (connection.from === item.id) {
        const toItem = calculationsRef.current.find(
          (i) => i.id === connection.to
        );
        if (toItem) {
          toItem.inputs.push(value);
        } else {
          calculationsRef.current.push({
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
