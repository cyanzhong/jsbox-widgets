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

function sizeCacheKey(family) {
  const width = $device.info.screen.width;
  const height = $device.info.screen.height;
  return `size(${family},${width},${height})`;
}

exports.sizeForFamily = family => {
  const cacheKey = sizeCacheKey(family);
  const cacheValue = $cache.get(cacheKey);
  if (cacheValue) {
    return cacheValue;
  } else {
    return {
      width: widths[family],
      height: heights[family],
    };
  }
}

exports.sizeCacheKey = sizeCacheKey;