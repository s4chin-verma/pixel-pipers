import React, { ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface ButtonProps {
  children: ReactNode;
  icon: string;
  onClick?: () => void;
}

const FormButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div className="flex w-full">
      <button
        type="submit"
        className="flex items-center gap-3 justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
        onClick={onClick}>
        {children}
        <Icon icon={'ri:login-circle-line'} className=" h-8 w-8" />
      </button>
    </div>
  );
};

export default FormButton;
