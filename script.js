let board = document.querySelector(".grid");
let cellElements = document.querySelectorAll(".cell");

let cellOne = document.getElementById("cell1");
let cellTwo = document.getElementById("cell2");
let cellThree = document.getElementById("cell3");
let cellFour = document.getElementById("cell4");
let cellFive = document.getElementById("cell5");
let cellSix = document.getElementById("cell6");
let cellSeven = document.getElementById("cell7");
let cellEight = document.getElementById("cell8");
let cellNine = document.getElementById("cell9");

let startGame = document.getElementById("start-game");
let restart = document.getElementById("restart");

let turn = document.getElementById("turn");

let playerOne = "X";
let currentPlayer = playerOne;

let winningCombo = [
    [cellOne, cellFour, cellSeven],
    [cellTwo, cellFive, cellEight],
    [cellThree, cellSix, cellNine],
    [cellOne, cellTwo, cellThree],
    [cellFour, cellFive, cellSix],
    [cellSeven, cellEight, cellNine],
    [cellOne, cellFive, cellNine],
    [cellThree, cellFive, cellSeven],
];

let cells = cellElements.forEach((cell) =>
    cell.addEventListener("click", handleClick, { once: true })
);

function handleClick(e) {
    console.log(`${currentPlayer} has played.`); // Logging current player

    const cell = e.target; // selecting the specific cell

    cell.textContent = currentPlayer; // when clicking the currentPlayer cell will be updated to either X og O

    if (playerWon()) {
        console.log(`${currentPlayer} WON`, cell);
        turn.textContent = `${currentPlayer} won`;
        stopGame();
        return;
    } else if (playerDraw()) {
        console.log("DRAW");
        turn.textContent = "It's a draw!";
        stopGame();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // updating the current player. If current player is X then shift to O, otherwise X

    console.log(`Current player is: ${currentPlayer}`); // logging specific cell
    turn.textContent = `${currentPlayer} turn`;

    stopGame();
}

function playerWon() {
    // if board is full && and there is not a winning combo = draw
    for (let i = 0; i < winningCombo.length; i++) {
        let combo = winningCombo[i];
        let [a, b, c] = combo;
        if (
            a.innerHTML !== "" &&
            a.innerHTML == b.innerHTML &&
            b.innerHTML == c.innerHTML
        ) {
            return true;
        }
    }
    return false;
}

function playerDraw() {
    let counter = 0;
    for (let i = 0; i < cellElements.length; i++) {
        cell = cellElements[i];
        if (cell.textContent === "X" || cell.textContent === "O") {
            counter++;
        }
    }
    if (counter === 9) {
        return true; // all cells are filled, it's a draw.
    }
    return false; // there are still empty cells, so no draw yet.
}

function stopGame() {
    if (playerWon() || playerDraw()) {
        // remove event listener from handleClick when playerWon() or playerDraw()
        cellElements.forEach((cell) =>
            cell.removeEventListener("click", handleClick)
        );
    }
}

restart.addEventListener("click", restartGame);

function restartGame() {
    // restarting every cell
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].textContent = "";
    }

    // accesibility to click again
    cellElements.forEach((cell) =>
        cell.addEventListener("click", handleClick, { once: true })
    );

    // set current player
    currentPlayer = playerOne;

    turn.textContent = `${currentPlayer} starts`;
}
