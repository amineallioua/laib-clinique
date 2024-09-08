const jwt = require('jsonwebtoken');
require('dotenv').config();  // Load .env file

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });
  console.log(process.env.JWT_SECRET);
  
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Prevent XSS attacks (cross-site scripting attacks)
    sameSite: 'strict', // CSRF attacks (cross-site request forgery attacks)
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
  });

  return token; // Return the token
};

module.exports = generateTokenAndSetCookie;