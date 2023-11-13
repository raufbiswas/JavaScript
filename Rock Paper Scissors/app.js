const startGameBtn = document.getElementById("start-game-btn");

let gameIsRunning = false;

const getPlayerChoice = () => {
    const selection = prompt("ROCK, PAPER OR SICSSORS?", "").toUpperCase();
    if (
        selection !== "ROCK" &&
        selection !== "PAPER" &&
        selection !== "SCISSORS"
    ) {
        alert("Invalid choice! We chose ROCK for you!");
        return;
    }
    return selection;
};

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return "ROCK";
    } else if (randomValue < 0.67) {
        return "PAPER";
    } else {
        return "SCISSORS";
    }
};

const getWinner = (cChoice,pChoice = "ROCK") =>
    cChoice === pChoice
        ? "DRAW"
        : (cChoice === "ROCK" && pChoice === "PAPER") ||
          (cChoice === "PAPER" && pChoice === "SCISSORS") ||
          (cChoice === "SCISSORS" && pChoice === "ROCK")
        ? "PLAYER WINS"
        : "COMPUTER WINS";

startGameBtn.addEventListener("click", () => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log("Game is starting...");
    const playerSelection = getPlayerChoice();
    const computerChoice = getComputerChoice();
    let winner;
    if (playerSelection) {
        winner = getWinner(computerChoice, playerSelection);
    } else {
        winner = getWinner(computerChoice);
    };
    console.log(winner);
    let message = `You picked ${playerSelection || "ROCK"}, computer picked ${computerChoice}, therefore you `;
    if (winner === 'DRAW') {
        message = message + 'had a draw.';
    } else if (winner === 'PLAYER WINS') {
        message = message + 'won.';
    } else {
        message = message + 'lost.';
    };
    alert(message);
    gameIsRunning = false
});
