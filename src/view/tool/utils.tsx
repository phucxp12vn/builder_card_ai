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

export const buildCardByWord = (word: string): string => {
  const card = inferenceCardByAI(word);

  const cardStringTemplate = `${card.word}|${card.wordMissingLetter}|${card.picture}|${card.ipa}|${card.type}|${card.define}|${card.example}|${card.audio}|`;

  return cardStringTemplate;
};

const inferenceCardByAI = (word: string): Card => {
  return {
    word: word,
    wordMissingLetter: replaceVowels(word),
    picture:
      '<img src="https://colwords.com/assets/word_images/1684/thumb/thumb_1614917984_hike.JPG"></img>',
    ipa: "/ˈkʌm.bɚ.səm/",
    type: "Adjective",
    define: "large and heavy and therefore difficult to carry, wear, or handle",
    example:
      "Although the machine looks cumbersome, it is actually easy to use.",
    audio: `[sound:${word}.mp3]`,
  };
};

const replaceVowels = (word: string, replacment = "_") => { 
    const regex = /[aeiou]/gi;

    return word.replace(regex, replacment);
 }