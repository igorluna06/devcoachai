import React from 'react'

export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-bg.tertiary animate-pulse ${className}`} />
}
