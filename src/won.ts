import { DurakState, Player } from "./rooms/schema/durakState";
import { MapSchema } from "@colyseus/schema";
import { resetState } from "./resetState";
const { draw } = require("./utils/draw");

export const won = (state: DurakState) => {
  try {
    if (state.players.size >= 2) {
      let players = [...state.players.entries()];
      players.push(players.shift());
      draw(state);
      state.players = new MapSchema<Player>(new Map(players));
      state.defender = [...state.players.values()][1].name;
      state.attacker = [...state.players.values()][0].name;
    } else {
      const durak = [...state.players.values()][0].name;
      state.successMessages.push("Der Durak ist: " + durak);
      state.lastDurak = durak
      resetState(state);
      state.successMessages.push("Spiel beendet. Es können neue Leute Joinen.");
    }

    state.tableCards = JSON.stringify([[]]);
    state.stackCount = state.stack.length;
  } catch (err) {
    state.errorMessages.push("Ups da ging was schief: " + err);
  }
};
