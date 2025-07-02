import { memo, useCallback } from "react";
import "./CellOrganizer.css";
import { CellBlock } from "../cell.blocks/CellBlock";
import { useCellState } from "../../hooks/useCellState";
import { CellConnections } from "../cell.connections/CellConnections";
import { useConnectionState } from "../../hooks/useConnectionState";
import { useCellsDimensions } from "../../hooks/useCellsDimensions";
import { useCellsPossibleConnections } from "../../hooks/useCellsPossibleConnections";
import { useCellsCalculate } from "../../hooks/useCellsCalculate";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cellCollection, addCell } = useCellState();

  const { cellDimensions, CellDimensionsProvider } = useCellsDimensions();

  const possibleConnections = useCellsPossibleConnections(cellDimensions);

  const { triggerCalculation, valuesByCellId } = useCellsCalculate();

  const { connections, addConnection } =
    useConnectionState(possibleConnections);

  const triggerCalculationFunction = useCallback(() => {
    triggerCalculation({ connections });
  }, [connections]);

  return (
    <>
      <div className="cell-container">
        <CellDimensionsProvider>
          <CellBlock
            cellCollection={cellCollection}
            addCell={addCell}
            valuesByCellId={valuesByCellId}
          />
        </CellDimensionsProvider>
      </div>

      <CellConnections
        possibleConnections={possibleConnections}
        connections={connections}
        addConnection={addConnection}
      />
      <button onClick={triggerCalculationFunction}>Trigger</button>
    </>
  );
});
