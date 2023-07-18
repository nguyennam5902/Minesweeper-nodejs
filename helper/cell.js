const board = require('./board');
/**
 * 
 * @param {number[][]} gameBoard 
 * @param {number[][]} answerBoard 
 * @param {number} i 
 * @param {number} j 
 * @returns 
 */
function openCell(gameBoard, answerBoard, i, j) {
   if (i < 0 || i >= gameBoard.length || j < 0 || j >= gameBoard[0].length || gameBoard[i][j] == 1)
      return;
   const cell = getCell(i, j);
   if (answerBoard[i][j] != 0) {
      cell.className = 'cell size24 hd_opened hd_type' + answerBoard[i][j];
      // cellBoard[i][j].setBackground(GameConfig.selectedColor);
      return;
   }
   if (cell.className == 'cell size24 hd_opened hd_type' + answerBoard[i][j]) {
      return;
   }
   cell.className = 'cell size24 hd_opened hd_type' + answerBoard[i][j];
   const aroundCells = board.getAroundCells(gameBoard.length, gameBoard[0].length, i, j);
   aroundCells.forEach(aroundCell => {
      openCell(gameBoard, answerBoard, i + aroundCell[0], j + aroundCell[1]);
   });
}

/**
 * 
 * @param {number} i 
 * @param {number} j 
 */
function getCell(i, j) {
   return document.getElementById(`cell_${j}_${i}`);
}
module.exports = { getCell, openCell };
