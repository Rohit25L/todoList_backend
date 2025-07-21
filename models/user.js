const mong = require("mongoose");

const userSchema = new mong.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  List: [
    {
      type: mong.Types.ObjectId,
      ref: "list",
    },
  ],
});
module.exports = mong.model("user", userSchema);
