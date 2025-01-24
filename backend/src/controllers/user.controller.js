import db from "../db/index.js"

export const testController = (req, res) => {
    res.status(200).json({ message: "Test controller is working!" })
}


