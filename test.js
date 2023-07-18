// const jsdom = require("jsdom");
// const fileController = require('./helper/file');
// const { JSDOM } = jsdom;
// fileController.readFile('./views/beginner.html');
// // const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
// const dom = new JSDOM(fileController.readFile('./views/beginner.html'));
// const cells = dom.window.document.getElementsByClassName('wrapper-table').item(0).getElementsByClassName('cell');
// for (let i = 0; i < cells.length; i++){
//     console.log(`${cells.item(i).getAttributeNode('id').textContent}`);
//     cells.item(i).addEventListener()
// }

// const randoms = require('./helper/randoms');
// const board = require('./helper/board');
// const height = 9;
// const width = 9;
// const gameBoard = board.makeNewBoard(height, width);
// const answerBoard = board.makeNewBoard(height, width);
// // console.log(gameBoard);
// board.printGameBoard(gameBoard);
// console.log("-------------------------------");
// board.makeBoard(gameBoard, 10);
// board.printGameBoard(gameBoard);
// console.log("-------------------------------");
// board.countMine(gameBoard, answerBoard);
// board.printGameBoard(answerBoard);

// var d1 = new Date('2023-7-14 11:14:05'); var d2 = new Date("2023-7-14 11:14:06"); var timeDiff = d2.getSeconds() - d1.getSeconds() + (d2.getMinutes() - d1.getMinutes()) * 60;

// console.log(timeDiff); // 2.5 seconds
// console.log(Date.UTC(2023,12))
// const Beginner = require('./models/Beginner');
// Beginner.updateOne({ 'username': 'nguyennam5902' }, {
//    $set: {
//       wins: 100,
//       current_ws: 32,
//       max_ws: 100
//    }
// }).then(() => {
//    console.log("DONE");
// });
// const config = require('./static/config');
// console.log(config.normalModeConfig[0]);

const Data = require('./models/Data');
Data.find({
   'username': 'bruh',
   'game_mode': 0
}).exec((_err, rows) => {
   rows.forEach(row => {
      console.log(row.id);
   })
});

