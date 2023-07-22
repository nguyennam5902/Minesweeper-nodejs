const mongoose = require('mongoose');
const database = require('../helper/database');
const { Schema } = mongoose;

const expertSchema = new Schema({
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
const Expert = database.getConnection().model('expert', expertSchema);
module.exports = Expert;