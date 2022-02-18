/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
const createBoard = (rows, columns) => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            row: row,
            column: column,
            opened: false,
            flagged: false,
            mined: false,
          };
        });
    });
};

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanTed = 0;
  while (minesPlanTed < minesAmount) {
    const rowSel = parseInt(Math.random() * rows, 10);
    const columnSel = parseInt(Math.random() * columns, 10);

    if (!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true;
      minesPlanTed++;
    }
  }
};

const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

//clone do tabuleiro
const cloneBoard = board => {
  return board.map(rows => {
    return rows.map(field => {
      return {...field};
    });
  });
};

//pega os vizinhos
const getNeighbors = (board, row, colomn) => {
  const neighbors = [];
  const rows = [row - 1, row + 1];
  const colomns = [colomn - 1, colomn + 1];
  rows.forEach(r => {
    colomns.forEach(c => {
      const diferent = r !== row || c !== colomn;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;
      if (diferent && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
};

//pega oss vizinhos salvos da mina
const safeNeighborhood = (board, row, colomn) => {
  const safes = (result, neighbor) => result && !neighbor.mined;
  return getNeighbors(board, row, colomn).reduce(safes, true);
};

//responsavel por abrir o campo
const openField = (board, row, colomn) => {
  const field = board[row][colomn];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, colomn)) {
      getNeighbors(board, row, colomn).forEach(n =>
        openField(board, n.row, n.colomn),
      );
    } else {
      const neighbors = getNeighbors(board, row, colomn);
      field.nearMines = neighbors.filter(n => n.mined).length;
    }
  }
};

//pegar os field para fazer uma arrey caso queira percorrer todos os campos
const fields = board => [].concat(...board);

const hadExplosion = board =>
  fields(board).filter(field => field.exploded).length > 0;

const pendding = field =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);

const wonGame = board => fields(board).filter(pendding).length === 0;

const showMines = board =>
  fields(board)
    .filter(field => field.mined)
    .forEach(field => (field.opened = true));

const invertFlag = (board, row, column) => {
  const field = board[row][column];
  field.flagged = !field.flagged;
};

const flagsUsed = board => fields(board).filter(field => field.flagged).length;

export {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
};
