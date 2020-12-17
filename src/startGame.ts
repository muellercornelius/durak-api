const { fillStack } = require("./utils/fillStack");
const { shuffle } = require("./utils/shuffle");
const { shufflePlayers } = require("./utils/shufflePlayers");
const { cardHandout } = require("./utils/cardHandout");

import { DurakState } from "./rooms/schema/durakState";

export const startGame = (state: DurakState) => {
  state.gameStarted = true;
  state.stack = shuffle(fillStack());
  const handout = cardHandout(state.stack, state.players, 6);
  state.stack = handout[0];
  state.players = handout[1];
  state.trump = state.stack.pop();
  state.players = shufflePlayers(state.players);
  state.defender = [...state.players.values()][0].name;
  state.attacker = [...state.players.values()][1].name;
  state.stackCount = state.stack.length;
};
