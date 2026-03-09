import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { format } from 'date-fns'
import type { Card as CardType, ColumnId } from '../../types'
import { useCardStore } from '../../store/useCardStore'
import { useUserStore } from '../../store/useUserStore'
import { ConfirmModal } from './ConfirmModal'

type CardModalProps =
  | { card: CardType; column?: never; onClose: () => void; mode: 'edit' }
  | { card?: never; column: ColumnId; onClose: () => void; mode: 'add' }

export function CardModal(props: CardModalProps) {
  const { onClose, mode } = props
  const card = props.mode === 'edit' ? props.card : undefined
  const column = props.mode === 'add' ? props.column : undefined

  const currentUser = useUserStore((s) => s.currentUser)
  const addCard = useCardStore((s) => s.addCard)
  const editCard = useCardStore((s) => s.editCard)
  const deleteCard = useCardStore((s) => s.deleteCard)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateStarted, setDateStarted] = useState(
    format(new Date(), 'yyyy-MM-dd')
  )
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (card) {
      setTitle(card.title)
      setDescription(card.description ?? '')
      setDateStarted(card.dateStarted.split('T')[0])
    } else {
      setTitle('')
      setDescription('')
      setDateStarted(format(new Date(), 'yyyy-MM-dd'))
    }
  }, [card])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !currentUser) return

    if (mode === 'add' && column) {
      addCard({
        title: title.trim(),
        description: description.trim() || undefined,
        dateStarted: dateStarted,
        ownerId: currentUser.id,
        ownerColor: currentUser.color,
        column,
      })
    } else if (mode === 'edit' && card) {
      editCard(card.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        dateStarted: dateStarted,
      })
    }
    onClose()
  }

  const handleDelete = () => {
    if (card) {
      deleteCard(card.id)
      setShowDeleteConfirm(false)
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-modal w-full max-w-md overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-lavender-200 flex items-center justify-between">
            <h2 className="font-body font-bold text-lg text-plum">
              {mode === 'add' ? 'New Card 🪡' : 'Edit Card'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-lavender-100 text-plum-muted hover:text-plum transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block font-body font-medium text-plum text-sm mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter card title..."
                className="w-full px-4 py-2.5 rounded-lg border border-lavender-200 focus:border-lavender-300 focus:ring-2 focus:ring-lavender-300/30 outline-none font-body transition-all"
                autoFocus
              />
            </div>
            <div>
              <label className="block font-body font-medium text-plum text-sm mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-lavender-200 focus:border-lavender-300 focus:ring-2 focus:ring-lavender-300/30 outline-none font-body transition-all resize-none"
              />
            </div>
            <div>
              <label className="block font-body font-medium text-plum text-sm mb-2">
                Date Started
              </label>
              <input
                type="date"
                value={dateStarted}
                onChange={(e) => setDateStarted(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-lavender-200 focus:border-lavender-300 focus:ring-2 focus:ring-lavender-300/30 outline-none font-body transition-all"
              />
            </div>
            <div className="flex gap-3 pt-2">
              {mode === 'edit' && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2.5 rounded-lg font-body font-medium text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg font-body font-medium text-sm text-plum-muted hover:bg-lavender-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-4 py-2.5 rounded-lg font-body font-medium text-sm bg-lavender-300 text-white hover:bg-lavender-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showDeleteConfirm && (
          <ConfirmModal
            title="Delete Card"
            message="Are you sure you want to delete this card? This cannot be undone."
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
