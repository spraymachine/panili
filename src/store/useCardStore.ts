import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { Card, ColumnId } from '../types'

type CardStore = {
  cards: Card[]
  addCard: (
    card: Omit<Card, 'id' | 'createdAt' | 'order'>,
    order?: number
  ) => void
  moveCard: (cardId: string, targetColumn: ColumnId) => void
  editCard: (cardId: string, updates: Partial<Card>) => void
  deleteCard: (cardId: string) => void
  reorderCard: (cardId: string, targetColumn: ColumnId, newOrder: number) => void
}

const getNextOrder = (cards: Card[], column: ColumnId): number => {
  const columnCards = cards.filter((c) => c.column === column)
  if (columnCards.length === 0) return 0
  return Math.max(...columnCards.map((c) => c.order)) + 1
}

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      cards: [],
      addCard: (card, order) =>
        set((state) => {
          const newOrder =
            order ?? getNextOrder(state.cards, card.column)
          const newCard: Card = {
            ...card,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            order: newOrder,
          }
          return { cards: [...state.cards, newCard] }
        }),
      moveCard: (cardId, targetColumn) =>
        set((state) => {
          const card = state.cards.find((c) => c.id === cardId)
          if (!card || card.column === targetColumn) return state
          const newOrder = getNextOrder(state.cards, targetColumn)
          return {
            cards: state.cards.map((c) =>
              c.id === cardId
                ? { ...c, column: targetColumn, order: newOrder }
                : c
            ),
          }
        }),
      editCard: (cardId, updates) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === cardId ? { ...c, ...updates } : c
          ),
        })),
      deleteCard: (cardId) =>
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== cardId),
        })),
      reorderCard: (cardId, targetColumn, newOrder) =>
        set((state) => {
          const card = state.cards.find((c) => c.id === cardId)
          if (!card) return state
          const othersInTarget = state.cards
            .filter((c) => c.column === targetColumn && c.id !== cardId)
            .sort((a, b) => a.order - b.order)
          const newTargetCards = [
            ...othersInTarget.slice(0, newOrder),
            { ...card, column: targetColumn },
            ...othersInTarget.slice(newOrder),
          ].map((c, i) => ({ ...c, order: i }))
          const cardsInOtherColumns = state.cards.filter(
            (c) => c.id !== cardId && c.column !== targetColumn
          )
          return {
            cards: [...cardsInOtherColumns, ...newTargetCards],
          }
        }),
    }),
    { name: 'panii-li-cards' }
  )
)
