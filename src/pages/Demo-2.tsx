import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';

const Demo: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const sendImageToServer = async () => {
    if (previewImage) {
      const formData = new FormData();
      const blob = await fetch(previewImage).then(res => res.blob());
      formData.append('uploadImage', blob);

      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/frontend`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${import.meta.env.VITE_ML_TOKEN}`,
          },
        });
        console.log(response);
        // Handle response data here
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center min-h-screen bg-white">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-600 sm:text-5xl">
        Upload Your Image
      </h1>
      <div className="w-full md:w-1/2 h-full relative border border-gray-300 bg-gray-100 rounded-lg">
        <div
          className="relative order-first md:order-last h-96 md:h-96 flex justify-center items-center border border-dashed border-gray-400 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
          onDrop={handleDrop}
          onDragOver={handleDragOver}>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview image"
              className="h-[23rem] rounded-lg overflow-hidden"
            />
          ) : (
            <div className="text-gray-400 opacity-75 flex flex-col justify-center items-center gap-4">
              <Icon icon={'ph:image-square-thin'} className="h-16 w-16" />
              <span className="flex items-center gap-4">
                <Icon icon={'cil:cloud-upload'} className="h-8 w-8" />
                <h3>Drop Your image here</h3>
              </span>
            </div>
          )}
        </div>
        <div className="w-full rounded-l-lg p-2 md:p-4 bg-gray-200 flex flex-row-reverse md:flex-row justify-center items-center gap-6 md:gap-24 border-0 border-r border-gray-300 ">
          <label
            htmlFor="restaurantImage"
            className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
            Select image
            <input
              id="restaurantImage"
              className="text-sm cursor-pointer w-36 hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <button
            onClick={() => {
              setPreviewImage(null);
            }}
            className="inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
            Remove image
          </button>
          <button
            onClick={sendImageToServer}
            className="inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
            Send image to server
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
