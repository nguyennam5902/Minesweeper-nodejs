// const config = require(`./config`);
/**
 * 
 * @param {number[][]} gameBoard 
 * @param {number[][]} answerBoard 
 * @param {number} i 
 * @param {number} j 
 * @param {number} j 
 * @param {string} cellSize
 * @returns 
 */
function openCell(gameBoard, answerBoard, i, j, cellSize) {
   if (i < 0 || i >= gameBoard.length || j < 0 || j >= gameBoard[0].length || gameBoard[i][j] == 1)
      return;
   const cell = getCell(i, j);
   if (answerBoard[i][j] != 0) {
      cell.className = `cell ${cellSize} hd_opened hd_type` + answerBoard[i][j];
      return;
   }
   if (cell.className == `cell ${cellSize} hd_opened hd_type` + answerBoard[i][j]) {
      return;
   }
   cell.className = `cell ${cellSize} hd_opened hd_type` + answerBoard[i][j];
   const aroundCells = getAroundCells(gameBoard.length, gameBoard[0].length, i, j);
   aroundCells.forEach(aroundCell => openCell(gameBoard, answerBoard, i + aroundCell[0], j + aroundCell[1], cellSize));
}

/**
 * 
 * @param {*} i 
 * @param {*} j 
 * @returns {HTMLElement} 
 */
function getCell(i, j) {
   return document.getElementById(`cell_${j}_${i}`);
}

/**
 * Given board cells, return opened cells on the board
 * @param {HTMLCollectionOf<Element>} cells 
 * @returns {number}
 */
function getOpenCells(cells) {
   var result = 0;
   for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.className.includes(`hd_opened`)) {
         result++;
      }
   }
   return result;
}

module.exports = {
   getCell,
   getOpenCells,
   openCell
};
