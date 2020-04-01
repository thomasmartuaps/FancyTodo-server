if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandling')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Port ${process.env.PORT} is good to go!`))