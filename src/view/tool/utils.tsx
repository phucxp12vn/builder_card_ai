import { Card } from '@/api/cardApi';

export const convertToPlainText = (cards: Card[]) => {
  let result =
    '#separator:Pipe\n\
#columns:Word|Word_Missing_Letter|Pic|IPA|Type|Define|Example|Audio_Word\n';

  cards.forEach((card) => {
    result += `${card.word}|${card.wordMissingLetter}|<img src="${card.selectedPicture}" />|${card.ipa}|${card.type}|${card.define}|${card.example}|${card.audio}|`;
    result += '\n';
  });

  return result;
};

export const extractYouTubeVideoId = (url: string) => {
  const pattern =
    // eslint-disable-next-line no-useless-escape
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  return match && match[1];
};
