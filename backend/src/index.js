import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: "./.env",
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})
