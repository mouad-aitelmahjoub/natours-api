const Tour = require("../models/tourModel")
const APIFeatures = require("../utils/apiFeatures")
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
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  })
})

exports.deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const result = await Tour.findByIdAndDelete(id)
  res.status(204).json({
    status: "success",
    date: null,
  })
})
