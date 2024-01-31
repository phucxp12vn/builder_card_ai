import { useCallback, useEffect } from "react";
import { VStack, Flex } from "@chakra-ui/react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

const MotionFlex = motion(Flex);

const transitionProps = {
    stiffness: 400,
    type: "spring",
    damping: 60,
    mass: 3
  };

const Track = (props: { children: JSX.Node; positions: number[], activeItem: number }) => {
  const { children, positions, activeItem } = props;
  const x = useMotionValue(0);
  const controls = useAnimation();

  const handleResize = useCallback(
    () =>
      controls.start({
        x: positions[activeItem],
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
        style={{ x }}
        drag="x"
        _active={{ cursor: "grabbing" }}
        minWidth="min-content"
        flexWrap="nowrap"
        cursor="grab"
      >
        {children}
      </MotionFlex>
    </VStack>
  );
};

export default Track;
