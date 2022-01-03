const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const colors = require("colors")

//Dotenv file
dotenv.config()

//Connect to Database
connectDB()

const app = express()

//Use JSON middleware
app.use(express.json())

const PORT = 3000
app.listen(PORT, () => {
  console.log(`✔✔✔ App is running on port :  ${PORT} ✨🌟⭐`.bgGreen)
})
