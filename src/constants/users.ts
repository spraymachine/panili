import type { User, ColumnId } from '../types'

export const USERS: User[] = [
  {
    id: 'mani',
    name: 'Mani',
    color: '#5B9BD5',
    tint: 'rgba(91,155,213,0.08)',
  },
  {
    id: 'pari',
    name: 'Pari',
    color: '#6ABF8E',
    tint: 'rgba(106,191,142,0.08)',
  },
  {
    id: 'liki',
    name: 'Liki',
    color: '#F5C842',
    tint: 'rgba(245,200,66,0.08)',
  },
]

export const COLUMN_ORDER: ColumnId[] = ['todo', 'inprogress', 'completed']
