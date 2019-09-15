const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: mongoose.Types.ObjectId,
  id: { type: String, required: true },
  name: { type: String, required: true },
  distributor: { type: String, default: null },
  region: { type: String }
});

module.exports = mongoose.model("Label", schema);
