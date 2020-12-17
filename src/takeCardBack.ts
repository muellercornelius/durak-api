import { Card, DurakState } from "./rooms/schema/durakState";

export const takeCardBack = (state: DurakState, data: any) => {
    let player = state.players.get(data.card.owner)
    player.cards.push(new Card(data.card))

    let tableCards = JSON.parse(state.tableCards)
    tableCards.forEach((cards:any,i:any) => {
        tableCards[i] = tableCards[i].filter((card: Card) => card.color !== data.card.color || card.number !== data.card.number)
    })
    state.tableCards = JSON.stringify(tableCards)
};

