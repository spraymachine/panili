import { useDroppable } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import type { ColumnId } from '../../types'

type ColumnProps = {
  id: ColumnId
  title: string
  emoji: string
  count: number
  children: ReactNode
  isOver?: boolean
}

export function Column({ id, title, emoji, count, children, isOver }: ColumnProps) {
  const { setNodeRef, isOver: dndIsOver } = useDroppable({ id })

  const highlighted = isOver ?? dndIsOver

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-80 min-w-[320px] rounded-2xl border transition-all duration-100 ${
        highlighted
          ? 'bg-lavender-200/50 border-lavender-400 ring-2 ring-lavender-300'
          : 'bg-[#F3EEF9] border-lavender-200'
      }`}
    >
      <div className="px-4 py-3 border-b border-lavender-200 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <span className="font-body font-bold text-lg text-plum">
            {emoji} {title}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-lavender-300 text-plum text-sm font-medium">
            {count}
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 overflow-y-auto max-h-[calc(100vh-220px)] flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}
