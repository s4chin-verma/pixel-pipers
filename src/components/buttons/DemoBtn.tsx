import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const DemoBtn: React.FC<ButtonProps> = ({ className = '', children, ...restProps }) => {
  return (
    <button
      className={`inline-flex items-center justify-center shadow-md bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ${className}`}
      {...restProps}>
      {children}
    </button>
  );
};

export default DemoBtn;
