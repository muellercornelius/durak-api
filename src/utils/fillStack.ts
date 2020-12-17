import { Card } from "../rooms/schema/durakState";

export const fillStack = () => {
  let cards: any = [];
  const cardColors = ["karo", "pik", "herz", "kreuz"];
  const cardNumbers = [
    "2",
    "3",
    "4",
    "5",
/*     "6",
    "7",
    "8",
    "9",
    "10",
    "Bube",
    "Dame",
    "König",
    "Ass", */
  ];
  cardColors.forEach((color) => {
    cardNumbers.forEach((number) => {
      const card = new Card({
        color,
        number,
        owner: ""
      });
      cards.push(card)
    });
  });
  return cards;
};
