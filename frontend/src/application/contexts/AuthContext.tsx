import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../../infrastructure/http/api'
import toast from 'react-hot-toast'
import { User } from '../../domain/entities/User'

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, birthDate: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const mapUser = (data: any): User => ({
    id: data.userId ?? data.id,
    name: data.userName ?? data.name,
    email: data.email,
    birthDate: data.birthDate,
    avatarUrl: data.avatarUrl ?? null
  })

  useEffect(() => {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    if (id && token) {
      api.get(`/user/${id}`)
        .then((res) => setUser(mapUser(res.data)))
        .catch(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
        })
        .finally(() => setLoading(false))
    } else setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await api.post('/user/auth', { email, password })
      const token = res.data.token
      if (!token) throw new Error('Invalid response')

      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = payload.userId ?? payload.id ?? payload.sub

      if (!userId) throw new Error('userId not found in token')

      localStorage.setItem('token', token)
      localStorage.setItem('userId', String(userId))

      const userRes = await api.get(`/user/${userId}`)
      setUser(mapUser(userRes.data))
      toast.success('Login realizado com sucesso!')
    } catch (err: any) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, birthDate: string, email: string, password: string) => {
    setLoading(true)
    try {
      const res = await api.post('/user', { userName: name, birthDate, email, password })
      const userId = res.data.userId ?? res.data?.id

      if (userId) {
        localStorage.setItem('userId', String(userId))
        const userRes = await api.get(`/user/${userId}`)
        setUser(mapUser(userRes.data))
      }

      toast.success('Conta criada com sucesso!')
    } catch (e) {
      toast.error('Erro ao criar conta.')
      throw e
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}