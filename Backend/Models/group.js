const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    type: { type: String, default: "group" },
    name: { type: String, required: true },
   
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Location" }],
  },
  { timestamps: true }
);

const groups= mongoose.model("Group", groupSchema);

module.exports = groups;
