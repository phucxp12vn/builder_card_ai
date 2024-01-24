import { useState } from "react";
import { Input, Stack, Button, Textarea } from "@chakra-ui/react";

import { buildCardByWord } from "./utils";

const BuildCard = () => {
  const [words, setWords] = useState("");
  const [result, setResult] = useState("");

  const handleInputNewWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newWord } = event.target;

    setWords(newWord);
  };

  const handleBuildCard = () => {
    const card = buildCardByWord(words);

    setResult(card);
  };

  return (
    <Stack background="white" width={500} spacing={4} direction="column" align="center">
      <Input
        placeholder="Please input the word"
        value={words}
        onChange={handleInputNewWord}
      />
      <Button colorScheme="teal" size="sm" onClick={handleBuildCard}>
        Build
      </Button>
      <Textarea
        placeholder="The result will display here"
        isDisabled
        value={result}
        minHeight={400}
      />
    </Stack>
  );
};

export default BuildCard;
