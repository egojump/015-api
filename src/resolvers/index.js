const auth = require('./auth')

module.exports = {
  Mutation: {
    ...auth
  }
}