import { createContext, useContext } from "react"
import type { ReactNode } from "react"

import { DEMO_LOGINS } from "../../config/app-config"
import { useLocalStorageState } from "../../hooks/use-local-storage-state"
import type { AuthRole } from "./auth-roles"

type AuthUser = {
  name: string
  email: string
  role: AuthRole
}

type SignInValues = {
  email: string
  password: string
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  signIn: (values: SignInValues) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

function getDemoUser(email: string): AuthUser {
  const normalizedEmail = email.toLowerCase().trim()

  if (normalizedEmail === DEMO_LOGINS.STAFF.email) {
    return {
      name: DEMO_LOGINS.STAFF.name,
      email,
      role: DEMO_LOGINS.STAFF.role,
    }
  }

  return {
    name: DEMO_LOGINS.ADMIN.name,
    email,
    role: DEMO_LOGINS.ADMIN.role,
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorageState<AuthUser | null>(
    "forgekit-auth-user",
    null,
  )

  function signIn(values: SignInValues) {
    setUser(getDemoUser(values.email))
  }

  function signOut() {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}