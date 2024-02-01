import { Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

import ResultCard from "./ResultCard";
import { useGetCards } from "hook/useCard";
import DownloadCard from "./DownloadCard";

const BuildResult = () => {
  const { data: cards } = useGetCards();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  
  return (
    <>
      <Flex
        align={{ sm: "flex-start", lg: "center" }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="10px"
      >
        <Text
          color={textColor}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          Result
        </Text>
        <DownloadCard cards={cards} />
      </Flex>
      <Stack
        spacing={4}
        direction="column"
        align="center"
        mb={{ base: "20px", xl: "0px" }}
        height="calc(100vh - 160px)"
        overflowX="auto"
      >
        {cards &&
          cards.map((card) => <ResultCard key={card.word} card={card} />)}
      </Stack>
    </>
  );
};

export default BuildResult;
