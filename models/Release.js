const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  release_date: { type: String, required: true },
  track_count: { type: Number, required: true },
  upc: { type: String, required: true },
  artists: [{ type: String }],
  artists_id: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
  label: { type: String, required: true },
  label_id: { type: Schema.Types.ObjectId, ref: "Label" },
  type: { type: String, required: true }
});

module.exports = mongoose.model("Release", schema);
