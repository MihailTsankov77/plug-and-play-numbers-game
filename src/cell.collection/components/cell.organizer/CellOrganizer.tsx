import { memo, useContext } from "react";
import "./CellOrganizer.css";
import { CellBlock } from "../cell.blocks/CellBlock";
import { useCellState } from "../../hooks/useCellState";
import { CellConnections } from "../cell.connections/CellConnections";
import { useConnectionState } from "../../hooks/useConnectionState";
import { useCellsDimensions } from "../../hooks/useCellsDimensions";
import { useCellsPossibleConnections } from "../../hooks/useCellsPossibleConnections";
import { CellElementsProvider } from "../../contextes/CellElementsContext";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cellCollection, addCell } = useCellState();

  const { cellDimensions, CellDimensionsProvider } = useCellsDimensions();

  const possibleConnections = useCellsPossibleConnections(cellDimensions);

  const { connections, addConnection } =
    useConnectionState(possibleConnections);

  return (
    <CellElementsProvider>
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
    </CellElementsProvider>
  );
});
