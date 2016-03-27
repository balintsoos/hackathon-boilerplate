'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

/*
 * Mongoose User Schema
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },

  password: String,
  passwordResetToken: String,
  passwordResetExpires: String,

  google: String,
  facebook: String,
  twitter: String,
  github: String,

  profile: {
    name: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },
}, { timestamps: true })

/*
 * Password hash
 */
userSchema.pre('save', (next) => {
  let user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

/*
 * Helper method for validating password
 */
userSchema.methods.comparePassword = (password, callback) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err)

    callback(null, isMatch)
  })
}

/*
 * Helper method for gravatar
 */
userSchema.methods.gravatar = (size) => {
  let route = 'https://gravatar.com/avatar/'
  let placeholder = '&d=mm'

  if (!size) {
    size = 200
  }

  if (!this.email) {
    return route + '?s=' + size + placeholder
  }

  let md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return route + md5 + '?s=' + size + placeholder
}

const User = mongoose.model('User', userSchema)

module.exports = User
