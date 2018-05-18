const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const EntrySchema = new Schema({
  address: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  ip: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Entry = mongoose.model('Entry', EntrySchema)

module.exports = exports = Entry
