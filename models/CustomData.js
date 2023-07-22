const mongoose = require('mongoose');
const database = require('../helper/database');
const { Schema } = mongoose;

const customDataSchema = new Schema({
   user_id: mongoose.Schema.Types.ObjectId,
   height: Number,
   width: Number,
   mines: Number,
   current_ws: Number,
   max_ws: Number
}, {
   query: {
      byUsername(username) {
         return this.where({ 'username': username });
      }
   }
});
const CustomData = database.getConnection().model('custom_data', customDataSchema);
module.exports = CustomData;