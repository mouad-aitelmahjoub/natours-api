const express = require("express")
const authController = require("../controllers/authController")
const userController = require("../controllers/userController")

const router = express.Router()

router //
  .route("/signup")
  .post(authController.signup)

router //
  .route("/login")
  .post(authController.login)

router //
  .route("/updatePassword")
  .patch(
    authController.protect, //
    authController.updatePassword
  )

router //
  .route("/updateMe")
  .patch(
    authController.protect, //
    userController.updateMe
  )

router //
  .route("/deleteMe")
  .delete(
    authController.protect, //
    userController.deleteMe
  )

router
  .route("/") //
  .get(userController.getAllUsers) /*
  .post(tourController.createTour)*/

/*router.route("/:id") 
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)*/

module.exports = router
