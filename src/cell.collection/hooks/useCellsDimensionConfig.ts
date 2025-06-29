import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CellConfig } from "../types/Cell";
import { Dimensions } from "../types/Dimensions";

// TODO make it return the min cell size and the calculations will be based on the dimensions
export function useCellsDimensionConfig(cells: CellConfig[][]): {
  containerRef: RefObject<HTMLDivElement | null>;
  dimensions: Dimensions;
} {
  const [containerDimensions, setContainerDimensions] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [dimensions, setDimensions] = useState<Dimensions>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height, x, y } = entry.contentRect;

      setContainerDimensions({ x, y, width, height });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerDimensions;

    const cellWidth = width / (cells[0]?.length || 1);
    const cellHeight = height / (cells.length || 1);

    setDimensions({
      x: containerDimensions.x,
      y: containerDimensions.y,
      width: cellWidth,
      height: cellHeight,
    });
  }, [containerDimensions, cells.length, cells[0]?.length]);

  return { containerRef, dimensions };
}
