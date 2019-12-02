const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  type : { type: Number, required: true }
})

module.exports = mongoose.model('user', userSchema);