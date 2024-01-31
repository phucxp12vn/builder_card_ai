import { useLayoutEffect } from "react";
import { Box, Flex, IconButton, HStack } from "@chakra-ui/react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

import useBoundingRect from "hook/useBoundingRect";

const Slider = (props: {
  activeItem: number;
  positions: number[];
  children: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setActiveItem: (...arg: any) => void;
  initItemHeight: (height: number) => void;
}) => {
  const { activeItem, positions, children, setActiveItem, initItemHeight } =
    props;
  const [ref, dimensions] = useBoundingRect();
  const height = dimensions?.height ?? 0;

  useLayoutEffect(
    () => initItemHeight(Math.round(height)),
    [height, initItemHeight]
  );

  const handleDecrementClick = () => {
    !(activeItem === 0) && setActiveItem((prev: number) => prev - 1);
  };

  const handleIncrementClick = () => {
    activeItem < positions.length - 1 &&
      setActiveItem((prev: number) => prev + 1);
  };

  return (
    <>
      <HStack height={"100%"}>
        <Flex
          h={"100%"}
          direction="column"
          mx="auto"
          justifyContent="space-around"
        >
          <IconButton
            onClick={handleDecrementClick}
            mt={"4px"}
            colorScheme="blue"
            aria-label="Search database"
            variant="ghost"
            icon={<MdOutlineKeyboardArrowUp />}
          />
          <IconButton
            onClick={handleIncrementClick}
            mt={"4px"}
            colorScheme="blue"
            aria-label="Search database"
            variant="ghost"
            icon={<MdOutlineKeyboardArrowDown />}
          />
        </Flex>
        <Box
          ref={ref}
          w="100%"
          height="100%"
          position="relative"
          overflow="hidden"
          _before={{
            bgGradient: "linear(to-r, base.d400, transparent)",
            position: "absolute",
            content: "''",
            zIndex: 1,
            h: "100%",
            left: 0,
            top: 0,
          }}
          _after={{
            bgGradient: "linear(to-l, base.d400, transparent)",
            position: "absolute",
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
    </>
  );
};

export default Slider;
