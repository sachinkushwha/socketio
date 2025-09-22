const jwt = require('jsonwebtoken');
exports.jwtauth = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).json('jwttoken is required');
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json('jwt is expire')
    }
}