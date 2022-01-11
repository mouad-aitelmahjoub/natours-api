const express = require("express")
const connectDB = require("./config/db")
const colors = require("colors")
const dotenv = require("dotenv")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")

const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorController")
const tourRoutes = require("./routes/tourRoutes")
const userRoutes = require("./routes/userRoutes")
const reviewRoutes = require("./routes/reviewRoutes")

//Dotenv file
dotenv.config()

//Connect to Database
connectDB()

//initialize expresse App
const app = express()

//Use JSON middleware
app.use(express.json())

//Data Sanitization against NoSQL query injection
app.use(mongoSanitize())

//Data Sanitization against XSS
app.use(xss())

//Configure Routes
app.use("/api/v1/tours", tourRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/reviews", reviewRoutes)

//Unhandled routes
app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  next(err)
})

//Global error handling middleware
app.use(globalErrorHandler)

//Launching server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`✔✔✔ App is running on port :  ${PORT} ✨🌟⭐`.bgGreen)
})

//Unhandled Rejections
process.on("unhandledRejection", (err) => {
  console.log("Unhanled Rejection 💥".bgRed)
  console.log(err.name.bgRed, err.message.bgRed)
  process.exit(1)
})

//Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception 💥".bgRed)
  console.log(`${err.name}: ${err.message.bgRed}`)
  process.exit(1)
})
