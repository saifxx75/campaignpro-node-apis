const jwt = require('jsonwebtoken');

const extractUserIdFromToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Assuming the token is in the "Authorization" header
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Handle token verification error
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.userId = decoded.userId; // Add userId to the request
            next();
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = extractUserIdFromToken;