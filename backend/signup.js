const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '69.cidkagenou@gmail.com',  // Replace with your Gmail
        pass: 'jbaz ooqv oahy hhpl'      // Replace with your app password
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match!' });
    }

    try {
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Send welcome email
        const mailOptions = {
            from: '69.cidkagenou@gmail.com', // Replace with your Gmail
            to: email,
            subject: 'Welcome to NewsInsight!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4A90E2;">Welcome to NewsInsight! 🎉</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for signing up with NewsInsight! We're excited to have you on board.</p>
                    <p>With your new account, you can:</p>
                    <ul>
                        <li>Access the latest news from around the world</li>
                        <li>Customize your news feed</li>
                        <li>Save your favorite articles</li>
                    </ul>
                    <p>Start exploring now by visiting our website!</p>
                    <p>Best regards,<br>The NewsInsight Team</p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(201).json({ 
            message: 'User registered successfully. Please check your email for confirmation.'
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;