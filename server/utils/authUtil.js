const jwt = require("jsonwebtoken");
const createToken = (id) => {
    return jwt.sign({id},'supersecret',{
        expiresIn: '1h'
    });
}

const authenticateMiddleware = (req, res, next) => {
  // Get the JWT token from the request (e.g., from cookies or headers)
  const token = req.cookies.jwt; // Adjust this according to your setup

  if (!token) {
    // Token is missing, unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the JWT and decode user information
    const user = jwt.verify(token, 'your-secret-key'); // Use your secret key
    req.user = user; // Attach user information to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
    createToken,
    authenticateMiddleware
}