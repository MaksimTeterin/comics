import axios from "axios";
import * as cheerio from "cheerio";
import fs from "node:fs";
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
if (!fs.existsSync("cache")) {
  fs.mkdirSync("cache");
}

for (let i = 4654; i > 4644; i--) {
  let res = await axios.get(
    "https://www.questionablecontent.net/view.php?comic=" + i
  );
  const $ = cheerio.load(res.data);
  let cachePath = `cache/${i}.html`;
  let data;
  if (!fs.existsSync(cachePath)) {
    await sleep(2000);
    let res = await axios.get(
      "https://www.questionablecontent.net/view.php?comic=" + i
    );
    //CACHE
    fs.writeFileSync(cachePath, res.data);
    data = res.data;
    console.log("LIVE REQUEST!");
  } else {
    data = fs.readFileSync(cachePath);
  }

  //comics source output
  let imgSrc = $("div[id='container']>div>div>a>img").attr("src");
  //*[@id="imgCurrent"]
  //*[@id="divImage"]
  await sleep(1000);
  console.log("https://www.questionablecontent.net" + imgSrc.replace(".", ""));
}
