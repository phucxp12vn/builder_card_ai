import { Card } from "api/cardApi";

export const convertToPlainText = (cards: Card[]) => {
  let result =
    "#separator:Pipe\n\
#columns:Word|Word_Missing_Letter|Pic|IPA|Type|Define|Example|Audio_Word\n";

  cards.forEach((card) => {
    result += `${card.word}|${card.wordMissingLetter}|<img src="${card.selectedPicture}" />|${card.ipa}|${card.type}|${card.define}|${card.example}|${card.audio}|`;
    result += "\n";
  });

  return result;
};
