import express from "express"
import { authController } from "./auth.controller"

const authRouts =express.Router()
authRouts.post("/logIn",authController.logIn)

export default authRouts



