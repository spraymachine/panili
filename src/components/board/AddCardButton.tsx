import { Plus } from 'lucide-react'

type AddCardButtonProps = {
  onClick: () => void
}

export function AddCardButton({ onClick }: AddCardButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 mt-2 rounded-xl border-2 border-dashed border-lavender-300 text-lavender-500 hover:bg-lavender-100 hover:border-lavender-400 transition-all flex items-center justify-center gap-2 font-body font-medium"
    >
      <Plus className="w-4 h-4" />
      New card
    </button>
  )
}
