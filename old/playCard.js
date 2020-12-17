let game = require('./game')


const playCard = (data, io, ack) => {
    game.players.forEach((player, i) => {
        if (player.name == data.name) {
            game.players[i].cards = player.cards.filter(card => card.color !== data.card.color || card.number !== data.card.number)
            game.players[i].cardCount--
        }
    })

    let publicPlayerList = []
    game.players.forEach(player => {
        publicPlayerList.push({
            name: player.name,
            cardCount: player.cardCount
        })
    })

    game.tableCards[data.index].push(data.card)
    if (game.tableCards[game.tableCards.length - 1].length > 0) game.tableCards.push([])
    game.tableCardsCount = game.tableCards.length
    io.sockets.emit("tableCards", {
        tableCards: game.tableCards,
        tableCardsCount: game.tableCardsCount,
        playerList: publicPlayerList
    });
    ack(data.card)
};

exports.playCard = playCard;