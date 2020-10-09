async function getMaxNum() {
  let result = await $http.get("https://xkcd.com/info.0.json");
  return result.data.num;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function requestFailed(resp) {
  return resp == null || resp.response == null || resp.response.statusCode != 200;
}

async function fetch() {
  const cache = $cache.get("image");
  const maxNum = await getMaxNum();
  const num = getRandomInt(1, maxNum);
  const json = await $http.get(`https://xkcd.com/${num}/info.0.json`);
  if (requestFailed(json)) {
    return cache;
  }

  const file = await $http.download(json.data.img);
  if (requestFailed(file)) {
    return cache;
  }

  const image = file.data.image;
  if (image) {
    $cache.set("image", image);
  }

  return image;
}

const image = await fetch();
$widget.setTimeline(ctx => {
  return {
    type: "image",
    props: {
      image: image,
      resizable: true,
      scaledToFit: true
    }
  }
});