import { QueryKey } from "@tanstack/react-query";
import api from "./api";

export interface Card {
  word: string;
  wordMissingLetter: string;
  picture: string[];
  ipa: string;
  type: string;   
  define: string;
  example: string;
  audio: string;
}

export const buildCards = async (words: string[]) => {
  const { data } = await api.post<Card[]>(`http://localhost:5173/api/build`, {
    words: words.join(";"),
  });

  return data;
};

export const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { data } = await api.get(
    `https://jsonplaceholder.typicode.com/${queryKey[0]}`
  );

  return data;
};
