let board = Array(9).fill("");
let currentPlayer = "X";
let gameMode = "";
let gameOver = false;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function startGame(mode) {
  gameMode = mode;
  document.getElementById("modeScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
}

function makeMove(index) {
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameOver = true;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  if (gameMode === "computer" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyCells = board
    .map((val, idx) => val === "" ? idx : null)
    .filter(v => v !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex);
}

function checkWinner() {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  board.fill("");
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's Turn";
}
