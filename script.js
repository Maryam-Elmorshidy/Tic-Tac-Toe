// console.log("hi");
let currentPlayer = "X";
const NUMBER_OF_ROWS = 5;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;

const createBoardArray = () => {
  let board = [];

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => "_"));
  }
  return board;
};

// let board = [
//   ["_", "_", "_"],
//   ["_", "_", "_"],
//   ["_", "_", "_"],
// ];
let board = createBoardArray();
const resetButton = document.querySelector("#reset");

const getCellPlacement = (index, numberOfRows) => {
  const row = Math.floor(index / numberOfRows);
  const col = index % numberOfRows;
  //   console.log(row);
  //   console.log(col);
  return [row, col];
};

const checkRows = (currentPlayer) => {
  let column = 0;
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] != currentPlayer) {
        column = 0;
        break;
      }
      column++;
    }
    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

const checkColumns = () => {
  let row = 0;
  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] != currentPlayer) {
        row = 0;
        break;
      }
      row++;
    }
    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
};

const checkDiagonals = (currentPlayer) => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] != currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};
const checkReverseDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] != currentPlayer) {
      count = 0;
      break;
    }
    count++;
  }
  if (count === NUMBER_OF_ROWS) {
    return true;
  }
};

const checkWin = (currentPlayer) => {
  if (checkRows(currentPlayer)) return true;

  if (checkColumns(currentPlayer)) return true;

  if (checkDiagonals(currentPlayer)) return true;

  if (checkReverseDiagonals(currentPlayer)) return true;
};
const resetBoard = () => {
  document.querySelector(".board").remove();
  createBoard();
  board = createBoardArray();
  currentPlayer = "X";
  turnsCounter = 0;
};

const runWinEvent = (currentPlayer) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer} won!`);
    resetBoard();
  }, 200);
};

const runDrawEvent = () => {
  setTimeout(() => {
    alert("Draw");
    resetBoard();
  }, 200);
};

const drawMarkInCell = (cell, currentPlayer) => {
  cell.querySelector(".value").textContent = currentPlayer;
  cell.classList.add(`cell--${currentPlayer}`);
};

const cellClickHandler = (event, index) => {
  // console.log(index, NUMBER_OF_ROWS);
  const cell = event.target;
  // console.log(cell);
  const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);
  //   console.log([row, col]);
  if (board[row][col] === "_") {
    turnsCounter++;
    board[row][col] = currentPlayer;
    drawMarkInCell(cell, currentPlayer);

    if (checkWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else {
      turnsCounter === turns && runDrawEvent();

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      //   if (currentPlayer === "X") {
      //     currentPlayer = "O";
      //   } else {
      //     currentPlayer = "X";
      //   }
    }
  }
};

const createBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");

  board.classList.add("board");

  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    const cellElementString = `<div class="cell" role="button" tabindex="${
      i + 1
    }" ><span class="value"></span></div>`;
    const cellElement = document
      .createRange()
      .createContextualFragment(cellElementString);

    cellElement.querySelector(".cell").onclick = (event) =>
      cellClickHandler(event, i);

    cellElement.querySelector(".cell").onkeydown = (event) =>
      event.key === "Enter" ? cellClickHandler(event, i) : true;

    board.appendChild(cellElement);
    // document.documentElement  ===> to get root in css values
    document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
  }
  container.insertAdjacentElement("afterbegin", board);
};

resetButton.addEventListener("click", resetBoard);
createBoard();
// div.cell:nth-child(1)
// <div class="cell" role="button" tabindex="1"><span class="value"></span></div>
// <span class="value"></span>
