import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function Input({ label, ...rest }: Props) {
  return (
    <label className="flex flex-col gap-1 text-sm w-full">
      {label && <span className="text-text.secondary">{label}</span>}
      <input {...rest} className="px-3 py-2 rounded-md bg-bg.tertiary border border-border.subtle text-text.primary w-full" />
    </label>
  )
}
