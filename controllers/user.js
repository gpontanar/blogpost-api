const User = require('../models/User');
const jwt = require('jsonwebtoken');

// User Registration
module.exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Registered Successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// User Login
// module.exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
//         res.status(200).json({ access: token });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        console.log('Login successful, returning data:', { id: user._id, access: token }); // Debugging
        // res.status(200).json({ id: user._id, access: token });
        res.status(200).json({ id: user._id, isAdmin: user.isAdmin, access: token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve User Details
module.exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ _id: user._id, isAdmin: user.isAdmin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};