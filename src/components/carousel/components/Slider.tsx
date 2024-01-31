import { useLayoutEffect } from "react";
import { Box, Flex, Text, IconButton, HStack } from "@chakra-ui/react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import useBoundingRect from "hook/useBoundingRect";

const Slider = (props: {
  gap: number;
  activeItem: number;
  positions: number[];
  children: JSX.Element;
  setActiveItem: (...arg: any) => void;
  initSliderWidth: (width: number) => void;
}) => {
  const {
    gap,
    activeItem,
    positions,
    children,
    setActiveItem,
    initSliderWidth,
  } = props;
  const [ref, dimensions] = useBoundingRect();
  const width = dimensions?.width ?? 0;

  useLayoutEffect(
    () => initSliderWidth(Math.round(width)),
    [width, initSliderWidth]
  );

  const handleDecrementClick = () => {
    !(activeItem === 0) && setActiveItem((prev: number) => prev - 1);
  };

  const handleIncrementClick = () => {
    (activeItem < positions.length - 1) &&
      setActiveItem((prev: number) => prev + 1);
  };

  return (
    <>
      <HStack>
        <Flex
          h={"300px"}
          direction="column"
          mx="auto"
          justifyContent="space-around"
        >
          <IconButton
            onClick={handleDecrementClick}
            mt={"4px"}
            mr={`${gap / 3}px`}
            colorScheme="blue"
            aria-label="Search database"
            variant="ghost"
            icon={<MdOutlineKeyboardArrowUp />}
          />
          <IconButton
            onClick={handleIncrementClick}
            mt={"4px"}
            ml={`${gap / 3}px`}
            colorScheme="blue"
            aria-label="Search database"
            variant="ghost"
            icon={<MdOutlineKeyboardArrowDown />}
          />
        </Flex>
        <Box
          ref={ref}
          w={{ base: "100%", md: `calc(100% + ${gap}px)` }}
          ml={{ base: 0, md: `-${gap / 2}px` }}
          px={`${gap / 2}px`}
          position="relative"
          overflow="hidden"
          _before={{
            bgGradient: "linear(to-r, base.d400, transparent)",
            position: "absolute",
            w: `${gap / 2}px`,
            content: "''",
            zIndex: 1,
            h: "100%",
            left: 0,
            top: 0,
          }}
          _after={{
            bgGradient: "linear(to-l, base.d400, transparent)",
            position: "absolute",
            w: `${gap / 2}px`,
            content: "''",
            zIndex: 1,
            h: "100%",
            right: 0,
            top: 0,
          }}
        >
          {children}
        </Box>
      </HStack>
      <Text textAlign="center" fontWeight="500" color={"gray.400"} fontSize="20px">
        Selected this picture
      </Text>
    </>
  );
};

export default Slider;
