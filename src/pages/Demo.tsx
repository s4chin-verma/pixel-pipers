import React, { useState, useRef, useEffect } from 'react';
import { Counter, Loader } from '@/components';
import { CloudinaryUploadWidget } from '@/container';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { Icon } from '@iconify/react';
// import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { useDemoApiMutation } from '@/app/api/demoApi';
import { showToast } from '@/lib/validators';
import { setResultImageUrl } from '@/app/slices/demoSlice';

const Demo: React.FC = () => {
  const [value, setValue] = useState<number>(0.6);
  const [publicId, setPublicId] = useState<string>('');
  const [cloudName] = useState<string>(import.meta.env.VITE_CLOUD_NAME);
  const [uploadPreset] = useState<string>(import.meta.env.VITE_UPLOAD_PRESET);
  const { baseImageUrl } = useAppSelector(state => state.demo);
  const infoDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [demoApi, { isLoading, data }] = useDemoApiMutation({ fixedCacheKey: 'myCacheKey' });
  const confidence_threshold = value.toString();

  const [uwConfig] = useState<any>({
    cloudName,
    uploadPreset,
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

  const sendRequest = async () => {
    try {
      if (baseImageUrl) {
        showToast('Request Sended to server', 'info');
        const response = await demoApi({ image_path: baseImageUrl, confidence_threshold }).unwrap();
        showToast('Object Counted Successful', 'success');
        dispatch(setResultImageUrl(response?.image_url));
      } else showToast('Please upload a image', 'warning');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading && infoDivRef.current) {
      infoDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [baseImageUrl]);

  const myImage = cld.image(publicId);
  console.log(myImage);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col justify-center items-center bg-white">
        <h1 className="mb-12 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">
          Upload Your Image
        </h1>
        <div className="w-full relative border border-gray-300 bg-gray-100 rounded-lg">
          <div className="md:flex">
            <div className="w-full h-full relative">
              <h1 className="text-center text-2xl py-2 font-bold">Test Image</h1>
              <div className="relative order-first md:order-last h-80 md:h-96 flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
                {baseImageUrl ? (
                  // <AdvancedImage
                  //   style={{ maxWidth: '100%' }}
                  //   className="h-80"
                  //   cldImg={myImage}
                  //   plugins={[responsive(), placeholder()]}
                  // />
                  <img src={baseImageUrl} alt="baseImage" className="rounded-lg" />
                ) : (
                  <div className="text-gray-400 opacity-75 flex flex-col justify-center items-center gap-4">
                    <Icon icon={'ph:image-square-thin'} className="h-16 w-16" />
                    <span>Upload the Image to Count the Objects</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full rounded-b-lg px-6 py-2 md:p-4 bg-gray-200 flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-16 ">
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
              sendRequest={sendRequest}
            />
            <Counter value={value} setValue={setValue} />
          </div>
        </div>
        {isLoading && <Loader />}
        {data?.image_url && (
          <div
            ref={infoDivRef}
            className="w-full h-full my-20 relative border border-gray-300 bg-gray-100 rounded-lg">
            <h1 className="text-center text-2xl py-2 font-bold">Result Image</h1>
            <div className="relative order-first md:order-last h-80 md:h-96 flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
              <img src={data.image_url} alt="image" className="rounded-lg" />
            </div>
            <div className="w-full rounded-b-lg p-2 md:p-4 bg-gray-200 flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-6 md:gap-24  ">
              <h1 className="text-xl">No of Object: {data?.count}</h1>
              <h1 className="text-xl">Confidence Threshold: {value * 100}</h1>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;
