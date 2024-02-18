import { useEffect } from 'react';
import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'info' | 'success' | 'warning' | 'error';

const useToast = () => {
  useEffect(() => {
    // Ensure that react-toastify is configured once
    (toast as any).configure();
  }, []);

  const showToast = (message: string, type: ToastType = 'info', options?: ToastOptions) => {
    switch (type) {
      case 'info':
        toast.info(message, options);
        break;
      case 'success':
        toast.success(message, options);
        break;
      case 'warning':
        toast.warning(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      default:
        toast.info(message, options);
    }
  };

  return showToast;
};

export default useToast;
