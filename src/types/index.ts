export type UserId = 'mani' | 'pari' | 'liki'

export type User = {
  id: UserId
  name: string
  color: string
  tint: string
}

export type ColumnId = 'todo' | 'inprogress' | 'completed'

export type Card = {
  id: string
  title: string
  description?: string
  dateStarted: string
  ownerId: UserId
  ownerColor: string
  column: ColumnId
  order: number
  createdAt: string
}
