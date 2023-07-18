const mongoose = require('mongoose');
const database = require('../helper/database');
const { Schema } = mongoose;

const accountSchema = new Schema({
   username: String,
   password: String,
   info: String
}, {
   query: {
      byUsername(username) {
         return this.where({ 'username': username });
      },
      byAccount(username, password) {
         return this.where({ 'username': username, 'password': password });
      }
   }
});
const Account = database.getConnection().model('accounts', accountSchema);
module.exports = Account;