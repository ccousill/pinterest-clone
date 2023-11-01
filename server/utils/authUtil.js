const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET
const createToken = (id) => {
    return jwt.sign({id},"supersecret",{
        expiresIn: '1h'
    });
}

const authenticateMiddleware = (req, res, next) => {

  // Get the JWT token from the request (e.g., from cookies or headers)
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1] // Adjust this according to your setup
  if (!token) {
    // Token is missing, unauthorized
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the JWT and decode user information
    const user = jwt.verify(token, "supersecret"); // Use your secret key
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