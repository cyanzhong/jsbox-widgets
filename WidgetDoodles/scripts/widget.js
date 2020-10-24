exports.init = () => {
  const inputValue = $widget.inputValue || "";
  const uri = `data:image/jpeg;base64,${inputValue}`;
  $widget.setTimeline(() => {
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