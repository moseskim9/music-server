const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, required: true },
  name: { type: String, required: true },
  spotifyId: { type: String, default: null },
  genres: [{ type: String }]
});

module.exports = mongoose.model("Artist", schema);
