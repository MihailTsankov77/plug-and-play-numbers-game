import { CellConfig } from "../types/Cell";

export function generateEmptyCell(): CellConfig {
  return {
    id: crypto.randomUUID(),
  };
}
