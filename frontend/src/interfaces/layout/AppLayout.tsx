import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// Helper to get page title from route
function getPageTitle(pathname: string): string {
  const routes: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/plans': 'Meus Planos',
    '/progress': 'Progresso',
    '/profile': 'Perfil',
    '/settings': 'Configurações'
  }
  return routes[pathname] || 'DevCoachAI'
}

export default function AppLayout() {
  const { pathname } = useLocation()
  const title = getPageTitle(pathname)

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
