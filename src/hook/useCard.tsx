import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildCards, Card } from "api/cardApi";

const key = "cards";

export const useGetCards = () => {
  return useQuery<Card[]>({
    queryKey: [key],
  });
};

export const useBuildCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: buildCards,
    onSuccess: (cards: Card[]) => {
      queryClient.setQueryData([key], (prevCards: Card[] | undefined) => {
        const serializedCards = cards.map((card) => ({
          ...card,
          selectedPicture: card.pictures?.[0] ?? "",
        }));
        if (!prevCards) {
          return serializedCards;
        } else {
          const newCards = serializedCards.filter((card) => {
            return !prevCards.some((preCard) => preCard.word === card.word);
          });
          return [...prevCards, ...newCards];
        }
      });

      // queryClient.invalidateQueries([key])
    },
  });
};

export const useUpdateCards = () => {
  const queryClient = useQueryClient();

  return (word: string, selectedPicture: string) => {
    queryClient.setQueryData([key], (cards: Card[] | undefined) => {
      if (!cards) {
        return;
      }

      const updatedCards = cards.map((card) => {
        if (card.word !== word && card.selectedPicture !== selectedPicture) {
          return { ...card };
        }

        return { ...card, selectedPicture };
      });

      return updatedCards;
    });
  };
};
