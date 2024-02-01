import {
  Box,
  Card,
  CardBody,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Card as CardType } from "api/cardApi";
import ImagesCard from "./ImagesCard";

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
          <ImagesCard word={card.word} pictures={card.pictures} />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
