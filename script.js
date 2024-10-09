const startBtn = document.getElementById('start-game');
const gameContainer = document.querySelector('.main');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.querySelector('.lives');
const highScoreDisplay = document.getElementById('high-score');
const playPauseBtn = document.getElementById('play-pause-btn');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
playBtn.style.display = 'none';

let score = 0;
let highScore = 0;
let insectCreationInterval;
let movementInterval;
let lives = 5;
let livesHearts = [
    'fa-solid fa-heart',
    'fa-solid fa-heart',
    'fa-solid fa-heart',
    'fa-solid fa-heart',
    'fa-solid fa-heart'
];
// 'fa-regular fa-heart'

function displayHearts() {
    livesDisplay.innerHTML = '';
    livesDisplay.innerHTML = livesHearts.map((heart) => {
        return `<i class="${heart}"></i>`
    }).join('');
}

displayHearts();

function pauseGame() {
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';

    clearInterval(insectCreationInterval);
    clearInterval(movementInterval);

    document.querySelectorAll('.ant').forEach(ant => ant.removeEventListener('click', catchAnt));

}

function playGame() {
    pauseBtn.style.display = 'block';
    playBtn.style.display = 'none';

    insectCreationInterval = setInterval(createInsect, Math.floor(Math.random() * 3000) + 800);
    movementInterval = setInterval(changePosition, 50);

    document.querySelectorAll('.ant').forEach(ant => ant.addEventListener('click', catchAnt));

}

startBtn.addEventListener('click', () => {
    startGame();
    startBtn.style.display = 'none';
})

function startGame() {
    insectCreationInterval = setInterval(createInsect, Math.floor(Math.random() * 3000) + 500);
    movementInterval = setInterval(changePosition, 30);

    pauseBtn.addEventListener('click', pauseGame);
    playBtn.addEventListener('click', playGame);

}

function changePosition() {
    const ants = document.querySelectorAll('.ant');
    ants.forEach(ant => {
        let top = parseInt(ant.style.top);
        if (isNaN(top)) top = 2;
        top += 2;
        ant.style.top = `${top}px`;

        if (top > gameContainer.clientHeight) {
            ant.remove();
            updateLives();
        }
    })
}

function updateLives() {
    debugger;
    lives--;
    // console.log(lives);
    livesHearts.unshift('fa-regular fa-heart');
    livesHearts.pop();
    displayHearts();
    if (lives <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(insectCreationInterval);
    clearInterval(movementInterval);
    pauseBtn.removeEventListener('click', pauseGame);
    playBtn.removeEventListener('click', playGame);

    startBtn.innerHTML = `Play Again`;
    startBtn.style.display = 'block';
    startBtn.addEventListener('click', playAgain);

    document.querySelectorAll('.ant').forEach(ant => ant.removeEventListener('click', catchAnt));

    updateHighScore();
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
    }
    highScoreDisplay.textContent = highScore;
}

function playAgain() {
    document.querySelectorAll('.ant').forEach(ant => {
        ant.remove();
    });
    clearInterval(insectCreationInterval);
    clearInterval(movementInterval);
    
    score = 0;
    scoreDisplay.innerHTML = '00';

    lives = 5;
    livesHearts = [
        'fa-solid fa-heart',
        'fa-solid fa-heart',
        'fa-solid fa-heart',
        'fa-solid fa-heart',
        'fa-solid fa-heart'
    ];
    displayHearts();
    startGame();

    document.querySelectorAll('.ant').forEach(ant => ant.addEventListener('click', catchAnt));

}

function createInsect() {
    const ant = document.createElement('img');
    ant.classList.add('ant');
    ant.setAttribute('alt', 'ant');
    ant.setAttribute('src', 'https://i.postimg.cc/yYNdwQ94/ant.png');

    let { x, y } = setRandomPosition();
    ant.style.top = `${y}px`;
    ant.style.left = `${x}px`;

    ant.addEventListener('click', catchAnt);

    gameContainer.appendChild(ant);
}

function catchAnt() {
    increaseScore();
    this.classList.add('catched');
    setTimeout(() => {
        this.remove();
    }, 1000);
}

function setRandomPosition() {
    let x = Math.floor(Math.random() * (gameContainer.clientWidth - 50));
    let y = 0;
    return {
        x,
        y
    }
}

function increaseScore() {
    score++;
    score = score < 10 ? `0${score}` : score;
    scoreDisplay.innerHTML = `${score}`;
}