let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let hidden;
let deck;
let canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
};

function buildDeck() {
    let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let types = ['C', 'H', 'S', 'D'];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + '-' + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while (dealerSum < 17) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = './cards/' + card + 'jpg';
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealerCards').append(cardImg);
    }
    console.log(dealerSum);
}

function getValue(card) {
    let data = card.split('-');
    let value = data[0];

    if (isNaN(value)) {
        if (value === 'A') {
            return 11;
        } return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] === 'A') {
        return 1;
    } return 0;
}


