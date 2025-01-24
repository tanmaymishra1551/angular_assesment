import bcrypt from 'bcrypt';

export const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Replace the plain text password with the hashed version
        req.body.password = hashedPassword;

        next(); // Pass control to the next middleware or controller
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Failed to process the password.' });
    }
};
