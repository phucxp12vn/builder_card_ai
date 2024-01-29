import { Stack, Text, useColorModeValue } from "@chakra-ui/react";

import ResultCard from "./ResultCard";
import { useGetCards } from "hook/useCard";

const BuildResult = () => {
  const { data: cards } = useGetCards();
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <>
      <Text
        color={textColor}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Result
      </Text>
      <Stack
        spacing={4}
        direction="column"
        align="center"
        mb={{ base: "20px", xl: "0px" }}
      >
        {cards &&
          cards.map((card) => <ResultCard key={card.word} card={card} />)}
      </Stack>
    </>
  );
};

export default BuildResult;
