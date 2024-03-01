interface RawCoordinate {
    x_min: number;
    y_min: number;
    x_max: number;
    y_max: number;
  }
  
  interface PipeCoordinate {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  function convertRawToXYWidthHeight(rawCoordinates: RawCoordinate[]): PipeCoordinate[] {
    return rawCoordinates.map(raw => ({
      x: raw.x_min,
      y: raw.y_min,
      width: raw.x_max - raw.x_min,
      height: raw.y_max - raw.y_min
    }));
  }
  
  // Example usage
  const rawCoordinates: RawCoordinate[] = [
    { x_min: 100, y_min: 200, x_max: 150, y_max: 250 },
    { x_min: 300, y_min: 150, x_max: 370, y_max: 190 },
    { x_min: 500, y_min: 300, x_max: 560, y_max: 350 }
  ];
  
  const convertedCoordinates = convertRawToXYWidthHeight(rawCoordinates);
  console.log(convertedCoordinates);
  