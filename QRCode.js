const inputValue = $widget.inputValue;

$widget.setTimeline(ctx => {
  if (inputValue) {
    return {
      type: "image",
      props: {
        image: $qrcode.encode(inputValue),
        resizable: true,
        scaledToFit: true,
        padding: 12
      }
    }
  } else {
    return {
      type: "text",
      props: {
        text: "Please configure the widget input value.",
        padding: 15
      }
    }
  }
});