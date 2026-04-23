import express from "express"
import manualQuality from "../controller/inputQualityCheck.controller.js"

const inputRouter = express.Router()

inputRouter.post("/quality/input", manualQuality)

export default inputRouter;