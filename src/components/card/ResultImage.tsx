import { CoordinateImage, ImageAnnotation } from '@/components';

interface Props {
  infoDivRef: React.RefObject<HTMLDivElement>;
  image: string;
  count: string | null;
  value: number;
  classname: string;
}

const ResultImage: React.FC<Props> = ({
  infoDivRef,
  image,
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
      <div className="relative order-first md:order-last h-80 sm:h-[410px] flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover p-2">
        <CoordinateImage previewImage={image} />
      </div>
      <div className="w-full rounded-b-lg p-2 md:p-4 bg-gray-200 flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-1 md:gap-24">
        <h1 className="text-lg sm:text-xl">No of Object: {count}</h1>
        <h1 className="text-lg sm:text-xl">Confidence Threshold: {value}</h1>
        <ImageAnnotation image_url={image} />
      </div>
    </div>
  );
};

export default ResultImage;
