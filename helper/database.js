const mongoose = require('mongoose');
var connection = null;

/**
 *  Return a connection to MongoDB database.
 * @returns {mongoose.Connection}
 */
function getConnection() {
   if (connection == null) {
      connection = mongoose.createConnection('mongodb+srv://test:xvdobviNlaG2WemR@minesweeper.msysc7g.mongodb.net/minesweeper');
      // connection = mongoose.createConnection('mongodb://0.0.0.0:27017/minesweeper');
   }
   return connection;
}
module.exports = { getConnection };