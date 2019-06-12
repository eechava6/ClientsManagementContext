const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductEvent = new Schema({
  cc: { type: String, default: "" },
  type: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
  data: { type: Schema.Types.Mixed, default: {} }
});

module.exports = mongoose.model("ProductEvent", ProductEvent);