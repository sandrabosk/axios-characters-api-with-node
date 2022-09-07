const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    name: { type: String, unique: true },
    weapon: { type: String },
    occupation: { type: String },
    debt: { type: String },
  },
  {
    timestamps: true,
  }
);

const Character = model("Character", characterSchema);

module.exports = Character;
