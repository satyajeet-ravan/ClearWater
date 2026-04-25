import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import geocodeRoute from "./src/routes/geocode.router.js"
import stateRoute from "./src/routes/stateRoute.js"
import districtRoute from "./src/routes/districtFetch.router.js"
import monitoringLocationRoute from "./src/routes/monitoringLocation.router.js"
import waterQualityRoute from "./src/routes/waterQuality.router.js"
import inputRouter from "./src/routes/inputQualityChecker.router.js"

dotenv.config()
const app = express()

app.use(cors())

app.use(express.json())

app.use("/geocode", geocodeRoute)
app.use("/api", stateRoute)
app.use("/api", districtRoute)
app.use("/api", monitoringLocationRoute)
app.use("/api/quality", waterQualityRoute)
app.use("/api", inputRouter)

app.get("/", (req, res) => {
    res.send("Server Running...")
})

const port = process.env.PORT || 3000

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});