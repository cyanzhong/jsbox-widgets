const midnight = new Date();
midnight.setHours(0, 0, 0, 0);
const expireDate = new Date(midnight.getTime() + 60 * 60 * 24 * 1000);

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
          size: 32,
          monospaced: true
        },
        frame: {
          maxWidth: 144 // Work around layout bug
        }
      }
    }
  }
});