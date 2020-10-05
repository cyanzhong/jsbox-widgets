const colors = require("../constants/colors");
const fonts = require("../constants/fonts");

module.exports = (items, lines) => {
  return {
    type: "vstack",
    props: {
      alignment: "leading",
      spacing: 0,
      padding: $insets(5, 15, 5, 15)
    },
    views: (() => {
      const result = [];
      for (let idx=0; idx<lines; ++idx) {
        result.push(listItem(items[idx], idx === 0 ? 1 : 0.6));
      }
      return result;
    })()
  }
}

function listItem(news, lineOpacity) {
  return {
    type: "hstack",
    props: {
      spacing: 8,
      alignment: "center"
    },
    views: [
      {
        type: "color",
        props: {
          color: colors.systemBlue,
          frame: {
            width: 6,
            height: 44
          },
          cornerRadius: 3,
          opacity: lineOpacity
        }
      },
      {
        type: "vstack",
        props: {
          alignment: "leading",
          frame: {
            maxWidth: Infinity,
            maxHeight: Infinity,
            alignment: "leading"
          },
          link: news ? news.link : ""
        },
        views: [
          {
            type: "text",
            props: {
              text: news ? news.title : " ",
              lineLimit: 1,
              font: fonts.primary,
              bold: true
            }
          },
          {
            type: "vstack",
            props: {
              frame: { height: 4 }
            }
          },
          {
            type: "text",
            props: {
              text: news ? news.pubDate : " ",
              font: fonts.secondary,
              color: colors.secondary
            }
          }
        ]
      }
    ]
  }
}