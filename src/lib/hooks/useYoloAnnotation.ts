// import { useState } from 'react';

// function useYoloAnnotation(startX, startY, endX, endY, imageWidth, imageHeight) {
//   const [annotation, setAnnotation] = useState(null);

//   const calculateAnnotation = () => {
//     const boxWidth = endX - startX;
//     const boxHeight = endY - startY;

//     const centerX = (startX + boxWidth / 2) / imageWidth;
//     const centerY = (startY + boxHeight / 2) / imageHeight;

//     const width = boxWidth / imageWidth;
//     const height = boxHeight / imageHeight;

//     const newAnnotation = {
//       center_x: centerX,
//       center_y: centerY,
//       width: width,
//       height: height,
//     };

//     setAnnotation(newAnnotation);
//   };

//   // Calculate annotation whenever inputs change
//   useEffect(() => {
//     calculateAnnotation();
//   }, [startX, startY, endX, endY, imageWidth, imageHeight]);

//   return annotation;
// }

// export default useYoloAnnotation;
