import { useCallback, useEffect, ReactNode } from "react";
import { VStack, Flex } from "@chakra-ui/react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const MotionFlex = motion(Flex);

const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3,
};

const Track = (props: {
  children: ReactNode;
  positions: number[];
  activeItem: number;
}) => {
  const { children, positions, activeItem } = props;
  const y = useMotionValue(0);
  const controls = useAnimation();

  const handleResize = useCallback(
    () =>
      controls.start({
        y: positions[activeItem],
        transition: {
          ...transitionProps,
        },
      }),
    [activeItem, controls, positions]
  );

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <VStack spacing={5} alignItems="stretch">
      <MotionFlex
        animate={controls}
        style={{ y }}
        drag="x"
        _active={{ cursor: "grabbing" }}
        minWidth="min-content"
        flexWrap="nowrap"
        cursor="grab"
        direction={"column"}
      >
        {children}
      </MotionFlex>
    </VStack>
  );
};

export default Track;
