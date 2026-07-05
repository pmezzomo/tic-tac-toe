// Pause execution for a given number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const PLAYER1 = "X";
const PLAYER2 = "O";

let currentPlayer = PLAYER1;
let gameOver = false;

// Show the current player's image in the header
function showPlayerImage() {
  if (gameOver) return;
  const img = document.getElementById("current-player-img");
  img.src = currentPlayer === PLAYER1 ? "img/xboy.jpg" : "img/kids.jpg";
}

// Attach click listeners to every cell
function setupCells() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
      if (gameOver) return;

      // Only allow clicking an empty cell
      if (this.getElementsByTagName("img").length === 0) {
        if (currentPlayer === PLAYER1) {
          this.innerHTML = "<img src='img/xboy.jpg' alt='X' height='60'>";
          this.setAttribute("data-jogo", PLAYER1);
          currentPlayer = PLAYER2;
        } else {
          this.innerHTML = "<img src='img/kids.jpg' alt='O' height='60'>";
          this.setAttribute("data-jogo", PLAYER2);
          currentPlayer = PLAYER1;
        }
        showPlayerImage();
        checkWinner();
      }
    });
  }
}

// Read cell value by element id
function val(id) {
  return document.getElementById(id).getAttribute("data-jogo");
}

// Check all win conditions and draw (all 9 cells filled)
async function checkWinner() {
  const a11 = val("a11"), a12 = val("a12"), a13 = val("a13");
  const b21 = val("b21"), b22 = val("b22"), b23 = val("b23");
  const c31 = val("c31"), c32 = val("c32"), c33 = val("c33");

  let winner = "";

  // Rows
  if (a11 && a11 === a12 && a11 === a13) winner = a11;
  else if (b21 && b21 === b22 && b21 === b23) winner = b21;
  else if (c31 && c31 === c32 && c31 === c33) winner = c31;
  // Columns
  else if (a11 && a11 === b21 && a11 === c31) winner = a11;
  else if (a12 && a12 === b22 && a12 === c32) winner = a12;
  else if (a13 && a13 === b23 && a13 === c33) winner = a13;
  // Diagonals
  else if (a11 && a11 === b22 && a11 === c33) winner = a11;
  else if (a13 && a13 === b22 && a13 === c31) winner = a13;

  if (winner) {
    gameOver = true;
    await sleep(50);
    alert(`Player '${winner}' wins!`);
    return;
  }

  // Draw: all 9 cells filled with no winner
  const allFilled = [a11, a12, a13, b21, b22, b23, c31, c32, c33].every(v => v !== "");
  if (allFilled) {
    await sleep(50);
    alert("It's a draw!");
  }
}

// Reset the board for a new game
function restartGame() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].setAttribute("data-jogo", "");
  }
  currentPlayer = PLAYER1;
  gameOver = false;
  showPlayerImage();
}

// Initialize on page load
showPlayerImage();
setupCells();
