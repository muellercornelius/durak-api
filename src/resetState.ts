import { Card, DurakState, Player } from "./rooms/schema/durakState";
import { ArraySchema } from "@colyseus/schema";

export const resetState = (state: DurakState) => {
  try {
    state.defender = "";
    state.attacker = "";
    state.gameStarted = false;
    state.stack = new ArraySchema<Card>();
    state.cardsPerPlayer = 6;
    state.trump = undefined;
    state.tableCards = JSON.stringify([[]]);
    state.players.clear();
    state.playerBackup.forEach((player: Player, key: any) => {
      state.players.set(key, player);
    });
  } catch (err) {
    state.errorMessages.push("Ups der Reset hat nicht geklappt: " + err);
  }
};
