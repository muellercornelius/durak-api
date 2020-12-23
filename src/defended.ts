import { Card, DurakState, Player } from "./rooms/schema/durakState";
import { MapSchema } from "@colyseus/schema";
import { resetState } from "./resetState";
const { draw } = require("./utils/draw");

export const defended = (state: DurakState) => {
  try {
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

    
    if (state.players.size >= 2) {
      let players = [...state.players.entries()];
      players.push(players.shift());
      players.push(players.shift());
      state.players = new MapSchema<Player>(new Map(players));
      draw(state);
      state.defender = [...state.players.values()][1].name;
      state.attacker = [...state.players.values()][0].name;
    } else {
      const durak = [...state.players.values()][0].name;
      state.successMessages.push("Der Durak ist: " + durak);
      resetState(state);
      state.successMessages.push("Spiel beendet. Es können neue Leute Joinen.");
    }

    state.tableCards = JSON.stringify([[]]);
    state.stackCount = state.stack.length;
  } catch (err) {
    state.errorMessages.push("Ups da ging was schief: " + err);
  }
};
