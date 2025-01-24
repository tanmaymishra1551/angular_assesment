// controllers/userController.mjs
import db from "../db/index.js"
const users = [
    {
        _id: "1",
        username: "johndoe",
        email: "johndoe@example.com",
        fullName: "John Doe",
    },
    {
        _id: "2",
        username: "janedoe",
        email: "janedoe@example.com",
        fullName: "Jane Doe",
    },
    {
        _id: "3",
        username: "bobsmith",
        email: "bobsmith@example.com",
        fullName: "Bob Smith",
    },
    {
        _id: "4",
        username: "alicesmith",
        email: "alicesmith@example.com",
        fullName: "Alice Smith",
    },
    {
        _id: "5",
        username: "charliebrown",
        email: "charliebrown@example.com",
        fullName: "Charlie Brown",
    },
]

export const testController = (req, res) => {
    res.status(200).json({ message: "Test controller is working!" })
}

// Get users with pagination [DONT TOUCH THIS]
export const getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    const offset = (page - 1) * limit

    try {
        // Fetch paginated users
        const users = await db("users").select("*").limit(limit).offset(offset)

        // Count the total number of users
        const [{ count }] = await db("users").count("id as count")

        const totalPages = Math.ceil(count / limit)

        res.json({
            users,
            totalPages,
            currentPage: page,
            totalUsers: parseInt(count, 10),
        })
    } catch (error) {
        console.error("Error fetching users:", error)
        res.status(500).json({ error: "Failed to fetch users" })
    }
}

// Create a new user [DONT TOUCH THIS]
export const createUser = async (req, res) => {
    const { fullName, username, email, password } = req.body

    if (!fullName || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        // Insert the user into the users table after the password is hashed
        const [newUser] = await db("users")
            .insert({
                fullname: fullName,
                username,
                email,
                password, // The password should already be hashed by the middleware
            })
            .returning("*") // Returning all columns of the newly inserted user

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                fullName: newUser.full_name,
                username: newUser.username,
                email: newUser.email,
            },
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" })
    }
}

// Update an existing user
export const updateUser = async (req, res) => {
    const { id } = req.params
    const { fullName, username, email, password } = req.body

    if (!fullName && !username && !email && !password) {
        return res.status(400).json({ message: "At least one field is required to update" })
    }

    try {
        // Check if the user exists
        const existingUser = await db("users").where("id", id).first()

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        // Update the user's information
        const updatedUser = await db("users")
            .where("id", id)
            .update({
                fullname: fullName || existingUser.fullname,
                username: username || existingUser.username,
                email: email || existingUser.email,
                password: password || existingUser.password, // The password should already be hashed if it's being updated
            })
            .returning("*") // Return updated user info

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser[0].id,
                fullName: updatedUser[0].fullname,
                username: updatedUser[0].username,
                email: updatedUser[0].email,
            },
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" })
    }
}

// Delete a user [DONT TOUCH THIS]
export const deleteUser = async (req, res) => {
    const { id } = req.params  // Access the 'id' from the route parameter

    if (!id) {
        return res.status(400).json({ message: "User ID is required" })
    }

    try {
        // Delete the user from the users table based on the provided ID
        const deletedUser = await db("users")
            .where({ id })
            .del()  // Deletes the user with the given ID

        if (deletedUser === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            message: "User deleted successfully",
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" })
    }
}


