$app.strings = {
  "en": {
    "title": "Is It Friday?",
    "msg0": "Nope. 😱",
    "msg1": "Nope. 🥱",
    "msg2": "Nope. 🧐",
    "msg3": "Nope. 😑",
    "msg4": "Soon. 🤩",
    "msg5": "Yep! 🍻",
    "msg6": "Better! 🎉",
  },
  "zh-Hans": {
    "title": "今天是周五吗？",
    "msg0": "不是 😱",
    "msg1": "不是 🥱",
    "msg2": "不是 🧐",
    "msg3": "不是 😑",
    "msg4": "快了 🤩",
    "msg5": "是的 🍻",
    "msg6": "更好 🎉",
  }
};

const title = $l10n("title");
const message = $l10n(`msg${(new Date()).getDay()}`);

$widget.setTimeline(ctx => {
  const family = ctx.family;

  if (family === $widgetFamily.accessoryCircular) {
    return {
      type: "text",
      props: {
        text: message.slice(-2),
        font: $font("bold", 32)
      }
    }
  }

  if (family === $widgetFamily.accessoryInline) {
    return {
      type: "text",
      props: {
        text: message
      }
    }
  }

  return {
    type: "vstack",
    props: {
      alignment: $widget.horizontalAlignment.leading,
      spacing: 8,
      frame: {
        maxWidth: Infinity,
        maxHeight: Infinity,
        alignment: $widget.alignment.leading
      }
    },
    views: [
      {
        type: "text",
        props: {
          text: title,
          color: $color("black")
        }
      },
      {
        type: "text",
        props: {
          text: message,
          font: $font("bold", 20)
        }
      }
    ]
  }
});