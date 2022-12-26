let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let hidden;
let deck;
let canHit = true;
const start = document.querySelector('.start');

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
};

start.addEventListener('click', () => {
    window.location.reload();
});


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
        cardImg.src = './cards/' + card + '.jpg';
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealerCards').append(cardImg);
    }
  
    
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = './cards/' + card + '.jpg';
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById('yourCards').append(cardImg);
    }
    document.getElementById('hit').addEventListener('click', hit);
    document.getElementById('stay').addEventListener('click', stay);

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

function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = './cards/' + card + '.jpg';
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById('yourCards').append(cardImg);
    
    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    } 
    return playerSum;
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById('hidden').src = './cards/' + hidden + '.jpg';

    let message = '';
    if (yourSum > 21) {
        message = 'you lose!';
    } else if (dealerSum > 21) {
        message = 'you win!';
    } else if (yourSum === dealerSum) {
        message = 'tie!';
    } else if (yourSum > dealerSum) {
        message = 'you win!';
    } else if (yourSum < dealerSum) {
        message = 'you lose!';
    }

    document.getElementById('yourSum').innerText = yourSum;
    document.getElementById('dealerSum').innerText = dealerSum;
    document.getElementById('results').innerText = message;

}
    

