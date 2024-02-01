import { useMemo } from "react";

import DownloadButton from "components/buttons/DownloadButton";
import { convertToPlainText } from "../utils";
import { Card } from "api/cardApi";

const DownloadCard = (props: { cards: Card[] | undefined }) => {
  const { cards } = props;

  const cardsPlainText = useMemo(() => {
    return cards ? convertToPlainText(cards) : "";
  }, [cards]);

  return <DownloadButton content={cardsPlainText} fileName="desk_cards.txt" />;
};

export default DownloadCard;
