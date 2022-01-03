const res = require("express/lib/response")
const Tour = require("../models/tourModel")

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find()

  res.status(200).json({
    status: "success",
    data: { tours },
  })
}

exports.getTour = async (req, res) => {
  const id = req.params.id
  const tour = await Tour.findById(id)

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  })
}

exports.createTour = async (req, res) => {
  const { name, price, rating } = req.body

  const newTour = await Tour.create({
    name,
    price,
    rating,
  })

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  })
}

exports.updateTour = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated Tour here...>",
    },
  })
}

exports.deleteTour = async (req, res) => {
  res.status(204).json({
    status: "success",
    date: null,
  })
}
