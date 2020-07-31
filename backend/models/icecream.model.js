const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const icecreamSchema = new Schema({
  username: { type: String, required: true },
  conewafer: { type: String, required: true },
  baseflavour: { type: String, required: true },
  toppings: { type: String, required: true },
}, {
  timestamps: true,
});

const Icecream = mongoose.model('Icecream', icecreamSchema);

module.exports = Icecream;