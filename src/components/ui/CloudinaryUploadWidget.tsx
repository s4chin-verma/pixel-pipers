import React, { createContext, useEffect, useState } from 'react';
// import { useDemoApiMutation } from '@/app/api/demoApi';
import { setBaseImageUrl } from '@/app/slices/demoSlice';
import {  useAppDispatch } from '@/app/hooks';

const CloudinaryScriptContext = createContext<{ loaded: boolean }>({
  loaded: false,
});

const CloudinaryUploadWidget: React.FC<{
  uwConfig: any;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ uwConfig, setPublicId }) => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);
  // const [demoApi, { error }] = useDemoApiMutation();

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById('uw');
      if (!uwScript) {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info.url);
            dispatch(setBaseImageUrl(result.info.url));
            setPublicId(result.info.public_id);
          }
        }
      );

      document.getElementById('upload_widget')?.addEventListener(
        'click',
        () => {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="inline-flex items-center shadow-md px-8 py-3 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
        onClick={initializeCloudinaryWidget}>
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
