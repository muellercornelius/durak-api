import { Card, DurakState, Player } from "./rooms/schema/durakState";
import { MapSchema } from "@colyseus/schema";
const { draw } = require("./utils/draw");

export const defended = (state: DurakState) => {
  const playerId = [...state.players.values()].filter(
    (gamePlayer) => gamePlayer.name == state.defender
  )[0].id;
  let player = state.players.get(playerId);

  const tableCards = JSON.parse(state.tableCards).flat();
  tableCards.forEach((card: Card) => {
    let newCard = new Card(card);
    (newCard.owner = player.id), (newCard.name = player.name);
    player.cards.push(newCard);
  });

  draw(state);

  let players = [...state.players.entries()];
  players.push(players.shift());
  players.push(players.shift());
  state.players = new MapSchema<Player>(new Map(players));
  state.defender = [...state.players.values()][1].name;
  state.attacker = [...state.players.values()][0].name;

  state.tableCards = JSON.stringify([[]]);
  state.stackCount = state.stack.length;
};
