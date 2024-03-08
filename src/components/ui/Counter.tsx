import React from 'react';
import { CounterBtn } from '@/components';

type CounterProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  className: string;
};

const Counter: React.FC<CounterProps> = ({ value, setValue, className }) => {
  const decrement = () => {
    if (value > 0.1) {
      setValue(prevValue => parseFloat((prevValue - 0.1).toFixed(1)));
    }
  };

  const increment = () => {
    if (value < 0.9) {
      setValue(prevValue => parseFloat((prevValue + 0.1).toFixed(1)));
    }
  };

  return (
    <div className={`flex flex-row item-center gap-7 ${className}`}>
      {/* <h1 className="text-gray-700 text-xl text-center font-semibold">Threshold: - </h1> */}
      <div className="flex flex-row items-center h-9 w-30 rounded-xl relative bg-gray-300 cursor-pointer">
        <CounterBtn onClick={decrement} children="-" />
        <h6 className="text-lg mx-6 text-center">{value.toFixed(1)}</h6>
        <CounterBtn onClick={increment} children="+" />
      </div>
    </div>
  );
};

export default Counter;
