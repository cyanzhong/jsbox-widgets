if ($app.env === $env.widget) {
  const widget = require("./scripts/widget");
  widget.init();
} else {
  const app = require("./scripts/app");
  app.init();
}