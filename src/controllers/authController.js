const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if(!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        if (!(await user.validPassword(password))) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
        if (!user.current_status){
            return res.status(403).json({ status: 'error', message: 'User is inactive' });
        }

        let jwtSecret;
        if (process.env.NODE_ENV === 'production') {
            jwtSecret = process.env.JWT_SECRET_PROD;
        } else {
            jwtSecret = process.env.JWT_SECRET_DEV;
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

        res.json({ status: 'success', user, token });

    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, company, password } = req.body;

        if (!username || !email || !company || !password) {
            return res.status(400).json({ status: 'error', message: 'All fields are required' });
        }
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ status: 'error', message: 'Username must contain only letters and numbers' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: 'error', message: 'Invalid email format' });
        }

        if (password.length < 10) {
            return res.status(400).json({ status: 'error', message: 'Password must be at least 10 characters long' });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            id: uuidv4(),
            username,
            email,
            company,
            password: hashedPassword,
            current_status: true,
        });

        const jwtSecret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;
        const token = jwt.sign({ id: newUser.id }, jwtSecret, { expiresIn: '1h' });

        return res.status(201).json({
            status: 'success',
            user: newUser,
            token,
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};
exports.logout = async (req, res) => {
    try {
        
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        res.clearCookie('token'); 

        return res.status(200).json({
            status: 'success',
            message: 'Logout successful',
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
