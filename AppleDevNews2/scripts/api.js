const parser = require("./vendor/rss-parser");
const endpoint = "https://developer.apple.com/news/rss/news.rss";
const cachePath = "assets/cache.json";

function cache() {
  const data = $file.read(cachePath);
  if (data) {
    const string = data.string;
    const rss = JSON.parse(string);
    return rss;
  } else {
    return null;
  }
}

async function fetch() {
  const {data} = await $http.get(endpoint);
  const rss = await parser.parse(data);
  const items = rss.items || [];

  if (rss.items) {
    $file.write({
      data: $data({"string": JSON.stringify(rss.items)}),
      path: cachePath
    });
  }

  return items;
}

exports.cache = cache;
exports.fetch = fetch;