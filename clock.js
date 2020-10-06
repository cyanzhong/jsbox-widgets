const midnight = new Date();
midnight.setHours(0, 0, 0, 0);

const oneDayInMillis = 60 * 60 * 24 * 1000;
const expireDate = new Date(midnight.getTime() + oneDayInMillis);

$widget.setTimeline({
  policy: {
    afterDate: expireDate
  },
  render: ctx => {
    return {
      type: "text",
      props: {
        date: midnight,
        style: "timer",
        bold: true,
        font: {
          size: 120,
          monospaced: true
        },
        frame: {
          maxWidth: ctx.displaySize.width - 30
        },
        lineLimit: 1,
        minimumScaleFactor: 0.01
      }
    }
  }
});