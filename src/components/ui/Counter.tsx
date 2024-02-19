import React from 'react';

type CounterProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const Counter: React.FC<CounterProps> = ({ value, setValue }) => {
  const decrement = () => {
    if (value > 0) {
      setValue(prevValue => parseFloat((prevValue - 0.1).toFixed(1)));
    }
  };

  const increment = () => {
    if (value < 1) {
      setValue(prevValue => parseFloat((prevValue + 0.1).toFixed(1)));
    }
  };

  return (
    <div className="h-10  flex items-center gap-6">
      <h1 className="text-gray-700 text-2xl font-semibold">Accuracy</h1>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-gray-300 cursor-pointer items-center ">
        <button
          onClick={decrement}
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none">
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <h6 className="text-lg mx-6">{value.toFixed(1)}</h6>
        <button
          onClick={increment}
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer">
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
        {/* <span>You can set the Accuracy form 0.1 to 1.0</span> */}
      </div>
    </div>
  );
};

export default Counter;
