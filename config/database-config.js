const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB
} = process.env

module.exports = {
    mongodb : {
        HOST : MONGO_HOST,
        PORT : MONGO_PORT,
        DB : MONGO_DB,
    }
}