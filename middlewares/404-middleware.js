module.exports = (req, res, next) => {
    return res.status(404).json({
        message : "Route was not found!",
        status : "Error",
        code : 404
    })
}