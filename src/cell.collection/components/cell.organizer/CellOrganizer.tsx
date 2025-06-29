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

export const CellOrganizer = memo(function CellOrganizer() {
  const { cells, setters } = useCellState(() => [
    [generateEmptyCell({ x: 0, y: 0 })],
  ]);

  const [connections, setConnections] = useState<Connection[]>([]);

  const addConnection = useCallback((connection: ConnectionEvent) => {
    setConnections((prevConnections) => {
      if (connection.delete) {
        return prevConnections.filter(
          (conn) =>
            !(
              (conn.from === connection.from && conn.to === connection.to) ||
              (conn.from === connection.to && conn.to === connection.from)
            )
        );
      }

      if (
        prevConnections.some(
          (conn) => conn.from === connection.from && conn.to === connection.to
        )
      ) {
        return prevConnections;
      }

      const filteredConnections = prevConnections.filter(
        (conn) => conn.from !== connection.to || conn.to !== connection.from
      );

      return [...filteredConnections, connection];
    });
  }, []);

  const possibleConnection = useCellsPossibleConnections(cells);

  const { containerRef, dimensions } = useCellsDimensionConfig(cells);

  const disableAddColumn = cells[0].length >= MaxNumberOfCells.columns;
  const disableAddRow = cells.length >= MaxNumberOfCells.rows;

  return (
    <>
      <div className="cell-organizer-1">
        <ColumnExpander onPress={setters.left} disabled={disableAddColumn} />

        <div className="cell-organizer-2">
          <RowExpander onPress={setters.top} disabled={disableAddRow} />

          <div className="cell-container" ref={containerRef}>
            {cells.map((cellsPerRow, index) => (
              <CellRow key={index} cells={cellsPerRow} />
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
