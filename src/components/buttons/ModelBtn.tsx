import { Icon } from '@iconify/react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const MlModelBtn: React.FC<ButtonProps> = ({ onClick, children, className, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 da:focus:ring-primary-900 ${className}`}
      type={type}>
      <Icon icon={'ph-moon'} />
      {children}
    </button>
  );
};

export default MlModelBtn;
