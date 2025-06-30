import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";
import { CellId } from "../types/Cell";
import { Dimensions } from "../types/Dimensions";

type CellDimensionsContextT = {
  setDimensions: (id: CellId, dimensions: Dimensions) => void;
};

const CellDimensionsContext = createContext<CellDimensionsContextT>({
  setDimensions: () => {
    console.warn("setDimensions not implemented");
  },
});

export function useCellsDimensions(): {
  CellDimensionsProvider: FC<PropsWithChildren>;
  cellDimensions: Record<CellId, Dimensions>;
} {
  const [cellDimensions, setCellDimensions] = useState<
    Record<CellId, Dimensions>
  >({});

  const setDimensions = useCallback((id: CellId, dimensions: Dimensions) => {
    setCellDimensions((prev) => ({
      ...prev,
      [id]: dimensions,
    }));
  }, []);

  const CellDimensionsProvider: FC<PropsWithChildren> = useMemo(
    () =>
      ({ children }) =>
        (
          <CellDimensionsContext.Provider value={{ setDimensions }}>
            {children}
          </CellDimensionsContext.Provider>
        ),
    [setDimensions]
  );

  return {
    CellDimensionsProvider,
    cellDimensions,
  };
}

export const useCellDimensionsContext = () => {
  return useContext(CellDimensionsContext);
};
