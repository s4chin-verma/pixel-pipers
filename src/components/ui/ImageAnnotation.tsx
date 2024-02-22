import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

interface Coordinates {
  x: number;
  y: number;
}
type props = {
  img: string;
};

const ImageAnnotation: React.FC<props> = ({ img }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [startCoordinates, setStartCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [endCoordinates, setEndCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [showBox, setShowBox] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [clickedCoordinate, setClickedCoordinate] = useState<string | null>(null); // State to store clicked coordinate
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State to store selected option

  const handleImageMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    // Capture the starting coordinates relative to the image
    const imageRect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - imageRect.left;
    const startY = e.clientY - imageRect.top;
    setStartCoordinates({ x: startX, y: startY });
    setShowBox(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Update the end coordinates relative to the image as the mouse moves
      setEndCoordinates({
        x: e.clientX - imageRect.left,
        y: e.clientY - imageRect.top,
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Capture the ending coordinates relative to the image
      setEndCoordinates({
        x: e.clientX - imageRect.left,
        y: e.clientY - imageRect.top,
      });
      setShowBox(true); // Show the box permanently after release
      setShowControls(true);

      // Remove event listeners when mouse is released
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    // Add event listeners for mouse move and mouse up events
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTicButtonClick = () => {
    // When the tic button is clicked, print the start and end coordinates along with the selected option
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
      <button onClick={onOpenModal} className='bg-cyan-300 px-10 py-2 rounded-lg'>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="image-annotation-container">
          <h1>Image Annotation Tool</h1>
          <div className="image-container" style={{ position: 'relative' }}>
            <img
              src={img}
              alt="Annotated Image"
              onMouseDown={handleImageMouseDown}
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
                      onClick={handleTicButtonClick} // Attach handleTicButtonClick function
                    >
                      ✓
                    </button>
                    <button
                      className="absolute top-0 right-0 bg-green-200 px-10 py-2"
                      onClick={handleCrossButtonClick} // Attach handleCrossButtonClick function
                    >
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
