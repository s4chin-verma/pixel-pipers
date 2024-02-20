import React, { ButtonHTMLAttributes } from 'react';

interface CounterBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: string;
}

const CounterBtn: React.FC<CounterBtnProps> = ({ onClick, children, ...restProps }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-xl cursor-pointer outline-none"
      {...restProps}>
      <span className="m-auto text-2xl font-semi-bold">{children}</span>
    </button>
  );
};

export default CounterBtn;
