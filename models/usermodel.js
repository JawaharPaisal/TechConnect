const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  rollnumber:{
    type: String,
    required:[true,"Your roll number is reuired"],
  },
  mobile:{
    type:String,
    required:[true,"Your mobile number is required"],
  },
  course:{
    type:String,
    required:[true,"Your course name is required"],
  },
  college:{
    type:String,
    required:[true,"Your college name is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);