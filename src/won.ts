import { DurakState, Player } from "./rooms/schema/durakState";
import { MapSchema } from "@colyseus/schema";
import { resetState } from "./resetState";
const { draw } = require("./utils/draw");

export const won = (state: DurakState) => {
  draw(state);

  if (state.players.size >= 2) {
    let players = [...state.players.entries()];
    players.push(players.shift())
    state.players = new MapSchema<Player>(new Map(players));
    state.attacker = [...state.players.values()][0].name;
    state.defender = [...state.players.values()][1].name;
  } else {
    const durak = [...state.players.values()][0].name;
    console.log("Der Durak ist: " + durak);
    resetState(state)
  }

  state.tableCards = JSON.stringify([[]]);
  state.stackCount = state.stack.length;
};
