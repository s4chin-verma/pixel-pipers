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
  const [clickedCoordinate, setClickedCoordinate] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [nextId, setNextId] = useState<number>(1);
  const [h, setH] = useState<number>(0);
  const [w, setW] = useState<number>(0);

  const handleImageMouseDown = (
    e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    const imageElement = document.querySelector('.image-container img') as HTMLImageElement;
    if (imageElement) {
      const imageRect = imageElement.getBoundingClientRect();
      setH(imageRect.height);
      setW(imageRect.width);
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

  function get_yolo_annotation_info(
    start_x: number,
    start_y: number,
    end_x: number,
    end_y: number,
    image_width: number,
    image_height: number
  ) {
    // Calculate box dimensions
    const box_width = end_x - start_x;
    const box_height = end_y - start_y;

    // Calculate center coordinates (normalized)
    const center_x = (start_x + box_width / 2) / image_width;
    const center_y = (start_y + box_height / 2) / image_height;

    // Calculate width and height (normalized)
    const width = box_width / image_width;
    const height = box_height / image_height;

    return {
      center_x: center_x,
      center_y: center_y,
      width: width,
      height: height,
    };
  }

  const handleTicButtonClick = () => {
    const yolo = get_yolo_annotation_info(
      startCoordinates.x,
      startCoordinates.y,
      endCoordinates.x,
      endCoordinates.y,
      h,
      w
    );

    const newAnnotation: Annotation = {
      id: nextId,
      coordinates: startCoordinates,
      endCoordinates: endCoordinates,
      option: selectedOption,
    };
    
    setAnnotations([...annotations, newAnnotation]);
    setNextId(nextId + 1);
    setClickedCoordinate(
      `Coordinate: (${yolo.center_x}, ${yolo.center_y}), Dimension: (${yolo.height}, ${yolo.width})`
    );
    setShowBox(false);
    setShowControls(false);
  };

  const handleCrossButtonClick = () => {
    setClickedCoordinate(null);
    setShowBox(false);
    setShowControls(false);
    setSelectedOption(null);
  };

  const handleRemoveAnnotations = () => {
    setAnnotations([]);
    setShowBox(false);
    setShowControls(false);
    setClickedCoordinate(null);
  };
  const handleClick = () => {
    setOpen(false);
    setAnnotations([]);
  };

  const sendClick = () => {
    setOpen(false);
    setAnnotations([]);
  };

  return (
    <>
      <DemoBtn onClick={() => setOpen(true)} className="h-10 w-40 mt-1">
        Open Annotation
      </DemoBtn>
      <Modal open={open} onClose={handleClick} center>
        <div className="image-annotation-container">
          <h1 className="text-center font-bold text-xl text-gray-900">Image Annotation Tool</h1>
          <div id="image-container" className="image-container relative cursor-crosshair">
            <img
              src={image_url}
              alt="Annotated Image"
              onMouseDown={handleImageMouseDown}
              onTouchStart={handleImageMouseDown}
              draggable={false}
              width={500}
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
                  border: '2px solid red',
                  backgroundColor: 'rgba(0, 0, 255, 0.2)',
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
                  backgroundColor: 'rgba(0, 255, 0, 0.3)',
                  display: 'block',
                }}></div>
            )}
          </div>

          <div className='max-w-[400px]'>{clickedCoordinate && <p>{clickedCoordinate}</p>}</div>
          <div className="flex flex-col items-center justify-center">
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
            <div className="flex items-center justify-center gap-6">
              <DemoBtn className="h-11 w-36 mt-2" onClick={handleRemoveAnnotations}>
                Remove Annotations
              </DemoBtn>
              <DemoBtn className="h-11 w-36 mt-2 bg-green-600" onClick={sendClick}>
                Send
              </DemoBtn>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageAnnotation;
