const { promisify } = require("util")
const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/appError")

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
  })

  const token = signToken(newUser._id)

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  //1) check if email & password exist
  if (!email || !password) {
    return next(new AppError("Please provide an email and a password", 400))
  }

  //2) check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Email or password are incorrect", 401))
  }
  //3) if everything is correct, send token to client
  const token = signToken(user._id)

  res.status(200).json({
    status: "success",
    token,
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please login to get access", 401))
  }

  //2) Token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  //3) Check if the user exists
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(new AppError("This user doesn't exist anymore! Please signup or login to get access", 401))
  }

  //4) Grant access to protected route
  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403))
    }
    next()
  }
}
