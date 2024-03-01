import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Image as KonvaImage } from 'react-konva';
import useConvertToCoordinates from '@/lib/hooks/useConvertToCoordinates';
import { useAppSelector } from '@/app/hooks';

const CoordinateImage: React.FC<{ previewImage: string }> = ({ previewImage }) => {
  const { coordinates } = useAppSelector(state => state.result) || { coordinates: [] };
  const rawData = coordinates?.join('\n');
  const pipeCoordinates = useConvertToCoordinates(rawData || '');
  const [imageObj, setImageObj] = useState<HTMLImageElement | undefined>(undefined);

  useEffect(() => {
    const img = new window.Image();
    img.src = previewImage || '';
    img.onload = () => setImageObj(img);
  }, [previewImage]);

  return (
    <div>
      <Stage width={400} height={400}>
        <Layer>
          {imageObj && <KonvaImage image={imageObj} width={400} height={400} cornerRadius={10} />}
          {pipeCoordinates.map((coord, index) => (
            <Circle key={index} x={coord.x * 400} y={coord.y * 400} radius={4} fill="green" />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CoordinateImage;
