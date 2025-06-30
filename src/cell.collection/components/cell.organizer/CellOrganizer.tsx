import { memo, useCallback, useState } from "react";
import "./CellOrganizer.css";
import { CellBlock } from "../cell.blocks/CellBlock";
import { ColumnExpander } from "../column.expander/ColumnExpander";
import { RowExpander } from "../row.expander/RowExpander";
import { generateEmptyCell } from "../../utils/generateCell";
import { MaxNumberOfCells } from "../../constants/CellLimits";
import { useCellState } from "../../hooks/useCellState";
import { useCellsPossibleConnections } from "../../hooks/useCellsPossibleConnections";
import { CellConnections } from "../cell.connections/CellConnetions";
import { Connection, ConnectionEvent } from "../../types/Connections";
import { useConnectionState } from "../../hooks/useConnectionState";
import { useCellsDimensions } from "../../hooks/useCellsDimensions";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cellCollection, cellsById, addCell } = useCellState(() =>
    generateEmptyCell({ x: 0, y: 0 })
  );

  const { cellDimensions, CellDimensionsProvider } = useCellsDimensions();

  const possibleConnection = useCellsPossibleConnections(cellDimensions);

  const { connections, addConnection } = useConnectionState();

  // TODO Clean up RowExpander and ColumnExpander
  // TODO reimplement the disabled logic
  // const disableAddColumn = cells[0].length >= MaxNumberOfCells.columns;
  // const disableAddRow = cells.length >= MaxNumberOfCells.rows;

  return (
    <>
      <div className="cell-organizer-1">
        {/* <ColumnExpander onPress={setters.left} disabled={disableAddColumn} /> */}

        <div className="cell-organizer-2">
          {/* <RowExpander onPress={setters.top} disabled={disableAddRow} /> */}

          <CellDimensionsProvider>
            <div className="cell-container">
              <CellBlock
                cellCollection={cellCollection}
                cellsById={cellsById}
                addCell={addCell}
              />
            </div>
          </CellDimensionsProvider>

          {/* <RowExpander onPress={setters.bottom} disabled={disableAddRow} /> */}
        </div>

        {/* <ColumnExpander onPress={setters.right} disabled={disableAddColumn} /> */}
      </div>

      <CellConnections
        possibleConnections={possibleConnection}
        connections={connections}
        addConnection={addConnection}
      />
    </>
  );
});
