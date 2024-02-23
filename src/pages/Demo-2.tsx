import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Counter, Loader, DemoBtn } from '@/components';
import { sendImageToServer } from '@/app/actions/fileAction';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { showToast } from '@/lib/validators';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';
import { ResultImage } from '@/components';

const Demo: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [value, setValue] = useState<number>(0.6);
  const confidence_threshold = value.toString();
  const { loading, image_url, count } = useAppSelector(state => state.file);
  const infoDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!loading && infoDivRef.current) {
      infoDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [image_url]);

  const handleSendImageToServer = () => {
    if (previewImage) dispatch(sendImageToServer({ previewImage, confidence_threshold }));
    else showToast('Select a Image', 'warning');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      previewImageFromFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();
          if (file) {
            previewImageFromFile(file);
          }
          break;
        }
      }
    }
  };

  const previewImageFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  };

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col justify-center items-center">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-600 sm:text-5xl">
          Upload Your Image
        </h1>
        <div className="w-full sm:w-3/4 relative border border-gray-300 bg-gray-100 rounded-lg">
          <h1 className="text-center text-2xl py-2 font-bold">Test Image</h1>
          <div
            className="relative order-first md:order-last h-80 sm:h-96 flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover p-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview image"
                className="rounded-lg overflow-hidden h-full"
              />
            ) : (
              <div className="text-gray-400 opacity-75 flex flex-col justify-center items-center gap-4">
                <Icon icon={'ph:image-square-thin'} className="h-16 w-16" />
                <span className="flex items-center gap-4">
                  <Icon icon={'cil:cloud-upload'} className="h-8 w-8" />
                  {windowWidth > 768 ? <h3>Drop Your image here</h3> : <h3>Upload Image</h3>}
                </span>
              </div>
            )}
          </div>
          <div className="w-full rounded-b-lg px-6 py-2 md:p-4 bg-gray-200 flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-16  ">
            <div className="flex gap-9">
              <label
                htmlFor="restaurantImage"
                className="inline-flex items-center justify-center shadow-md w-32 h-10  bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ">
                Upload
                <input
                  id="restaurantImage"
                  className="text-sm cursor-pointer w-36 hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <DemoBtn onClick={handleSendImageToServer} children="Send" className="w-32 h-10" />
            </div>
            <Counter value={value} setValue={setValue} />
          </div>
        </div>
        {loading && <Loader />}
        {image_url && (
          <ResultImage
            image_url={image_url}
            infoDivRef={infoDivRef}
            count={count}
            classname="sm:w-3/4"
            value={value}
          />
        )}
      </div>
    </section>
  );
};

export default Demo;
