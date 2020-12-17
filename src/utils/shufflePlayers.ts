export const shufflePlayers = (players: any) => {
  let shuffledPlayers = new Map(
    [...players.entries()]
      .map((a: any) => [Math.random(), a])
      .sort((a: any, b: any) => a[0] - b[0])
      .map((a: any) => a[1])
  );
  return shuffledPlayers;
};
