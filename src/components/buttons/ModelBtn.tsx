import { Icon } from '@iconify/react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const MlModelBtn: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  className,
  type = 'button',
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-5 py-1 mr-3 text-base  text-center focus:ring-4 bg-transparent border border-solid border-red-500 hover:bg-blue-400 hover:text-white active:bg-red-600 font-bold uppercase  rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150
      ${className}`}
      type={type}>
      <Icon icon={icon} className='w-7 h-7 mr-4' />
      {children}
    </button>
  );
};

export default MlModelBtn;
