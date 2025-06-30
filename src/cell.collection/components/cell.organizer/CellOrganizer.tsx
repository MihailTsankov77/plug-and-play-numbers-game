import { memo } from "react";
import "./CellOrganizer.css";
import { CellBlock } from "../cell.blocks/CellBlock";
import { useCellState } from "../../hooks/useCellState";
import { CellConnections } from "../cell.connections/CellConnections";
import { useConnectionState } from "../../hooks/useConnectionState";
import { useCellsDimensions } from "../../hooks/useCellsDimensions";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cellCollection, addCell } = useCellState();

  const { cellDimensions, CellDimensionsProvider } = useCellsDimensions();

  const { connections, addConnection } = useConnectionState();

  return (
    <>
      <div className="cell-container">
        <CellDimensionsProvider>
          <CellBlock cellCollection={cellCollection} addCell={addCell} />
        </CellDimensionsProvider>
      </div>

      <CellConnections
        cellDimensions={cellDimensions}
        connections={connections}
        addConnection={addConnection}
      />
    </>
  );
});
