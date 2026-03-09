import { ChevronLeft, ChevronRight } from 'lucide-react'

type CardMoveArrowsProps = {
  onPrev: () => void
  onNext: () => void
  canMovePrev: boolean
  canMoveNext: boolean
}

export function CardMoveArrows({
  onPrev,
  onNext,
  canMovePrev,
  canMoveNext,
}: CardMoveArrowsProps) {
  return (
    <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
      {canMovePrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="w-7 h-7 rounded-full flex items-center justify-center text-lavender-500 hover:bg-lavender-300 hover:text-white transition-colors"
          aria-label="Move to previous column"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {canMoveNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="w-7 h-7 rounded-full flex items-center justify-center text-lavender-500 hover:bg-lavender-300 hover:text-white transition-colors"
          aria-label="Move to next column"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
