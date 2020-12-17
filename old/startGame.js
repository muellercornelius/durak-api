let game = require('./game')
const {
    fillStack
} = require('./utils/fillStack')
const {
    shuffle
} = require('./utils/shuffle')
const {
    cardHandout
} = require('./utils/cardHandout.js')

const startGame = (players, io, cardsPerPlayer, durak) => {
    game.cardsPerPlayer = cardsPerPlayer
    const stack = shuffle(fillStack())
    const handout = cardHandout(stack, players, cardsPerPlayer)
    game.stack = handout[0]
    game.players = handout[1]
    game.trump = game.stack.pop()
    game.players = shuffle(game.players)
    console.log(durak)
    if (durak !== "") {
        while (game.players[0].name !== durak) {
            game.players.push(game.players.shift())
        }
    }
    game.attacker = game.players[0].name
    game.defender = game.players[1].name
    players.forEach(player => {
        gamePlayer = game.players.filter(gamePlayer => gamePlayer.name == player.name)[0]
        const cards = gamePlayer.cards
        player.socket.emit("cards", cards)

    });
    io.sockets.emit("pushRoute", '/game')
    let publicPlayerList = []
    game.players.forEach(player => {
        publicPlayerList.push({
            name: player.name,
            cardCount: player.cardCount
        })
    })

    io.sockets.emit("game", {
        playerList: publicPlayerList,
        trump: game.trump,
        attacker: game.attacker,
        defender: game.defender,
        stackCardCount: game.stack.length,
        tableCards: [
            []
        ],
        tableCardsCount: 0,
    })
};

exports.startGame = startGame;