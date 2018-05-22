const getUserId = require('../../utils/getUserId')

exports.createPage = async (parent, { name, category, creation }, ctx, info) => {
  const userId = getUserId(ctx)
  const existing = await ctx.db.query.creatorPages({ where: { owner: { id: userId } } })
  
  if (existing.length > 0) {
    throw new Error('Only one page is allowed per user!')
  }

  return await ctx.db.mutation.createCreatorPage({
    data: {
      name,
      category,
      creation,
      owner: {
        connect: {
          id: userId
        }
      }
    },
    info
  })
}