import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

const columnId = v.union(
  v.literal('todo'),
  v.literal('inprogress'),
  v.literal('completed')
)

const userId = v.union(
  v.literal('mani'),
  v.literal('pari'),
  v.literal('liki')
)

export default defineSchema({
  cards: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    dateStarted: v.string(),
    ownerId: userId,
    ownerColor: v.string(),
    column: columnId,
    order: v.number(),
  }).index('by_column_and_order', ['column', 'order']),
})
