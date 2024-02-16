import React from 'react';
import { Icon } from '@iconify/react';
import { UseFormRegister } from 'react-hook-form';

interface PasswordInputProps {
  icon: string;
  label: string;
  type: string;
  name: string;
  id: string;
  className?: string;
  register: UseFormRegister<any>;
}

const FormInput: React.FC<PasswordInputProps> = ({
  icon,
  id,
  label,
  name,
  type,
  className,
  register,
}) => {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
        {label}
      </label>
      <div className="relative">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <span>
            <Icon className="h-6 w-6" icon={icon} />
          </span>
        </div>
        <input
          id={id}
          type={type}
          className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 ${className}`}
          placeholder={label}
          {...register(name)}
        />
      </div>
    </div>
  );
};

export default FormInput;
