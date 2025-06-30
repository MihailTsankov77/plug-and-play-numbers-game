import { useCallback, useEffect, useState } from "react";
import { Connection, ConnectionEvent } from "../types/Connections";

export function useConnectionState(possibleConnections: ConnectionEvent[]): {
  connections: Connection[];
  addConnection: (connection: ConnectionEvent) => void;
} {
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

  return {
    connections,
    addConnection,
  };
}
