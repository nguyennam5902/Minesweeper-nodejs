const mongoose = require('mongoose');
const database = require('../helper/database');
const { Schema } = mongoose;

const dataSchema = new Schema({
   user_id: mongoose.Schema.Types.ObjectId,
   game_mode: Number,
   is_win: Boolean,
   time: Number,
   clicks: Number,
   date: String
}, {
   query: {
      byUsername(username) {
         return this.where({ 'username': username });
      },
   }
});
const Data = database.getConnection().model('data', dataSchema);
module.exports = Data;