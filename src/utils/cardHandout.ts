import { Player } from "../rooms/schema/durakState";

export const cardHandout = (stack: any, players: any, cardCount: Number) => {
  let newPlayers = new Map();
  let newStack = stack;
  players.forEach((playerData: Player) => {
    const player = new Player({
      name: playerData.name,
      id: playerData.id,
      cards: [],
    });

    newPlayers.set(playerData.id, player);
  });

  for (let i = 1; i <= cardCount; i++) {
    newPlayers.forEach((player: Player) => {
      let card = newStack.pop()
      card.owner = player.id
      player.cards.push(card);
    });
  }
  return [newStack, newPlayers];
};
