import { CellConfig } from "../types/Cell";
import { Coordinates } from "../types/Dimensions";

export function generateEmptyCell(coordinates: Coordinates): CellConfig {
  return {
    id: crypto.randomUUID(),
    dimensions: {
      ...coordinates,
      width: 1,
      height: 1,
    },
  };
}
