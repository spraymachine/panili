import { useUserStore } from '../../store/useUserStore'

export function Header() {
  const currentUser = useUserStore((s) => s.currentUser)
  const logout = useUserStore((s) => s.logout)

  if (!currentUser) return null

  return (
    <header className="h-16 bg-lavender-100 border-b border-lavender-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧶</span>
        <h1 className="font-display text-2xl text-plum">PaNii Li</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-lavender-200">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentUser.color }}
          />
          <span className="font-body font-medium text-plum text-sm">
            {currentUser.name}
          </span>
        </div>
        <button
          onClick={logout}
          className="font-body text-sm text-plum-muted hover:text-plum transition-colors"
        >
          Switch
        </button>
      </div>
    </header>
  )
}
