const mongoose = require('mongoose');
const database = require('../helper/database');
const { Schema } = mongoose;

const beginnerSchema = new Schema({
   user_id: mongoose.Schema.Types.ObjectId,
   wins: { type: Number, default: 0 },
   current_ws: { type: Number, default: 0 },
   max_ws: { type: Number, default: 0 }
}, {
   query: {
      byUsername(username) {
         return this.where({ 'username': username });
      }
   }
});
const Beginner = database.getConnection().model('beginner', beginnerSchema);
module.exports = Beginner;