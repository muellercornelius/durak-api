import { DurakState } from "../rooms/schema/durakState";

export const draw = (state: DurakState) => {
  try {
    state.players.forEach((gamePlayer) => {
      if (gamePlayer.cards.length < state.cardsPerPlayer && state.trump) {
        while (
          gamePlayer.cards.length < state.cardsPerPlayer &&
          state.stack.length > 0
        ) {
          let card = state.stack.pop();
          card.owner = gamePlayer.id;
          gamePlayer.cards.push(card);
        }
        if (
          gamePlayer.cards.length < state.cardsPerPlayer &&
          state.stack.length == 0
        ) {
          console.log("Den Trumpf bekam: " + gamePlayer.name);
          let card = state.trump;
          card.owner = gamePlayer.id;
          gamePlayer.cards.push(card);
          state.trump = undefined;
        }
      }
      if (gamePlayer.cards.length == 0) state.players.delete(gamePlayer.id);
    });
  } catch (err) {
    state.errorMessages.push(
      "Beim Karten austeilen kam es zu einem Fehler:" + err
    );
  }
};
