import { json } from "express";
import { Card, DurakState } from "./rooms/schema/durakState";

export const playCard = (state: DurakState, data: any) => {
  if (data.card.owner) {
    let player = state.players.get(data.card.owner);
    player.cards = player.cards.filter(
      (card) =>
        card.color !== data.card.color || card.number !== data.card.number
    );
    state.players.set(data.card.owner, player);

    const card = new Card({ name: data.name, ...data.card });
    let tableCards = JSON.parse(state.tableCards);
    tableCards[data.index].push(card);
    if (tableCards[tableCards.length - 1].length > 0) tableCards.push([]);
    state.tableCards = JSON.stringify(tableCards);
  }
};
