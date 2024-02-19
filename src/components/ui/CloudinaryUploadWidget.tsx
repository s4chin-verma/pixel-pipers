import React, { createContext, useEffect, useState } from 'react';
import { useDemoApiMutation } from '@/app/api/demoApi';
import { setBaseImageUrl, setResultImageUrl } from '@/app/slices/demoSlice';
import { useAppDispatch } from '@/app/hooks';
import { showToast } from '@/lib/validators';

const CloudinaryScriptContext = createContext<{ loaded: boolean }>({
  loaded: false,
});

const CloudinaryUploadWidget: React.FC<{
  value: number;
  uwConfig: any;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ uwConfig, setPublicId, value }) => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [demoApi] = useDemoApiMutation({ fixedCacheKey: 'myCacheKey' });
  const [image_path, seImage_Path] = useState('');
  const confidence_threshold = value.toString();

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
  }, []);

  const sendRequest = async () => {
    try {
      if (image_path) {
        showToast('Request Sended to server', 'info');
        const response = await demoApi({ image_path, confidence_threshold }).unwrap();
        showToast('Object Counted Successful', 'success');
        dispatch(setResultImageUrl(response?.image_url));
      } else showToast('Please upload a image', 'warning');
    } catch (error) {
      console.log(error);
    }
  };

  const initializeCloudinaryWidget = async () => {
    try {
      if (loaded) {
        const myWidget = await (window as any).cloudinary.createUploadWidget(
          uwConfig,
          (error: any, result: any) => {
            if (!error && result && result.event === 'success') {
              dispatch(setBaseImageUrl(result.info.url));
              seImage_Path(result.info.url);
              setPublicId(result.info.public_id);
            }
          }
        );
        myWidget.open();
      }
    } catch (error) {
      console.error('Error initializing Cloudinary widget:', error);
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        className="inline-flex items-center shadow-md px-8 py-3 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
        onClick={initializeCloudinaryWidget}>
        Upload
      </button>
      <button
        className="inline-flex items-center shadow-md px-8 py-3 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
        onClick={sendRequest}>
        Send Request
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
