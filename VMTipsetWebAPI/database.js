// DATABASE SETUP
var mysql = require('mysql')
var config = require('./config.json')
var connection = mysql.createConnection(config.database)

// Handle the connection event
connection.connect(function (err) {
  // if (err) throw err
  if (err) {
    console.error(`[MYSQL] error connecting: ${err.stack}`)
    return
  }
  console.log(`[MYSQL] connected as id ${connection.threadId}`)
})

module.exports = connection
