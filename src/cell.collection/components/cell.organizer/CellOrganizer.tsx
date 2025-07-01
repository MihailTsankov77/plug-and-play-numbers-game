import { Dispatch, memo, SetStateAction, useContext, useState } from "react";
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
import { useCellsCalculate } from "../../hooks/useCellsCalculate";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cellCollection, addCell } = useCellState();

  const { cellDimensions, CellDimensionsProvider } = useCellsDimensions();

  const possibleConnections = useCellsPossibleConnections(cellDimensions);

  const { connections, addConnection } =
    useConnectionState(possibleConnections);

  const { generatorElements, cellElements } = useCellElementsContext();

  const { triggerCalculation, values } = useCellsCalculate({
    connections,
    generatorElements,
    cellElements,
  });

  console.log("CellOrganizer render", values);

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
      <button onClick={triggerCalculation}>Trigger</button>
    </>
  );
});
