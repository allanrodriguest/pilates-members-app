const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const logger = require('./middleware/logger')
const members = require('./Members')

const app = express()

// Init Middleware
// app.use(logger)

//HandleBars Middleware
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Pilates Member App',
    members
  })
)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// // Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
