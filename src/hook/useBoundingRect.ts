import { useState, useCallback, useLayoutEffect } from 'react';

type DebounceFunction = (...args: any[]) => void;

const debounce = (limit: number, callback: DebounceFunction) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, limit, args);
  };
};

function getDimensionObject(node: any) {
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    x: rect.x,
    y: rect.y,
    right: rect.right,
    bottom: rect.bottom,
  };
}

export default function useBoundingRect(limit = 100) {
  const [dimensions, setDimensions] = useState<any>({});
  const [node, setNode] = useState(null);

  const ref = useCallback((node: any) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if ('undefined' !== typeof window && node) {
      const measure = () =>
        window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));

      measure();

      const listener = debounce(limit ? limit : 100, measure);

      window.addEventListener('resize', listener);
      window.addEventListener('scroll', listener);
      return () => {
        window.removeEventListener('resize', listener);
        window.removeEventListener('scroll', listener);
      };
    }
  }, [node, limit]);

  return [ref, dimensions, node];
}
