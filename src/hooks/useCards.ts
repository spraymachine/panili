import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import type { Card, ColumnId } from '../types'

type ConvexCard = {
  _id: Id<'cards'>
  _creationTime: number
  title: string
  description?: string
  dateStarted: string
  ownerId: 'mani' | 'pari' | 'liki'
  ownerColor: string
  column: ColumnId
  order: number
}

function toCard(doc: ConvexCard): Card {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description,
    dateStarted: doc.dateStarted,
    ownerId: doc.ownerId,
    ownerColor: doc.ownerColor,
    column: doc.column,
    order: doc.order,
    createdAt: new Date(doc._creationTime).toISOString(),
  }
}

const getNextOrder = (cards: Card[], column: ColumnId): number => {
  const columnCards = cards.filter((c) => c.column === column)
  if (columnCards.length === 0) return 0
  return Math.max(...columnCards.map((c) => c.order)) + 1
}

export function useCards() {
  const convexCards = useQuery(api.cards.list)
  const addMutation = useMutation(api.cards.add)
  const moveMutation = useMutation(api.cards.move)
  const editMutation = useMutation(api.cards.edit)
  const removeMutation = useMutation(api.cards.remove)

  const cards: Card[] = convexCards ? convexCards.map(toCard) : []
  const isLoading = convexCards === undefined

  const addCard = (
    card: Omit<Card, 'id' | 'createdAt' | 'order'>,
    order?: number
  ) => {
    const newOrder = order ?? getNextOrder(cards, card.column)
    addMutation({
      title: card.title,
      description: card.description,
      dateStarted: card.dateStarted,
      ownerId: card.ownerId,
      ownerColor: card.ownerColor,
      column: card.column,
      order: newOrder,
    })
  }

  const moveCard = (cardId: string, targetColumn: ColumnId) => {
    const newOrder = getNextOrder(cards, targetColumn)
    moveMutation({
      cardId: cardId as Id<'cards'>,
      targetColumn,
      newOrder,
    })
  }

  const editCard = (cardId: string, updates: Partial<Card>) => {
    const patch: { title?: string; description?: string; dateStarted?: string } =
      {}
    if (updates.title !== undefined) patch.title = updates.title
    if (updates.description !== undefined) patch.description = updates.description
    if (updates.dateStarted !== undefined) patch.dateStarted = updates.dateStarted
    if (Object.keys(patch).length > 0) {
      editMutation({ cardId: cardId as Id<'cards'>, ...patch })
    }
  }

  const deleteCard = (cardId: string) => {
    removeMutation({ cardId: cardId as Id<'cards'> })
  }

  return {
    cards,
    isLoading,
    addCard,
    moveCard,
    editCard,
    deleteCard,
  }
}
