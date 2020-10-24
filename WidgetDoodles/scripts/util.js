const smallPadding = 22;
const largePadding = 27;
const isPad = $device.isIpad;
const maxWidth = Math.min($device.info.screen.width, $device.info.screen.height);

const smallLength = (() => {
  if (isPad) {
    return 155;
  } else {
    return (maxWidth - 2 * largePadding - smallPadding) * 0.5;
  }
})();

const largeLength = (() => {
  if (isPad) {
    return 330;
  } else {
    return maxWidth - 2 * largePadding;
  }
})();

const widths = [smallLength, largeLength, largeLength];
const heights = [smallLength, smallLength, largeLength];

exports.sizeForFamily = family => {
  return {
    width: widths[family],
    height: heights[family],
  };
}