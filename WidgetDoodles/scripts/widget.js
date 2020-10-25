const util = require("./util");

exports.init = () => {
  const inputValue = $widget.inputValue || "";
  const uri = `data:image/jpeg;base64,${inputValue}`;
  $widget.setTimeline(ctx => {
    const cacheKey = util.sizeCacheKey(ctx.family);
    const cacheValue = ctx.displaySize;
    $cache.set(cacheKey, cacheValue);
    if (inputValue.length > 0) {
      return {
        type: "image",
        props: {
          uri: uri,
          resizable: true,
          scaledToFill: true,
        }
      }
    } else {
      return {
        type: "text",
        props: {
          text: $l10n("NO_INPUT_VALUE"),
          padding: 16
        }
      }
    }
  });
}