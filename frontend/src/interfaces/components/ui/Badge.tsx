import React from 'react'

export default function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-xs px-2 py-1 rounded-full bg-bg.tertiary ${className}`}>{children}</span>
}
