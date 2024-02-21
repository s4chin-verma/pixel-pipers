import React, { createContext, useEffect, useState } from 'react';
import { setBaseImageUrl } from '@/app/slices/demoSlice';
import { useAppDispatch } from '@/app/hooks';
import { DemoBtn } from '@/components';

const CloudinaryScriptContext = createContext<{ loaded: boolean }>({
  loaded: false,
});

const CloudinaryUploadWidget: React.FC<{
  sendRequest: () => void;
  uwConfig: any;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ uwConfig, setPublicId, sendRequest }) => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);

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

  const initializeCloudinaryWidget = async () => {
    try {
      if (loaded) {
        const myWidget = await (window as any).cloudinary.createUploadWidget(
          uwConfig,
          (error: any, result: any) => {
            if (!error && result && result.event === 'success') {
              dispatch(setBaseImageUrl(result.info.url));
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
      <div className="flex gap-9">
        <DemoBtn children="upload" onClick={initializeCloudinaryWidget} />
        <DemoBtn children="Send" onClick={sendRequest} />
      </div>
    </CloudinaryScriptContext.Provider>
  );
};

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };