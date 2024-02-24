function convertToMetalCoordinates(point, viewSize) {
  var inverseViewSize = {
    width: 1.0 / viewSize.width,
    height: 1.0 / viewSize.height,
  };
  var clipX = 2.0 * point.x * inverseViewSize.width - 1.0;
  var clipY = 2.0 * -point.y * inverseViewSize.height + 1.0;
  return [clipX, clipY];
}

var point = { x: 100, y: 50 }; // Example point
var viewSize = { width: 800, height: 600 }; // Example view size

var metalCoordinates = convertToMetalCoordinates(point, viewSize);
console.log('Metal coordinates:', metalCoordinates);
