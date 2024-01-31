import { useCallback, useEffect, useMemo, useState } from "react";

import Slider from "./components/Slider";
import Track from "./components/Track";
import { Box } from "@chakra-ui/react";

const Carousel = (props: { children: JSX.Node; gap: number }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const { children, gap } = props;

  const positions: number[] = useMemo(
    () =>
      children.map((_, index: number) => -Math.abs((itemWidth + gap) * index)),
    [children, itemWidth, gap]
  );

  const initSliderWidth = useCallback(
    (width: number) => setSliderWidth(width),
    []
  );

  useEffect(() => {
    setItemWidth(sliderWidth - gap);
  }, [sliderWidth, gap]);

  return (
    <Slider
      gap={gap}
      setActiveItem={setActiveItem}
      initSliderWidth={initSliderWidth}
      positions={positions}
      activeItem={activeItem}
    >
      <Track positions={positions} activeItem={activeItem}>
        {children.map((child: any, index: number) => (
          <Box
            w={`${itemWidth}px`}
            _notLast={{
              mr: `${gap}px`,
            }}
            key={index}
          >
            {child}
          </Box>
        ))}
      </Track>
    </Slider>
  );
};

export default Carousel;
