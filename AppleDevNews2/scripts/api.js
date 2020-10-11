const parser = require("./vendor/rss-parser");
const endpoint = "https://developer.apple.com/news/rss/news.rss";
const cachePath = "assets/cache.json";

function requestFailed(resp) {
  return resp == null || resp.response == null || resp.response.statusCode != 200;
}

function readCache() {
  const data = $file.read(cachePath);
  if (data) {
    return JSON.parse(data.string);
  } else {
    return [];
  }
}

async function fetch() {
  const resp = await $http.get(endpoint);
  if (requestFailed(resp)) {
    return readCache();
  }

  const rss = await parser.parse(resp.data);
  const items = rss.items || [];

  if (rss.items) {
    $file.write({
      path: cachePath,
      data: $data({
        "string": JSON.stringify(rss.items)
      })
    });
  }

  return items;
}

exports.fetch = fetch;