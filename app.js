const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorController")
const colors = require("colors")
const tourRoutes = require("./routes/tourRoutes")

//Dotenv file
dotenv.config()

//Connect to Database
connectDB()

//initialize expresse App
const app = express()

//Use JSON middleware
app.use(express.json())

//Configure Routes
app.use("/api/v1/tours", tourRoutes)

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
