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

  const { validConnections, invalidConnections, addConnection } =
    useConnectionState(possibleConnections);

  const { triggerCalculation, valuesByCellId } = useCellsCalculate();

  const triggerCalculationFunction = useCallback(() => {
    triggerCalculation({ connections: validConnections });
  }, [validConnections]);

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
        connections={validConnections}
        invalidConnections={invalidConnections}
        addConnection={addConnection}
      />
      <button onClick={triggerCalculationFunction}>Trigger</button>
    </>
  );
});
