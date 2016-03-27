'use strict'

/**
 * Module dependencies
 */
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const nconf = require('nconf')
const compress = require('compression')
const helmet = require('helmet')
const mongoose = require('mongoose')
const validator = require('validator')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')
const chalk = require('chalk')

/**
 * Controllers (route handlers)
 */
const homeController = require('./controllers/home')
const userController = require('./controllers/user')

/**
 * Load config from enviromental variables or config files
 */
nconf.argv()
  .env()

const configPath = nconf.get('config') || './config/config.json'

nconf.file({file: configPath})

/**
 * Connect to MongoDB
 */
if (nconf.get('mongo:available')) {
  mongoose.connect(nconf.get('mongo:url'))

  mongoose.connection.on('error', () => {
    console.log(chalk.red('MongoDB Connection Error. Please make sure that MongoDB is running.'))
    process.exit(1)
  })

  mongoose.connection.on('open', () => {
    console.log(chalk.green('MongoDB Connection Successful.'))
  })
}

/**
 * Create Express server
 */
const app = express()

/**
 * Server configuration
 */
app.use(helmet())
app.use(compress())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(favicon(__dirname + '/public/dist/favicon.ico'))
app.use(serveStatic(__dirname + '/public/dist', { dotfiles: 'ignore' }))

/*
 * Routes
 */
app.use('/', homeController.index)
app.use('/user', userController.index)


app.listen(nconf.get('port'), () => {
  console.log(
    chalk.green('Server listening'),
    chalk.white('@'),
    chalk.underline.magenta('http://localhost:' + nconf.get('port'))
  )
})

module.exports = app
