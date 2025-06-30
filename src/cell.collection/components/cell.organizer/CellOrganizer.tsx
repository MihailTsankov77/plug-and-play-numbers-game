import { memo, useCallback, useState } from "react";
import "./CellOrganizer.css";
import { CellBlock } from "../cell.blocks/CellBlock";
import { ColumnExpander } from "../column.expander/ColumnExpander";
import { RowExpander } from "../row.expander/RowExpander";
import { generateEmptyCell } from "../../utils/generateCell";
import { MaxNumberOfCells } from "../../constants/CellLimits";
import { useCellState } from "../../hooks/useCellState";
import { useCellsPossibleConnections } from "../../hooks/useCellsPossibleConnections";
import { useCellsDimensionConfig } from "../../hooks/useCellsDimensionConfig";
import { CellConnections } from "../cell.connections/CellConnetions";
import { Connection, ConnectionEvent } from "../../types/Connections";
import { useConnectionState } from "../../hooks/useConnectionState";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cellCollection, cellsById, addCell } = useCellState(() =>
    generateEmptyCell({ x: 0, y: 0 })
  );

  const { connections, addConnection } = useConnectionState();

  // TODO uncomment
  // const possibleConnection = useCellsPossibleConnections(cells);

  // const { containerRef, dimensions } = useCellsDimensionConfig(cells);

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

          <div className="cell-container" /*ref={containerRef}*/>
            <CellBlock
              cellCollection={cellCollection}
              cellsById={cellsById}
              addCell={addCell}
            />
          </div>

          {/* <RowExpander onPress={setters.bottom} disabled={disableAddRow} /> */}
        </div>

        {/* <ColumnExpander onPress={setters.right} disabled={disableAddColumn} /> */}
      </div>

      {/* <CellConnections
        cells={cells}
        possibleConnections={possibleConnection}
        cellConfigDimensions={dimensions}
        connections={connections}
        addConnection={addConnection}
      /> */}
    </>
  );
});
