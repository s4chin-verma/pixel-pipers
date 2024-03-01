function browserToYolo(x, y, imageWidth, imageHeight) {
  // Normalize coordinates relative to image dimensions
  const normalizedX = x / imageWidth;
  const normalizedY = y / imageHeight;

  // Assuming you want the width and height as well:
  const normalizedW = imageWidth / imageWidth; // always 1
  const normalizedH = imageHeight / imageHeight; // always 1

  return { x: normalizedX, y: normalizedY, w: normalizedW, h: normalizedH };
}
const browserCoords = { x: 250, y: 100 }; // Example coordinates
const imageWidth = 640;
const imageHeight = 480;

const yoloCoords = browserToYolo(browserCoords.x, browserCoords.y, imageWidth, imageHeight);

console.log(yoloCoords);
// Output: { x: 0.390625, y: 0.20833333333333334, w: 1, h: 1 }
