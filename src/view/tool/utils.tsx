import axios from "axios";

interface Card {
  word: string;
  wordMissingLetter: string;
  picture: string;
  ipa: string;
  type: string;
  define: string;
  example: string;
  audio: string;
}

export const buildCardByWord = async (word: string) => {
  const card = await inferenceCardByAI(word);

  const cardStringTemplate = `${card.word}|${card.wordMissingLetter}|${card.picture}|${card.ipa}|${card.type}|${card.define}|${card.example}|${card.audio}|`;

  return cardStringTemplate;
};

const inferenceCardByAI = async (word: string): Promise<Card> => {
  const wordInfo = await postWord(word);

  return {
    word: word,
    wordMissingLetter: replaceVowels(word),
    picture:
      '<img src="https://colwords.com/assets/word_images/1684/thumb/thumb_1614917984_hike.JPG"></img>',
    ipa: wordInfo?.ipa || "",
    type: "Adjective",
    define: wordInfo?.define || "",
    example: wordInfo?.example || "",
    audio: `[sound:${word}.mp3]`,
  };
};

const replaceVowels = (word: string, replacment = "_") => {
  const regex = /[aeiou]/gi;

  return word.replace(regex, replacment);
};

// Function to handle button click and make a POST request
const postWord = async (word: string) => {
  try {
    // Make a POST request using Axios
    const response = await axios.get(
      `http://localhost:5173/api/build?word=${word}`
    );

    const {
      ipa_word: ipa,
      explaination_word: define,
      example_word: example,
    } = response.data.result;

    return {
      define,
      ipa,
      example,
    };
  } catch (error) {
    // Set error state in case of an error
  } finally {
    // Set loading to false after the request is complete (whether successful or not)
  }
};
