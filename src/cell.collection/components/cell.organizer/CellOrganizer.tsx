import { memo, useContext, useState } from "react";
import "./CellOrganizer.css";
import { CellBlock } from "../cell.blocks/CellBlock";
import { useCellState } from "../../hooks/useCellState";
import { CellConnections } from "../cell.connections/CellConnections";
import { useConnectionState } from "../../hooks/useConnectionState";
import { useCellsDimensions } from "../../hooks/useCellsDimensions";
import { useCellsPossibleConnections } from "../../hooks/useCellsPossibleConnections";
import {
  CellElementsProvider,
  useCellElementsContext,
} from "../../contextes/CellElementsContext";
import { Connection } from "../../types/Connections";
import {
  ElementType,
  TypeOption,
} from "../../../elements/components/radio.selector/RadioSelector";
import { elementToFunctionMap } from "../../../elements/utils/functionToElement";
import { CellId } from "../../types/Cell";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cellCollection, addCell } = useCellState();

  const { cellDimensions, CellDimensionsProvider } = useCellsDimensions();

  const possibleConnections = useCellsPossibleConnections(cellDimensions);

  const { connections, addConnection } =
    useConnectionState(possibleConnections);

  const { generatorElements, cellElements } = useCellElementsContext();
  const [values, setValues] = useState<Record<string, number>>({});

  return (
    <>
      <div className="cell-container">
        <CellDimensionsProvider>
          <CellBlock cellCollection={cellCollection} addCell={addCell} />
        </CellDimensionsProvider>
      </div>

      <CellConnections
        possibleConnections={possibleConnections}
        connections={connections}
        addConnection={addConnection}
      />
      <button
        onClick={() =>
          trigger({
            connections,
            generatorElements,
            cellElements,
            values,
            setValues,
          })
        }
      >
        Trigger
      </button>
    </>
  );
});

const trigger = ({
  connections,
  generatorElements,
  cellElements,
  values,
  setValues,
}: {
  connections: Connection[];
  generatorElements: string[];
  cellElements: Record<string, { type: ElementType; option: TypeOption }>;
  values: Record<string, number>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) => {
  const array = generatorElements.map((element) => ({
    id: element,
    connections_count: 0,
    inputs: [],
  }));

  console.log("Initial array:", array);

  calculate({
    array,
    values,
    setValues,
    connections,
    cellElements,
  });
};

const calculate = async ({
  array,
  values,
  setValues,
  connections,
  cellElements,
}: {
  array: { id: string; connections_count: number; inputs: number[] }[];
  values: Record<string, number>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  connections: Connection[];
  cellElements: Record<CellId, { type: ElementType; option: TypeOption }>;
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
              connections_count: getConnectionsCount(
                connections,
                connection.to
              ),
              inputs: [value],
            });
          }
        }
      }
    }
  }
  setTimeout(() => {
    calculate({ array, values, setValues, connections, cellElements });
  }, 1000);
};

const getConnectionsCount = (connections: Connection[], id: string): number => {
  return connections.filter((c) => c.to === id).length;
};
