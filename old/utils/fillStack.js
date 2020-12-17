function fillStack() {
    let cards = []
    const cardColors = ["karo", "pik", "herz", "kreuz"]
    const cardNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Bube", "Dame", "König", "Ass"]
    cardColors.forEach(color => {
        cardNumbers.forEach(number => {
            cards.push({
                color,
                number
            })
        })
    })
    return cards
}

exports.fillStack = fillStack