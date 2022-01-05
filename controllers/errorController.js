const AppError = require("../utils/appError")

//CastId Error
const handleCastErrorDB = (err) => {
  const message = `Invalid data in ${err.path} : ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate ${Object.keys(err.keyPattern)} : ${Object.values(err.keyValue)} . Please use another value`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors)
  const message = `Invalid input data. ${errors.join(". ")}`
  return new AppError(message, 400)
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"
  let error = { ...err }

  if (err.code === 11000) {
    error = handleDuplicateFieldsDB(err)
  }
  if (err.name === "CastError") {
    error = handleCastErrorDB(err)
  }
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors)
    let isCastError = false
    errors.forEach((el) => {
      if (el.name === "CastError") {
        error = handleCastErrorDB(el)
        isCastError = true
      }
    })
    !isCastError ? (error = handleValidationErrorDB(err)) : null
  }
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error: err,
  })

  next()
}
