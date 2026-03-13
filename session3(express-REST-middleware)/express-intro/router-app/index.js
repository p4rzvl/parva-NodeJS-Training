const express = require('express')
const app = express()
const PORT = 3000

const homeRouter = require('./routes/home')
const apiRouter = require('./routes/api')

app.use('/', homeRouter)
app.use('/api', apiRouter)

app.listen(PORT)