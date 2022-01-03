const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
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

const PORT = 5000
app.listen(PORT, () => {
  console.log(`✔✔✔ App is running on port :  ${PORT} ✨🌟⭐`.bgGreen)
})
