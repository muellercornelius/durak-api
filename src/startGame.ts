const { fillStack } = require("./utils/fillStack");
const { shuffle } = require("./utils/shuffle");
const { shufflePlayers } = require("./utils/shufflePlayers");
const { cardHandout } = require("./utils/cardHandout");

import { DurakState } from "./rooms/schema/durakState";

export const startGame = (state: DurakState) => {
  try {
    state.gameStarted = true;
    state.playerBackup = state.players;
    state.stack = shuffle(fillStack());
    const handout = cardHandout(
      state.stack,
      state.players,
      state.cardsPerPlayer
    );
    state.stack = handout[0];
    state.players = handout[1];
    state.trump = state.stack.pop();
    state.players = shufflePlayers(state.players);
    try {
      state.defender = [...state.players.values()][1].name;
      state.attacker = [...state.players.values()][0].name;
    } catch (err) {
      state.errorMessages.push("Es sind nicht genug Spieler angemeldet");
    }
    state.stackCount = state.stack.length;
    state.successMessages.push("Auf gehts, die Runde läuft.");
  } catch (err) {
    state.errorMessages.push("Fehler (Spielerstellung): " + err);
  }
};
