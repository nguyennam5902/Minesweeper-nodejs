const mongoose = require('mongoose');
const database = require('../helper/database');
const { Schema } = mongoose;

const customSchema = new Schema({
   user_id: mongoose.Schema.Types.ObjectId,
   wins: { type: Number, default: 0 }
}, {
   query: {
      byUsername(username) {
         return this.where({ 'username': username });
      }
   }
});
const Custom = database.getConnection().model('custom', customSchema);
module.exports = Custom;