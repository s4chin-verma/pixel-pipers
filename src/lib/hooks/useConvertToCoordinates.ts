import { useState, useEffect } from 'react';

interface Coordinate {
  x: number;
  y: number;
  width: number;
  height: number;
}

const useConvertToCoordinates = (rawData: string): Coordinate[] => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  useEffect(() => {
    const convertToCoordinates = (data: string): Coordinate[] => {
      const lines = data.trim().split('\n');
      const coords: Coordinate[] = [];
      for (const line of lines) {
        const values = line.trim().split(' ').slice(1).map(parseFloat);
        if (values.length === 4 && values.every(value => !isNaN(value))) {
          const [x, y, width, height] = values;
          coords.push({ x, y, width, height });
        } else {
          console.error(`Invalid data: ${line}`);
        }
      }
      return coords;
    };

    setCoordinates(convertToCoordinates(rawData));
  }, [rawData]);

  return coordinates;
};

export default useConvertToCoordinates;
