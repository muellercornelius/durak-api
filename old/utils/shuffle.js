function shuffle(stack) {
    shuffled = stack.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return shuffled
}

exports.shuffle = shuffle