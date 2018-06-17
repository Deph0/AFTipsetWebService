const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const sanitize = require('sanitize')

const index = require('./routes/index')
const files = require('./routes/files')
const bears = require('./routes/bears')
const books = require('./routes/books')
const vmusers = require('./routes/vmusers')
const vmresults = require('./routes/vmresults')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev')) // log requests to the console
app.use(helmet()) // Add security to the app
app.use(cors()) // Add Cross-origin resource sharing to the app
app.use(sanitize.middleware) // sanitize user inputs
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
// serve static files (eg images, styles, etc)
// app.use(express.static(path.join(__dirname, 'public')))

// helmet & other tips for security:
// https://nodesource.com/blog/nine-security-tips-to-keep-express-from-getting-pwned/
// https://github.com/pocketly/node-sanitize

const router = express.Router()
router.use('/files', files)
router.use('/bears', bears)
router.use('/books', books)

/*
/api/v1/users
/api/v1/result
/api/v1/result/matches
/api/v1/result/teams
/api/v1/result/scorers
*/
router.use('/users', vmusers)
router.use('/result', vmresults)

app.use('/', index)
app.use('/api/v1', router)

// START THE SERVER
const port = process.env.PORT || 8080 // set port, either by env or default
const listener = app.listen(port, () => {
  console.log('Express server listening on port %d in %s mode', listener.address().port, app.settings.env)
})

// insperation from https://github.com/scotch-io/node-api/blob/master/server.js
// from guide: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
