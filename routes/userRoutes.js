const express = require("express")
const authController = require("../controllers/authController")

const router = express.Router()

router //
  .route("/signup")
  .post(authController.signup)

router.route("/") /*
  .get(tourController.getAllTours)
  .post(tourController.createTour)*/

router.route("/:id") /*
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)*/

module.exports = router
