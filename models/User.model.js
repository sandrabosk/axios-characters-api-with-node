const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
      // unique: true -> Ideally, should be unique, but its up to you
    occupation: String,
    debt: Boolean,
    weapon: String,
    apiId: Number
  },
);

const User = model("User", userSchema);

module.exports = User;
