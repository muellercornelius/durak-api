function cardHandout(stack, players, cardCount) {
    let newPlayers = []
    let newStack = stack
    players.forEach(player => {
        newPlayers.push({
            name: player.name,
            cards: [],
            cardCount: 0
        })
    });
    for (let i = 1; i <= cardCount; i++) {
        newPlayers.forEach(player => {
            player.cards.push(newStack.pop())
            player.cardCount++
        })      
    }
    return [newStack, newPlayers]
}

exports.cardHandout = cardHandout