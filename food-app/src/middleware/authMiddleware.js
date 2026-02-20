const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header("authorization");
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: 'No authorization header provided',
            });
        }

        // Handle Bearer token format robustly
        let token;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else {
            token = authHeader; // Assume the header is the token itself if "Bearer " is missing
        }

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Invalid authorization format',
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized user',
                })
            } else {
                if (!req.body) req.body = {};
                req.body.id = decode.id;
                next();
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in auth api',
            error: error.message
        })
    }
}