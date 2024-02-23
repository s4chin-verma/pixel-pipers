import React from 'react';
import { ImageAnnotation } from '..';

interface Props {
  infoDivRef: React.RefObject<HTMLDivElement>;
  image_url: string;
  count: string | null;
  value: number;
  classname: string;
}

const ResultImage: React.FC<Props> = ({
  infoDivRef,
  image_url,
  count,
  value,
  classname,
  ...restProps
}) => {
  return (
    <div
      ref={infoDivRef}
      className={`w-full h-full my-20 relative border border-gray-300 bg-gray-100 rounded-lg ${classname}`}
      {...restProps}>
      <h1 className="text-center text-2xl py-2 font-bold">Result Image</h1>
      <div className="relative order-first md:order-last h-80 sm:h-96 flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover p-2">
        <img src={image_url} alt="Preview image" className="rounded-lg overflow-hidden h-full" />
      </div>
      <div className="w-full rounded-b-lg p-2 md:p-4 bg-gray-200 flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-1 md:gap-24">
        <h1 className="text-lg sm:text-xl">No of Object: {count}</h1>
        <h1 className="text-lg sm:text-xl">Confidence Threshold: {value * 100}</h1>
        <ImageAnnotation image_url={image_url} />
      </div>
    </div>
  );
};

export default ResultImage;
