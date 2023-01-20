const express = require('express');
const app = express()
const mongoConnect = require('./database/mongodb-db');
const cors = require('cors');
require('dotenv').config();
const { APP_PORT } = process.env
const usersRoutes = require('./routes/users-routes');
const notFoundRoute = require('./middlewares/404-middleware');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use('/api/users', usersRoutes)
app.use(notFoundRoute)

mongoConnect()
    .then(() => app.listen(APP_PORT))
