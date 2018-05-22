const auth = require('./auth')
const page = require('./page')

module.exports = {
  Mutation: {
    ...auth,
    ...page
  }
}