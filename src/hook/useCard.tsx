import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildCards, Card } from "api/cardApi";

const key = "cards";

export const useGetCards = () => {
    return useQuery<Card[]>({
        queryKey: [key]
    });
}

export const useBuildCards = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: buildCards,
    onSuccess: (cards: Card[]) => {
      queryClient.setQueryData([key], (prevCards: Card[] | undefined) =>
        {
            if (!prevCards) {
                return [...cards];
            } else {
                const newCards = cards.filter(card => {
                    return !prevCards.some(preCard => preCard.word === card.word);
                })
                return [...prevCards, ...newCards]
            }
        }
      );

      // queryClient.invalidateQueries([key])
    },
  });
};
