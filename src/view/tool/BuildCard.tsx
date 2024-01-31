import { Grid, GridItem, Flex, useColorModeValue, Box, Image } from "@chakra-ui/react";

import BuildForm from "./components/BuildForm";
import BuildResult from "./components/BuildResult";
import Carousel from "components/carousel/Carousel";

const dummy = [
  "http://4.bp.blogspot.com/-AJEBtWo6iYA/Tou12z1V4EI/AAAAAAAAAuU/Uj-kNx6GuTw/s1600/A_Cumbersome_Load_Large_preview.jpg",
  "https://www.fractuslearning.com/wp-content/uploads/2017/06/Cumbersome-1024x922.jpg",
  "https://www.greenlightcommerce.com/wp-content/uploads/2018/05/Cumbersome-768x512.jpg",
  "http://image.iheart.com/WMG2/Thumb_Content/Full_PC/WMG/Sept/cat4/603497967988/075679263322.jpg",
];

const BuildCard = () => {
  const backgroundColor = useColorModeValue(
    "blackAlpha.50",
    "secondaryGray.900"
  );

  return (
    <Grid
      mb="20px"
      gridTemplateColumns={{ xl: "repeat(3, 1fr)" }}
      gap={{ base: "20px", xl: "20px" }}
      display={{ base: "block", xl: "grid" }}
    >
      <Flex
        flexDirection="column"
        gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
      >
        <BuildForm />
      </Flex>
      <GridItem colSpan={2}>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          p="20px"
          bg={backgroundColor}
          rounded="md"
        >
          <BuildResult />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default BuildCard;
