import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import type { Card as CardType } from '../../types'
import { useCardStore } from '../../store/useCardStore'
import { COLUMN_ORDER, USERS } from '../../constants/users'
import { CardMoveArrows } from './CardMoveArrows'

type CardProps = {
  card: CardType
  onEdit: (card: CardType) => void
}

export function Card({ card, onEdit }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: card.id })

  const moveCard = useCardStore((s) => s.moveCard)

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const handleMove = (direction: 'prev' | 'next') => {
    const idx = COLUMN_ORDER.indexOf(card.column)
    const newIdx = direction === 'next' ? idx + 1 : idx - 1
    if (newIdx >= 0 && newIdx < COLUMN_ORDER.length) {
      moveCard(card.id, COLUMN_ORDER[newIdx])
    }
  }

  const canMovePrev = COLUMN_ORDER.indexOf(card.column) > 0
  const canMoveNext = COLUMN_ORDER.indexOf(card.column) < COLUMN_ORDER.length - 1

  const ownerTint =
    USERS.find((u) => u.id === card.ownerId)?.tint ?? 'rgba(0,0,0,0.04)'
  const cardStyle: React.CSSProperties = {
    ...style,
    background: `linear-gradient(${ownerTint}, ${ownerTint}), white`,
    borderColor: '#DDD5F0',
    borderLeftWidth: '3px',
    borderLeftColor: card.ownerColor,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={cardStyle}
      initial={false}
      animate={{
        scale: isDragging ? 1.02 : 1,
        rotate: isDragging ? 1.5 : 0,
        opacity: isDragging ? 0.9 : 1,
      }}
      transition={{ duration: 0.15 }}
      onClick={() => onEdit(card)}
      className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
        isDragging ? 'shadow-card-hover z-50' : 'shadow-card hover:shadow-card-hover'
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-body font-semibold text-plum text-base flex-1">
            {card.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <CardMoveArrows
              onPrev={() => handleMove('prev')}
              onNext={() => handleMove('next')}
              canMovePrev={canMovePrev}
              canMoveNext={canMoveNext}
            />
          </div>
        </div>
        {card.description && (
          <p className="mt-2 text-sm text-plum-muted line-clamp-2">
            {card.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2 text-xs text-plum-muted">
          <span>📅 {format(parseISO(card.dateStarted), 'MMM d, yyyy')}</span>
          <span>•</span>
          <span
            className="flex items-center gap-1"
            style={{ color: card.ownerColor }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: card.ownerColor }}
            />
            {card.ownerId.charAt(0).toUpperCase() + card.ownerId.slice(1)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
