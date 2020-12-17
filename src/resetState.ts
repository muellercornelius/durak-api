import { Card, DurakState } from "./rooms/schema/durakState";
import { ArraySchema } from "@colyseus/schema"

export const resetState = (state: DurakState) => {
    state.defender = "";
    state.attacker = "";
    state.gameStarted = false;
    state.stack = new ArraySchema<Card>();
    state.cardsPerPlayer = 6;
    state.trump = undefined;
    state.tableCards = JSON.stringify([[]])
}