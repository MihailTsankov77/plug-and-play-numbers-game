import { useCallback, useEffect, useMemo, useState } from "react";
import { Connection, ConnectionEvent } from "../types/Connections";
import { useCellElementsContext } from "../contextes/CellElementsContext";
import { CellId } from "../types/Cell";
import { elementToFunctionMap } from "../../elements/utils/functionToElement";

export function useConnectionState(possibleConnections: ConnectionEvent[]): {
  validConnections: Connection[];
  invalidConnections: Connection[];
  addConnection: (connection: ConnectionEvent) => void;
} {
  const { cellElements } = useCellElementsContext();

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

  useEffect(() => {
    const validConnections = connections.filter((connection) =>
      possibleConnections.some(
        (possible) =>
          (possible.from === connection.from &&
            possible.to === connection.to) ||
          (possible.from === connection.to && possible.to === connection.from)
      )
    );

    setConnections(validConnections);
  }, [possibleConnections]);

  const splitConnections = useMemo(() => {
    const connectionsByCell = connections.reduce<Record<CellId, Connection[]>>(
      (acc, connection) => {
        acc[connection.to] = (acc[connection.to] ?? []).concat(connection);

        return acc;
      },
      {}
    );

    const split = Object.entries(connectionsByCell).reduce<{
      validConnections: Connection[];
      invalidConnections: Connection[];
    }>(
      (acc, [cellId, cellConnections]) => {
        const info = elementToFunctionMap[cellElements[cellId].option];

        if (!info) {
          console.warn(`Cell element with ID ${cellId} not found.`);
          return acc;
        }

        const maxConnections = info.max ?? Infinity;
        const validConnectionsCount = Math.min(
          cellConnections.length,
          maxConnections
        );

        return {
          validConnections: acc.validConnections.concat(
            cellConnections.slice(0, validConnectionsCount)
          ),
          invalidConnections: acc.invalidConnections.concat(
            cellConnections.slice(validConnectionsCount)
          ),
        };
      },
      {
        validConnections: [],
        invalidConnections: [],
      }
    );

    return split;
  }, [connections, cellElements]);

  return {
    ...splitConnections,
    addConnection,
  };
}
