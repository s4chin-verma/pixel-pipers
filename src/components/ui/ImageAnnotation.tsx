import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DemoBtn } from '@/components';

interface Coordinates {
  x: number;
  y: number;
}

interface Annotation {
  id: number;
  coordinates: Coordinates;
  endCoordinates: Coordinates;
  option: string | null;
}

interface ImageAnnotationProps {
  image_url: string;
}

const ImageAnnotation: React.FC<ImageAnnotationProps> = ({ image_url }) => {
  const [open, setOpen] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [endCoordinates, setEndCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [showBox, setShowBox] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  // const [showOptions, setShowOptions] = useState<boolean>(false);
  const [clickedCoordinate, setClickedCoordinate] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [nextId, setNextId] = useState<number>(1);

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
        // setShowOptions(true);

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
    // if (selectedOption) {
    const newAnnotation: Annotation = {
      id: nextId,
      coordinates: startCoordinates,
      endCoordinates: endCoordinates,
      option: selectedOption,
    };
    setAnnotations([...annotations, newAnnotation]);
    setNextId(nextId + 1);
    // setClickedCoordinate(
    //   `Selected Option: ${selectedOption}, Start: (${startCoordinates.x}, ${startCoordinates.y}), End: (${endCoordinates.x}, ${endCoordinates.y})`
    // );
    // } else {
    setClickedCoordinate(
      `  Start: (${startCoordinates.x}, ${startCoordinates.y}), End: (${endCoordinates.x}, ${endCoordinates.y})`
    );
    // }
    setShowBox(false);
    setShowControls(false);
  };

  const handleCrossButtonClick = () => {
    setClickedCoordinate(null);
    setShowBox(false);
    setShowControls(false);
    setSelectedOption(null);
  };

  // const handleOptionSelect = (option: string) => {
  //   setShowControls(true);
  //   setSelectedOption(option);
  // };

  const handleRemoveAnnotations = () => {
    setAnnotations([]);
    setShowBox(false);
    setShowControls(false);
    // setShowOptions(false);
    setClickedCoordinate(null);
  };
  return (
    <>
      <DemoBtn onClick={() => setOpen(true)} className="h-10 w-40 mt-1">
        Open Annotation
      </DemoBtn>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="image-annotation-container">
          <h1 className="text-center font-bold text-xl text-gray-900">Image Annotation Tool</h1>
          <div id="image-container" className="image-container relative">
            <img
              src={image_url}
              alt="Annotated Image"
              onMouseDown={handleImageMouseDown}
              onTouchStart={handleImageMouseDown}
              draggable={false}
            />
            {annotations.map(annotation => (
              <div
                key={annotation.id}
                style={{
                  position: 'absolute',
                  top: annotation.coordinates.y,
                  left: annotation.coordinates.x,
                  bottom: annotation.endCoordinates.x,
                  right: annotation.endCoordinates.y,
                  width: Math.abs(annotation.endCoordinates.x - annotation.coordinates.x),
                  height: Math.abs(annotation.endCoordinates.y - annotation.coordinates.y),
                  border: '1px solid red',
                  backgroundColor: 'rgba(0, 0, 255, 0.3)',
                }}></div>
            ))}
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
                }}></div>
            )}
          </div>

          <div>
            {/* <h2>Coordinates:</h2>
            <p>
              Start: ({startCoordinates.x}, {startCoordinates.y})
            </p>
            <p>
              End: ({endCoordinates.x}, {endCoordinates.y})
            </p> */}
            {clickedCoordinate && <p>{clickedCoordinate}</p>}
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* {showOptions && (
              <>
                <h2 className="text-gray-900 text-lg mb-2 font-semibold">Select Option:</h2>
                <div className="flex justify-between w-full my-3">
                  <DemoBtn
                    children="pipe-1"
                    onClick={() => handleOptionSelect('1')}
                    className="w-20 h-8"
                  />
                  <DemoBtn
                    children="pipe-2"
                    onClick={() => handleOptionSelect('2')}
                    className="w-20 h-8"
                  />
                  <DemoBtn
                    children="pipe-3"
                    onClick={() => handleOptionSelect('3')}
                    className="w-20 h-8"
                  />
                </div>
              </>
            )} */}
            {showControls && (
              <div className="w-full flex justify-between my-4">
                <DemoBtn className="h-9 w-32 gap-2" onClick={handleTicButtonClick}>
                  <span>Annotate</span>
                  <Icon icon={'mingcute:check-fill'} className="h-4 w-4" />
                </DemoBtn>
                <DemoBtn className="h-9 w-32 gap-1" onClick={handleCrossButtonClick}>
                  <span>Cancel</span>
                  <Icon icon={'charm:cross'} className="h-5 w-5" />
                </DemoBtn>
              </div>
            )}
            <DemoBtn className="h-11 w-36 mt-2" onClick={handleRemoveAnnotations}>
              Remove Annotations
            </DemoBtn>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageAnnotation;
