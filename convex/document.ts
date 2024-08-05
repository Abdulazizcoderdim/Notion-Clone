import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const createDocument = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Not signed in yet document.ts')
    }

    const userId = identity.subject

    const document = await ctx.db.insert('documents', {
      title: args.title,
      parenDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    })

    return document
  },
})
