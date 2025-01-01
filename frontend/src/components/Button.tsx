import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: 'default' | 'primary' | 'secondary'; 
}

const Button: React.FC<ButtonProps> = ({ onClick = () => {}, children, className = '', type = 'default' }) => {
  const getTypeClass = (type: string) => {
    switch (type) {
      case 'primary':
        return 'bg-purple-700 hover:bg-purple-500'; 
      case 'secondary':
        return 'bg-emerald-800 hover:bg-emerald-600'; 
      default:
        return 'bg-gray-700 hover:bg-gray-500';   
    }
  };

  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-lg text-white transition-colors duration-300 ${getTypeClass(type)} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
