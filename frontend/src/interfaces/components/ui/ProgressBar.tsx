import React from 'react'

export default function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className="w-full bg-bg.tertiary rounded-full h-3">
      <div className="h-3 rounded-full bg-brand-primary" style={{ width: `${pct}%` }} />
    </div>
  )
}
