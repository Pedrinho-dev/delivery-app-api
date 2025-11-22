import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        res.send("Access denied!");
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
    } catch (err) {
        res.status(400).send(err);
    }

    next()
}

export default authMiddleware;