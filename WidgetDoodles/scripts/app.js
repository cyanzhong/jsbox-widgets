exports.init = () => {

  $ui.render({
    props: {
      title: "WidgetDoodles"
    },
    views: [
      {
        type: "list",
        props: {
          style: 2,
          data: [
            {
              rows: [
                $l10n("CREATE_SMALL_WIDGET"),
                $l10n("CREATE_MEDIUM_WIDGET"),
                $l10n("CREATE_LARGE_WIDGET")
              ]
            },
            {
              rows: [$l10n("HOW_TO_CONFIGURE")]
            }
          ]
        },
        layout: $layout.fill,
        events: {
          didSelect: (_, indexPath) => {
            if (indexPath.section === 1) {
              showHelp();
            } else {
              presentCanvas(indexPath.row);
            }
          }
        }
      }
    ]
  });
}

function presentCanvas(family) {
  const canvas = require("./canvas");
  canvas.present(family);
}

function showHelp() {
  const help = require("./help");
  help.show();
}