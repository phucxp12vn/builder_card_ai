import { useState } from "react";
import { Input, Stack, Button, Textarea } from "@chakra-ui/react";

const BuildCard = () => {
  const [words, setWords] = useState("");

  const handleInputNewWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newWord } = event.target;

    setWords(newWord);  
  };

  return (
    <Stack spacing={4} direction="column" align="center">
      <Input
        placeholder="Please input the word"
        value={words}
        onChange={handleInputNewWord}
      />
      <Button colorScheme="teal" size="sm">
        Build
      </Button>
      <Textarea placeholder="The result will display here" isDisabled />
    </Stack>
  );
};

export default BuildCard;
