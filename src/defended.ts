import { Card, DurakState } from "./rooms/schema/durakState";
const { draw } = require("./utils/draw");

export const defended = (state: DurakState) => {
  const playerId = [...state.players.values()].filter((gamePlayer) => gamePlayer.name == state.defender)[0].id;
  let player = state.players.get(playerId);

  const tableCards = JSON.parse(state.tableCards).flat();
  tableCards.forEach((card: Card) => {
    let newCard = new Card(card)
    newCard.owner = player.id,
    newCard.name = player.name
    player.cards.push(newCard);
  });

  draw(state);

  state.tableCards = JSON.stringify([[]]);
  state.stackCount = state.stack.length;
};
