const res = require("express/lib/response")
const Tour = require("../models/tourModel")

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: { tours },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}

exports.getTour = async (req, res) => {
  const id = req.params.id
  try {
    const tour = await Tour.findById(id)

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}

exports.createTour = async (req, res) => {
  const { name, duration, maxGroupSize, difficulty, ratingsAverage, ratingsQuantity, price, summary, description, imageCover, images, startDates } = req.body
  try {
    const newTour = await Tour.create({ name, duration, maxGroupSize, difficulty, ratingsAverage, ratingsQuantity, price, summary, description, imageCover, images, startDates })

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}

exports.updateTour = async (req, res) => {
  const id = req.params.id

  try {
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
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}

exports.deleteTour = async (req, res) => {
  const id = req.params.id
  try {
    const result = await Tour.findByIdAndDelete(id)
    res.status(204).json({
      status: "success",
      date: null,
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    })
  }
}
