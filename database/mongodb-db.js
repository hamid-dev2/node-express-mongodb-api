const mongoose = require('mongoose');
const { mongodb : { HOST, PORT, DB } } = require('../config/database-config');

module.exports = async () => {
    try {
        const db = await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`)
        console.log("DB was connected successfully...");
    
        return db
    } catch (err) {
        console.log(`DB was not connected! - ${err}`);
    }
}