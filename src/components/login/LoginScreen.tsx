import { motion } from 'framer-motion'
import { useUserStore } from '../../store/useUserStore'
import { USERS } from '../../constants/users'

export function LoginScreen() {
  const login = useUserStore((s) => s.login)

  return (
    <div className="min-h-screen bg-lavender-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft lavender blob shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-lavender-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-lavender-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lavender-100/40 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-modal p-8 w-full max-w-md"
      >
        <h1 className="font-display text-3xl text-plum text-center mb-8">
          who's crafting today? 🧶
        </h1>
        <div className="flex flex-col gap-4">
          {USERS.map((user, i) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.2 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => login(user.id)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200"
              style={{
                backgroundColor: `${user.color}15`,
                borderColor: `${user.color}40`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-body font-bold text-lg"
                style={{ backgroundColor: user.color }}
              >
                {user.name[0]}
              </div>
              <span className="font-body font-semibold text-plum text-lg">
                {user.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
