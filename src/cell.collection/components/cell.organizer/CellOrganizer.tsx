import { memo, useCallback, useState } from "react";
import "./CellOrganizer.css";
import { CellRow } from "../cell.row/CellRow";
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
import { ElementType, TypeOption } from "../../../elements/components/radio.selector/RadioSelector";
import { useCellElements } from "../../hooks/useCellElements";

export const CellOrganizer = memo(function CellOrganizer() {
  const { cells, setters } = useCellState(() => [
    [generateEmptyCell({ x: 0, y: 0 })],
  ]);

  const { connections, addConnection } = useConnectionState();

  const possibleConnection = useCellsPossibleConnections(cells);

  const { containerRef, dimensions } = useCellsDimensionConfig(cells);

  const disableAddColumn = cells[0].length >= MaxNumberOfCells.columns;
  const disableAddRow = cells.length >= MaxNumberOfCells.rows;

  const {
    registerCell,
    addElement,
    getElementById,
  } = useCellElements();

  return (
    <>
      <div className="cell-organizer-1">
        <ColumnExpander onPress={setters.left} disabled={disableAddColumn} />

        <div className="cell-organizer-2">
          <RowExpander onPress={setters.top} disabled={disableAddRow} />

          <div className="cell-container" ref={containerRef}>
            {cells.map((cellsPerRow, index) => (
              <CellRow key={index} cells={cellsPerRow} register={registerCell} addElement={addElement} getElementById={getElementById}/>
            ))}
          </div>

          <RowExpander onPress={setters.bottom} disabled={disableAddRow} />
        </div>

        <ColumnExpander onPress={setters.right} disabled={disableAddColumn} />
      </div>

      <CellConnections
        cells={cells}
        possibleConnections={possibleConnection}
        cellConfigDimensions={dimensions}
        connections={connections}
        addConnection={addConnection}
      />
    </>
  );
});

