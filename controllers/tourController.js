const Tour = require("../models/tourModel")
const APIFeatures = require("../utils/apiFeatures")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query) //
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const tours = await features.query

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  })
})

exports.getTour = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const tour = await Tour.findById(id)

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404))
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  })
})

exports.createTour = catchAsync(async (req, res, next) => {
  const { name, duration, maxGroupSize, difficulty, ratingsAverage, ratingsQuantity, price, summary, description, imageCover, images, startDates } = req.body

  const newTour = await Tour.create({ name, duration, maxGroupSize, difficulty, ratingsAverage, ratingsQuantity, price, summary, description, imageCover, images, startDates })

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  })
})

exports.updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id

  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  })
})

exports.deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const tour = await Tour.findByIdAndDelete(id)

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404))
  }
  res.status(204).json({
    status: "success",
    date: null,
  })
})
