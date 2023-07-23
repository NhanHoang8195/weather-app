import { useRef, useState, useEffect, useMemo } from "react";
import { debounce } from "src/utils";

const useResize = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setContainerWidth(width);
      }
    };
    const resizeObserver = new ResizeObserver(debounce(handleResize, 200));
    resizeObserver.observe(containerRef.current);

    // Clean up the observer when the component unmounts
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef.current]);
  return { containerRef, containerWidth };
};

export default useResize;
