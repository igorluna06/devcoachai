import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
}

export default function Button({ variant = 'primary', children, ...rest }: ButtonProps) {
  const base = 'px-4 py-2 rounded-md font-medium inline-flex items-center justify-center'
  const styles = variant === 'primary' ? 'bg-brand-primary hover:bg-brand-hover text-white' : variant === 'danger' ? 'bg-error text-white' : 'bg-transparent text-text.primary'
  return (
    <button className={`${base} ${styles}`} {...rest}>
      {children}
    </button>
  )
}
