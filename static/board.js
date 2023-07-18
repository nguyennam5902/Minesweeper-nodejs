// const cell = require('./cell');
// const Data = require('./models/Data');
/**
 * 
 * @param {HTMLCollectionOf<Element>} cells 
 * @param {number} needOpen 
 * @param {HTMLElement} face 
 * @param {boolean} isEnd 
 * @param {number} clicks 
 * @param {number} endTime 
 * @param {any} timeloop 
 */
function checkWin(cells, needOpen, face, isEnd, clicks, endTime, timeloop) {
   const openCells = getOpenCells(cells);
   if (openCells == needOpen) {
      clearInterval(timeloop);
      face.className = 'top-area-face zoomable hd_top-area-face-win';
      isEnd = true;
      const playTime = Math.round(endTime) / 1000;
      document.getElementById('game_time').innerHTML = playTime;
      document.getElementById('clicks').innerHTML = clicks;
      document.getElementsByClassName('result-block').item(0).className = 'result-block';
   }
   return openCells == needOpen;
}

/**
 * 
 * @param {int[][]} gameBoard 
 * @param {int[][]} output 
 */
function countMine(gameBoard, output) {
   for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[0].length; j++) {
         output[i][j] = 0;
         const aroundCells = getAroundCells(gameBoard.length, gameBoard[0].length, i, j);
         aroundCells.forEach(cell => {
            output[i][j] = output[i][j] + gameBoard[i + cell[0]][j + cell[1]];
         })
      }
   }
}

/**
 * Given a cell's coordinate, return its around cells.
 * @param {number} height 
 * @param {number} width 
 * @param {number} i 
 * @param {number} j 
 * @returns {number[][]}
 */
function getAroundCells(height, width, i, j) {
   if (i == 0 && j == 0)
      return [[1, 0], [0, 1], [1, 1]];
   else if (i == 0 && j == width - 1)
      return [[0, -1], [1, -1], [1, 0]];
   else if (i == height - 1 && j == 0)
      return [[-1, 0], [-1, 1], [0, 1]];
   else if (i == height - 1 && j == width - 1)
      return [[-1, -1], [0, -1], [-1, 0]];
   else if (i == 0 && j < width - 1)
      return [[0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
   else if (i == height - 1 && j < width - 1)
      return [[0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]];
   else if (j == 0 && i < height - 1)
      return [[-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
   else if (j == width - 1 && i < height - 1)
      return [[-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]];
   else
      return [
         [-1, -1], [-1, 0], [-1, 1],
         [0, -1], [0, 1],
         [1, -1], [1, 0], [1, 1]];
}

function getDateTime() {
   return new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
}

/**
 * 
 * @param {int[][]} gameBoard 
 * @param {int} mines 
 */
function makeBoard(gameBoard, mines) {
   for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[0].length; j++) {
         gameBoard[i][j] = 0;
      }
   }
   for (let i = 0; i < mines; i++) {
      const x = getRandomNumber(0, gameBoard.length - 1);
      const y = getRandomNumber(0, gameBoard[0].length - 1);
      if (gameBoard[x][y] == 0)
         gameBoard[x][y] = 1;
      else
         i--;
   }
}

/**
 * 
 * @param {number} height 
 * @param {number} width 
 * @returns {number[][]}
 */
function makeNewBoard(height, width) {
   const matrix = [];
   for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
         row.push(0);
      }
      matrix.push(row);
   }
   return matrix;
}

function submit(isWin, gameMode, clicks, playTime) {
   $.ajax({ url: '/data', type: 'POST', data: { 'game_mode': gameMode, 'is_win': isWin, 'time': Math.round(playTime) / 1000, 'clicks': clicks, 'date': getDateTime() }, success: function (data) { alert('Game info successfully saved!'); } });
}

module.exports = {
   checkWin,
   countMine,
   getAroundCells,
   getDateTime,
   makeBoard,
   makeNewBoard,
   submit
};