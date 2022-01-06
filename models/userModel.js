const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Your password is too short"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //This Only works on CREATE & SAVE and NOT UPDATE!!!
      validator: function (el) {
        return el === this.password
      },
      message: "Your passwords dont match",
    },
  },
})

userSchema.pre("save", async function (next) {
  //Only run this function if password has been modified
  if (!this.isModified("password")) return next()

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  //Delete confirmPassword field in DB
  this.confirmPassword = undefined

  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User
