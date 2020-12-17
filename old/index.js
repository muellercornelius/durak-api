const options = {};
const io = require('socket.io')(options);
const {
    startGame
} = require("./startGame")
const {
    playCard
} = require("./playCard")
const {
    defended
} = require("./defended")
const {
    won
} = require("./won")
const {
    takeCardBack
} = require("./takeCardBack")

let players = []

io.on('connect', socket => {
    socket.on('join', (name, ack) => {
        // avoid duplicates in players
        const filtered = players.filter(socket => socket.name == name)
        if (filtered.length == 0) {
            players.push({
                name,
                socket
            })
            ack({
                type: "success",
                data: name
            })
            updatePlayers()
        } else {
            ack({
                type: "error",
                data: "Es ist bereits jemand mit diesem Namen gejoint."
            })
        }
    })

    socket.on("leave", (name, ack) => {
        players = players.filter(socket => socket.name !== name)
        ack({
            type: "success",
            data: name
        })
        updatePlayers()
    })

    socket.on('startGame', (cardsPerPlayer, durak) => {
        startGame(players, io, cardsPerPlayer, durak)
    })

    socket.on('playCard', (data, ack) => {
        playCard(data, io, ack)
    })

    socket.on('defended', () => defended(players, io))
    socket.on('won', () => won(players, io))
    socket.on('takeCardBack', (data) => takeCardBack(data, io, socket))
});

const updatePlayers = () => {
    playerList = players.map(player => player.name)
    io.sockets.emit("playerList", playerList)
}

io.listen(8000);
console.log("runs")