const useImageCompressor = () => {
  const compressImage = (file: File, setPreviewImage: (value: string | null) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const maxWidth = 800; // Adjust as needed
          const maxHeight = 600; // Adjust as needed
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(image, 0, 0, width, height);

          canvas.toBlob(
            blob => {
              if (blob) {
                const compressedFile = new File([blob], 'compressed_image.jpg');
                const compressedImageUrl = URL.createObjectURL(compressedFile);
                setPreviewImage(compressedImageUrl);
              }
            },
            'image/jpeg',
            0.7
          );
        }
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return compressImage;
};

export default useImageCompressor;
