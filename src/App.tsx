import { useUserStore } from './store/useUserStore'
import { LoginScreen } from './components/login/LoginScreen'
import { BoardLayout } from './components/layout/BoardLayout'
import { Board } from './components/board/Board'

function App() {
  const currentUser = useUserStore((s) => s.currentUser)

  if (!currentUser) {
    return <LoginScreen />
  }

  return (
    <BoardLayout>
      <Board />
    </BoardLayout>
  )
}

export default App
