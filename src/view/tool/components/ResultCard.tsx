import {
  Box,
  Card,
  CardBody,
  Flex,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

import { Card as CardType } from "api/cardApi";
import Carousel from "components/carousel/Carousel";

const ResultCard = (props: { card: CardType }) => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const { card } = props;

  return (
    <Card mb="20px" w={"100%"} minH={300}>
      <CardBody>
        <Flex align="flex-start" direction={{ base: "column", md: "row" }}>
          <Flex align="center" w="100%" justify="space-between" mb="30px">
            <Box
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mb="4px"
            >
              <Text
                color={textColorPrimary}
                fontWeight="bold"
                fontSize="2xl"
                mb="4px"
              >
                Word: {card.word}
              </Text>
              <Text fontWeight="500" color={textColorSecondary} fontSize="sm">
                IPA: /{card.ipa}/
              </Text>
              <Text fontWeight="500" color={textColorSecondary} fontSize="sm">
                Type: {card.type}
              </Text>
              <Text color={textColorPrimary} fontSize="md" me="26px" mb="40px">
                Define: {card.define}
              </Text>
              <Text color={textColorPrimary} fontSize="md">
                Exampe: {card.example}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Box minHeight={300} height={300} minW={340} width={340}>
              <Carousel gap={0}>
                {card.picture.map((url, index) => (
                  <Image
                    key={`${card.word}-${index}`}
                    src={url}
                    borderRadius="8px"
                    objectFit="cover"
                    width={"100%"}
                    height={"100%"}
                  />
                ))}
              </Carousel>
            </Box>
            <Text
              mt="5px"
              textAlign="center"
              fontWeight="500"
              color={"gray.400"}
              fontSize="20px"
            >
              Selected this picture
            </Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
