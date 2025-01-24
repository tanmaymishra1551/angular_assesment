import express from "express"
import { testController, } from "../controllers/user.controller.js"

const router = express.Router()

// Define routes
router.route("/test").get(testController)
export default router
