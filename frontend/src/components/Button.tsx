import React from 'react'

interface ButtonProps {
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  type?: 'default' | 'primary' | 'secondary' | 'warning'
  size?: 'big' | 'medium' | 'small'
}

const Button: React.FC<ButtonProps> = ({
  onClick = () => {},
  children,
  className = '',
  type = 'default',
  size = 'medium',
}) => {
  const getTypeClass = (type: string) => {
    switch (type) {
      case 'primary':
        return 'bg-purple-600 hover:bg-purple-700'
      case 'secondary':
        return 'bg-emerald-600 hover:bg-emerald-700'
      case 'warning':
        return 'bg-red-500 hover:bg-red-600'
      default:
        return 'bg-gray-500 hover:bg-gray-700'
    }
  }

  const getSizePadding = (size: string) => {
    switch (size) {
      case 'big':
        return 'px-6 py-3'
      case 'small':
        return 'px-3 py-1'
      default:
        return 'px-6 py-2'
    }
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-lg text-white transition-colors duration-300 ${getTypeClass(type)} ${getSizePadding(size)} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
