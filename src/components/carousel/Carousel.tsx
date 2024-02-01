import { useCallback, useMemo, useState, ReactNode, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import Slider from "./components/Slider";
import Track from "./components/Track";

const Carousel = (props: { children: ReactNode; gap: number; onActiveItem?: (indexItem: number) => void }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  const { children, onActiveItem } = props;

  const positions: number[] = useMemo(
    () =>
      Array.isArray(children)
        ? children?.map((_, index: number) => -Math.abs(itemHeight * index))
        : [],
    [children, itemHeight]
  );

  const initItemHeight = useCallback(
    (height: number) => setItemHeight(height),
    []
  );

  useEffect(() => {
    onActiveItem && onActiveItem(activeItem);

  }, [activeItem, onActiveItem])
  

  return (
    <Slider
      setActiveItem={setActiveItem}
      initItemHeight={initItemHeight}
      positions={positions}
      activeItem={activeItem}
    >
      <Track positions={positions} activeItem={activeItem}>
        {Array.isArray(children) &&
          children.map((child, index) => (
            <Box h={`${itemHeight}px`} key={index}>
              {child}
            </Box>
          ))}
      </Track>
    </Slider>
  );
};

export default Carousel;
