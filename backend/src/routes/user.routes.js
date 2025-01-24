import express from "express"
import { testController, getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js"
import { hashPassword } from "../middlewares/hashPassword.js"

const router = express.Router()

// Define routes
router.route("/test").get(testController)
router.route("/get").get(getUsers)
router.route('/create').post(hashPassword, createUser);
router.route("/update/:id").put(updateUser)
router.route("/delete/:id").delete(deleteUser)
export default router
