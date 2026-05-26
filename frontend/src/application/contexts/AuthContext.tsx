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

  useEffect(() => {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    if (id && token) {
      api.get(`/user/${id}`)
        .then((res) => setUser(res.data))
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

      // Decodifica o payload do JWT (sem biblioteca)
      const payload = JSON.parse(atob(token.split('.')[1]))
      const userId = payload.userId ?? payload.id ?? payload.sub

      if (!userId) throw new Error('userId not found in token')

      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      if (!token || !userId) throw new Error('Invalid response')
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      const userRes = await api.get(`/user/${userId}`)
      setUser(userRes.data)
      toast.success('Logged in')
    } catch (err: any) {
  console.log('ERRO LOGIN:', err)
  console.log('RESPOSTA LOGIN:', err.response)
  console.log('DADOS LOGIN:', err.response?.data)

  toast.error('Failed to login')

  throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, birthDate: string, email: string, password: string) => {
    setLoading(true)
    try {
      const res = await api.post('/user', { userName: name, birthDate, email, password })
      const token = res.data.token ?? res.data?.token
      const userId = res.data.userId ?? res.data?.id
      if (token) localStorage.setItem('token', token)
      if (userId) localStorage.setItem('userId', userId)
      if (userId) {
        const userRes = await api.get(`/user/${userId}`)
        setUser(userRes.data)
      }
      toast.success('Account created')
    } catch (e) {
      toast.error('Failed to create account')
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
