const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const { swaggerSpec } = require('./helpers/swaggerDoc')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api', require('./routes/api/'))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
