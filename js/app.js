const grid = document.querySelector('#grid');
const scoreDisplay = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const messageDisplay = document.querySelector('.message');
const restartButton = document.querySelector('#restart');
const WinMessage = "You Win!";
const LostMessage = "You Lost! Try again!";

const cardArray = [
    { name: 'images/img1.png', img: 'littleManHeart' },
    { name: 'images/img1.png', img: 'littleManHeart' },
    { name: 'images/img2.png', img: 'dragon' },
    { name: 'images/img2.png', img: 'dragon' },
    { name: 'images/img3.png', img: 'Water' },
    { name: 'images/img3.png', img: 'Water' },
    { name: 'images/img4.png', img: 'neonguy' },
    { name: 'images/img4.png', img: 'neonguy' },
    { name: 'images/img5.png', img: 'Paysage' },
    { name: 'images/img5.png', img: 'Paysage' },
    { name: 'images/img8.png', img: 'Landscape' },
    { name: 'images/img8.png', img: 'Landscape' },
    { name: 'images/img6.png', img: 'LittleMan' },
    { name: 'images/img6.png', img: 'LittleMan' },
    { name: 'images/img7.png', img: 'PixelMen' },
    { name: 'images/img7.png', img: 'PixelMen' },
    { name: 'images/img9.png', img: 'PinkTree' },
    { name: 'images/img9.png', img: 'PinkTree' },
    { name: 'images/img10.png', img: 'Triforce' },
    { name: 'images/img10.png', img: 'Triforce' },
    { name: 'images/img11.png', img: 'SkeletHead' },
    { name: 'images/img11.png', img: 'SkeletHead' },
    { name: 'images/img12.png', img: 'Love' },
    { name: 'images/img12.png', img: 'Love' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let seconds = 0;
let timer;
let gameOver = false;

function initializeGame() {
    resetGameState();
    startGame();
}

function resetGameState() {
    clearInterval(timer);
    score = 0;
    seconds = 0;
    gameOver = false;
    scoreDisplay.textContent = `${score}`;
    timerDisplay.textContent = `Time: ${seconds}s`;
    messageDisplay.textContent = '';
    grid.innerHTML = '';
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function startGame() {
    // Shuffle the cards
    cardArray.sort(() => 0.5 - Math.random());

    // Create the cards
    cardArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${item.name}" alt="${item.img}">
                </div>
                <div class="card-back"></div>
            </div>
        `;
        card.setAttribute('data-name', item.name);
        grid.appendChild(card);

        card.addEventListener('click', flipCard);
    });

    startTimer(); // Start the timer
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');
    if (isMatch) {
        disableCards();
        score++;
        scoreDisplay.textContent = `${score}`;
        if (score === 12) {
            endGame();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Time: ${seconds}s`;
        if (seconds >= 80) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer); // Stop the timer

    gameOver = true;
    // Set win or loss message
    if (score === 12 && seconds <= 80) {
        messageDisplay.textContent = WinMessage;
    } else {
        messageDisplay.textContent = LostMessage;
    }
}

// Attach the restart function to the restart button
restartButton.addEventListener('click', initializeGame);


// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initializeGame);

