let game = require('../game')


const draw = (players) => {
    game.players.forEach(gamePlayer => {
        if (gamePlayer.cardCount < game.cardsPerPlayer && game.trump) {
            while (gamePlayer.cardCount < game.cardsPerPlayer && game.stack.length > 0) {
                gamePlayer.cards.push(game.stack.pop())
                gamePlayer.cardCount++
            }
            if (gamePlayer.cardCount < game.cardsPerPlayer && game.stack.length == 0) {
                console.log("Den Trumpf bekam: " + gamePlayer.name)
                gamePlayer.cards.push(game.trump)
                gamePlayer.cardCount++
                game.trump = undefined
            }
            const player = players.find(player => player.name == gamePlayer.name)
            player.socket.emit('cards', gamePlayer.cards)
        }
    });
    game.players = game.players.filter(player => player.cardCount > 0)
};

exports.draw = draw;