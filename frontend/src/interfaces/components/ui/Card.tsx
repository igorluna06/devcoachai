import React from 'react'

export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-bg.secondary border border-border.default rounded-md p-4 ${className}`}>{children}</div>
}
