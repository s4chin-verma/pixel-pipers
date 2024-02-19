import React, { useState } from 'react';
import { CloudinaryUploadWidget, Counter } from '@/components';
import { Cloudinary } from '@cloudinary/url-gen';
import { Icon } from '@iconify/react';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { useAppSelector } from '@/app/hooks';

const Demo: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [publicId, setPublicId] = useState<string>('');
  const [cloudName] = useState<string>(import.meta.env.VITE_CLOUD_NAME);
  const [uploadPreset] = useState<string>(import.meta.env.VITE_UPLOAD_PRESET);
  const { baseImageUrl } = useAppSelector(state => state.demo);

  const [uwConfig] = useState<any>({
    cloudName,
    uploadPreset,
    // cropping: true,
    showAdvancedOptions: false,
    multiple: false,
    folder: 'ml-models',
    theme: 'white',
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);
  console.log(myImage);

  return (
    <section className="w-full py-24 md:py-32 px-8  md:px-36">
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <h1 className="mb-12 text-3xl font-bold tracking-tight text-gray-600 sm:text-5xl">
          Upload Your Image
        </h1>
        <div className="w-full md:w-3/4  h-full relative border border-gray-300 bg-gray-100 rounded-lg">
          <div className="md:flex">
            <div className="w-full h-full relative">
              <h1 className="text-center text-2xl py-2 font-bold">Test Image</h1>
              <div className="relative order-first md:order-last h-80 md:h-96 flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
                {baseImageUrl ? (
                  <AdvancedImage
                    style={{ maxWidth: '100%' }}
                    className="h-96"
                    cldImg={myImage}
                    plugins={[responsive(), placeholder()]}
                  />
                ) : (
                  <div className="text-gray-400 opacity-75 flex flex-col justify-center items-center gap-4">
                    <Icon icon={'ph:image-square-thin'} className="h-16 w-16" />
                    <span>Upload the Image to Count the Objects</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-lg p-2 md:p-4 bg-gray-200 flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-6 md:gap-24 ">
            <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
            <Counter value={value} setValue={setValue} />
          </div>
        </div>
        <div className="w-full md:w-3/4 h-full my-20 relative border border-gray-300 bg-gray-100 rounded-lg">
          <h1 className="text-center text-2xl py-2 font-bold">Result Image</h1>
          <div className="relative order-first md:order-last h-80 md:h-96 flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
            <div className="text-gray-400 opacity-75 flex flex-col justify-center items-center gap-4">
              <Icon icon={'ph:image-square-thin'} className="h-16 w-16" />
              <span>The Result will Appear here</span>
            </div>
          </div>
          <AdvancedImage
            style={{ maxWidth: '100%' }}
            cldImg={myImage}
            plugins={[responsive(), placeholder()]}
          />
          <div className="w-full rounded-b-lg p-2 md:p-4 bg-gray-200 flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-6 md:gap-24  ">
            <h1>No of Object: {'210'}</h1>
            <h1>Accuracy: {'90%'}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
