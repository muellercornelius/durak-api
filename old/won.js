const {
    draw
} = require('./utils/draw');
let game = require('./game')



const won = (players, io) => {
    draw(players)

    if(game.players.length >= 2) {
    game.players.push(game.players.shift())
    game.attacker = game.players[0].name
    game.defender = game.players[1].name
    } else {
        const durak = game.players[0].name
        console.log("Der Durak ist: " + durak)
        io.sockets.emit("pushRoute", '/')
    }


    let publicPlayerList = []
    game.players.forEach(player => {
        publicPlayerList.push({
            name: player.name,
            cardCount: player.cardCount
        })
    })

    game.tableCards = [
        []
    ]
    game.tableCardsCount = 0

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

exports.won = won;