function get_yolo_annotation_info(start_x, start_y, end_x, end_y, image_width, image_height) {
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
const image_width = 500;
const image_height = 500;
const start_x = 10;
const start_y = 8;
const end_x = 495;
const end_y = 494;

const yolo_info = get_yolo_annotation_info(
  start_x,
  start_y,
  end_x,
  end_y,
  image_width,
  image_height
);

console.log('YOLO Center coordinates:', yolo_info.center_x, yolo_info.center_y);
console.log('YOLO Width:', yolo_info.width);
console.log('YOLO Height:', yolo_info.height);
