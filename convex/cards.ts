import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

const cardValidator = {
  title: v.string(),
  description: v.optional(v.string()),
  dateStarted: v.string(),
  ownerId: v.union(v.literal('mani'), v.literal('pari'), v.literal('liki')),
  ownerColor: v.string(),
  column: v.union(
    v.literal('todo'),
    v.literal('inprogress'),
    v.literal('completed')
  ),
  order: v.number(),
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const cards = await ctx.db.query('cards').collect()
    return cards.sort((a, b) => {
      const colOrder = ['todo', 'inprogress', 'completed']
      const colA = colOrder.indexOf(a.column)
      const colB = colOrder.indexOf(b.column)
      if (colA !== colB) return colA - colB
      return a.order - b.order
    })
  },
})

export const add = mutation({
  args: cardValidator,
  handler: async (ctx, args) => {
    return await ctx.db.insert('cards', args)
  },
})

export const move = mutation({
  args: {
    cardId: v.id('cards'),
    targetColumn: v.union(
      v.literal('todo'),
      v.literal('inprogress'),
      v.literal('completed')
    ),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.cardId, {
      column: args.targetColumn,
      order: args.newOrder,
    })
  },
})

export const edit = mutation({
  args: {
    cardId: v.id('cards'),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dateStarted: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { cardId, ...updates } = args
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    )
    if (Object.keys(filtered).length > 0) {
      await ctx.db.patch(cardId, filtered)
    }
  },
})

export const remove = mutation({
  args: { cardId: v.id('cards') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cardId)
  },
})
