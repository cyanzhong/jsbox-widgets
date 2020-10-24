exports.show = () => {
  $ui.push({
    views: [
      {
        type: "markdown",
        props: {
          content: $file.read($l10n("README_FILE")).string
        },
        layout: $layout.fill
      }
    ]
  });
}