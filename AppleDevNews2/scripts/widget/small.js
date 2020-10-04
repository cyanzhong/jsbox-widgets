const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

module.exports = items => {
  const news = items[0];
  return {
    type: "vstack",
    props: {
      alignment: "leading",
      frame: {
        maxWidth: Infinity,
        maxHeight: Infinity,
        alignment: "topLeading"
      },
      padding: 15,
      widgetURL: news.link
    },
    views: [
      {
        type: "hstack",
        views: [
          {
            type: "color",
            props: {
              color: colors.systemBlue,
              frame: {
                width: 6,
                height: 64
              },
              cornerRadius: 3
            }
          },
          {
            type: "text",
            props: {
              text: news.title,
              font: fonts.primary,
              bold: true,
              frame: { height: 72 }
            }
          }
        ]
      },
      { type: "spacer" },
      {
        type: "text",
        props: {
          text: news.pubDate,
          font: fonts.secondary,
          color: colors.secondary
        }
      }
    ]
  }
}