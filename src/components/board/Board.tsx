import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { useCardStore } from '../../store/useCardStore'
import { useUserStore } from '../../store/useUserStore'
import type { ColumnId } from '../../types'
import { COLUMN_ORDER } from '../../constants/users'
import { Column } from './Column'
import { Card } from '../card/Card'
import { AddCardButton } from './AddCardButton'
import { useState } from 'react'
import { CardModal } from '../modals/CardModal'

const COLUMN_CONFIG: Record<ColumnId, { title: string; emoji: string }> = {
  todo: { title: 'To Do', emoji: '🧵' },
  inprogress: { title: 'In Progress', emoji: '🪡' },
  completed: { title: 'Completed', emoji: '✅' },
}

export function Board() {
  const cards = useCardStore((s) => s.cards)
  const moveCard = useCardStore((s) => s.moveCard)
  const currentUser = useUserStore((s) => s.currentUser)
  const [editingCard, setEditingCard] = useState<typeof cards[0] | null>(null)
  const [addCardColumn, setAddCardColumn] = useState<ColumnId | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const cardId = active.id as string
    const card = cards.find((c) => c.id === cardId)
    if (!card) return

    let targetColumn: ColumnId
    if (over.id === 'todo' || over.id === 'inprogress' || over.id === 'completed') {
      targetColumn = over.id as ColumnId
    } else {
      const overCard = cards.find((c) => c.id === over.id)
      targetColumn = overCard ? overCard.column : card.column
    }

    if (targetColumn !== card.column) {
      moveCard(cardId, targetColumn)
    }
  }

  const getCardsForColumn = (columnId: ColumnId) =>
    cards
      .filter((c) => c.column === columnId)
      .sort((a, b) => a.order - b.order)

  if (!currentUser) return null

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 justify-center flex-wrap max-w-[1280px] mx-auto">
          {COLUMN_ORDER.map((columnId) => (
            <Column
              key={columnId}
              id={columnId}
              title={COLUMN_CONFIG[columnId].title}
              emoji={COLUMN_CONFIG[columnId].emoji}
              count={getCardsForColumn(columnId).length}
            >
              {getCardsForColumn(columnId).map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onEdit={(c) => setEditingCard(c)}
                />
              ))}
              <AddCardButton
                onClick={() => setAddCardColumn(columnId)}
              />
            </Column>
          ))}
        </div>
      </DndContext>

      {editingCard && (
        <CardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          mode="edit"
        />
      )}

      {addCardColumn && (
        <CardModal
          column={addCardColumn}
          onClose={() => setAddCardColumn(null)}
          mode="add"
        />
      )}
    </>
  )
}
