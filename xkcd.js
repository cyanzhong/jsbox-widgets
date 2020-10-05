async function getMaxNum() {
  let result = await $http.get("https://xkcd.com/info.0.json");
  return result.data.num;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const maxNum = await getMaxNum();
const num = getRandomInt(1, maxNum);
const {data} = await $http.get(`https://xkcd.com/${num}/info.0.json`);

$widget.setTimeline(ctx => {
  return {
    type: "image",
    props: {
      uri: data.img,
      resizable: true,
      scaledToFit: true
    }
  }
});