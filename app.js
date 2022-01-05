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
