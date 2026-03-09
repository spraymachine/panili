import { motion } from 'framer-motion'

type ConfirmModalProps = {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-modal p-6 max-w-sm w-full"
      >
        <h3 className="font-body font-bold text-lg text-plum mb-2">{title}</h3>
        <p className="font-body text-plum-muted text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-lg font-body font-medium text-sm text-plum-muted hover:bg-lavender-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-lg font-body font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}
