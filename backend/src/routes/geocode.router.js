import express from "express"
import { geocode } from "../controller/geocode.controller"

const router = express.Router()

router.get("/api", geocode)

export default router;