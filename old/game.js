module.exports = {
    cardsPerPlayer: 6,
    stack: [],
    attacker: "",
    defender: "",
    tableCards: [[]],
    trump: {},
    tableCardsCount: 0, //darf nicht größer sein als der cardCount des defender
    players: [
        {name: "", cards: [], cardCount: 0}
    ]
}