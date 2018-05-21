const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async signup(parent, { password, email, name }, ctx, info) {
    if (!name) {
      name = email.split('@')[0]
    }

    password = await bcrypt.hash(password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { name, email, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}