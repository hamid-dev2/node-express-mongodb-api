const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env

module.exports = (req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(" ")

        const decodedToken = jwt.verify(token, TOKEN_KEY)

        req.userData = { email : decodedToken.email }

        return next()
    } catch (err) {
        return res.json({ message : "Auth was failed!" })
    }
}