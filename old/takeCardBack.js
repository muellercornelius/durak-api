let game = require('./game')


const takeCardBack = (data, io, socket) => {
    game.players.forEach((player, i) => {
        if (player.name == data.name) {
            game.players[i].cards.push(data.card)
            game.players[i].cardCount++
            socket.emit("cards", game.players[i].cards)
        }
    })

    let publicPlayerList = []
    game.players.forEach(player => {
        publicPlayerList.push({
            name: player.name,
            cardCount: player.cardCount
        })
    })

    game.tableCards.forEach((cards,i) => {
        game.tableCards[i] = game.tableCards[i].filter(card => card.color !== data.card.color || card.number !== data.card.number)
    })
    const count = game.tableCards.flat()
    game.tableCardsCount = count.length
    io.sockets.emit("tableCards", {
        tableCards: game.tableCards,
        tableCardsCount: game.tableCardsCount,
        playerList: publicPlayerList
    });
};

exports.takeCardBack = takeCardBack;