import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
interface Coordinates {
  x: number;
  y: number;
}
interface ImageAnnotationProps {
  image_url: string;
}

const ImageAnnotation: React.FC<ImageAnnotationProps> = ({ image_url }) => {
  const [open, setOpen] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [endCoordinates, setEndCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [showBox, setShowBox] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [clickedCoordinate, setClickedCoordinate] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleImageMouseDown = (
    e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    const imageElement = document.querySelector('.image-container img') as HTMLImageElement;
    if (imageElement) {
      const imageRect = imageElement.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const startX = clientX - imageRect.left;
      const startY = clientY - imageRect.top;
      setStartCoordinates({ x: startX, y: startY });
      setShowBox(true);

      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        let boundedX, boundedY;

        if ('touches' in e) {
          boundedX = e.touches[0].clientX - imageRect.left;
          boundedY = e.touches[0].clientY - imageRect.top;
        } else {
          boundedX = e.clientX - imageRect.left;
          boundedY = e.clientY - imageRect.top;
        }

        boundedX = Math.max(0, Math.min(boundedX, imageElement.width));
        boundedY = Math.max(0, Math.min(boundedY, imageElement.height));
        setEndCoordinates({
          x: boundedX,
          y: boundedY,
        });
      };

      const handleMouseUp = () => {
        setShowBox(true);
        setShowControls(true);

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
  };

  const handleTicButtonClick = () => {
    if (selectedOption) {
      setClickedCoordinate(
        `Selected Option: ${selectedOption}, Start: (${startCoordinates.x}, ${startCoordinates.y}), End: (${endCoordinates.x}, ${endCoordinates.y})`
      );
    } else {
      setClickedCoordinate(
        `Start: (${startCoordinates.x}, ${startCoordinates.y}), End: (${endCoordinates.x}, ${endCoordinates.y})`
      );
    }
    setShowBox(false);
  };

  const handleCrossButtonClick = () => {
    // When the cross button is clicked, hide the transparent box and reset selected option
    setShowBox(false);
    setShowControls(false);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option: string) => {
    // Function to handle option selection
    setSelectedOption(option);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-cyan-300 px-10 py-2 rounded-lg">
        Open modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="image-annotation-container">
          <h1>Image Annotation Tool</h1>
          <div className="image-container" style={{ position: 'relative' }}>
            <img
              src={image_url}
              alt="Annotated Image"
              onMouseDown={handleImageMouseDown}
              onTouchStart={handleImageMouseDown}
              draggable={false}
            />
            {showBox && (
              <div
                style={{
                  position: 'absolute',
                  top: Math.min(startCoordinates.y, endCoordinates.y),
                  left: Math.min(startCoordinates.x, endCoordinates.x),
                  width: Math.abs(endCoordinates.x - startCoordinates.x),
                  height: Math.abs(endCoordinates.y - startCoordinates.y),
                  border: '1px solid blue',
                  backgroundColor: 'rgba(0, 0, 255, 0.3)',
                  display: 'block',
                }}>
                {showControls && (
                  <>
                    <button
                      className="h-12 w-12 bg-red-100 absolute top-0 left-0"
                      onClick={handleTicButtonClick}>
                      ✓
                    </button>
                    <button
                      className="absolute top-0 right-0 bg-green-200 px-10 py-2"
                      onClick={handleCrossButtonClick}>
                      ✗
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div>
            <h2>Coordinates:</h2>
            <p>
              Start: ({startCoordinates.x}, {startCoordinates.y})
            </p>
            <p>
              End: ({endCoordinates.x}, {endCoordinates.y})
            </p>
            {clickedCoordinate && <p>{clickedCoordinate}</p>} {/* Display clicked coordinates */}
          </div>
          {showControls && (
            <div>
              <h2>Select Option:</h2>
              <button
                onClick={() => handleOptionSelect('Option 1')}
                className="bg-green-300 rounded-md px-10 py-3">
                Option 1
              </button>
              <button
                onClick={() => handleOptionSelect('Option 2')}
                className="bg-green-300 rounded-md px-10 py-3">
                Option 2
              </button>
              <button
                onClick={() => handleOptionSelect('Option 3')}
                className="bg-green-300 rounded-md px-10 py-3">
                Option 3
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageAnnotation;
