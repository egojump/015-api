const auth = require('./mutations/auth')
const page = require('./mutations/page')

module.exports = {
  Mutation: {
    ...auth,
    ...page
  }
}