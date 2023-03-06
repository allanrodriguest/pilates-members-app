const express = require('express')
const path = require('path')
const moment = require('moment')
const app = express()
const members = require('./Members')

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }: ${moment().format()}`
  )
  next()
}
// Init Middleware
app.use(logger)

// Get All Members
app.get('/api/members', (req, res) => {
  res.json(members)
})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
