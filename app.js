const express = require("express")
const colors = require("colors")

const app = express()

const PORT = 3000
app.listen(PORT, () => {
  console.log(`✔✔✔ App is running on port :  ${PORT} ✔✔✔ `.bgGreen)
})
