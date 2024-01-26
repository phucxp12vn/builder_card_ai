import { Stack, Text, useColorModeValue } from "@chakra-ui/react";

import ResultCard from './ResultCard'

const BuildResult = () => {
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
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </Stack>
    </>
  );
};

export default BuildResult;
