const axios = require("axios");
const query = require("./db");
const fs = require("fs");

// let url = "https://lol.qq.com/biz/hero/champion.js";
// axios
//   .get(url)
//   .then(function(res) {
//     let data = res.data;

//     let hero = eval(data).data;

//     console.log(hero);

//     for (var i in hero) {
//       console.log(i);
//     }
//   })
//   .catch(function(err) {
//     console.log("Error");
//     console.log(err);
//   });

/*
(async () => {
  let url = "https://lol.qq.com/biz/hero/champion.js";
  let response = await axios.get(url);
  let hero = eval(response.data).data;
  let info = JSON.stringify(hero);
  let res = await query("insert into t_test(name,content) values (?,?)", [
    "heros",
    info
  ]);
  console.log(res);
})();
*/

/*
(async () => {
  let res = await query("select content from t_test where name = ?", ["heros"]);
  console.log();
  let heros = res[0].content;
  heros = JSON.parse(heros);

  console.log(heros);

  let sql = "insert into t_hero(name,chinese_name,icon,type,nick,num) values ";
  let values = [];
  let index = 0;
  for (let i in heros) {
    if (index == 0) {
      sql += "(?,?,?,?,?,?)";
    } else {
      sql += ",(?,?,?,?,?,?)";
    }

    let hero = heros[i];
    values.push(hero.id);
    values.push(hero.name);
    values.push(hero.image.full);
    values.push(hero.tags.join(","));
    values.push(hero.title);
    values.push(hero.key);
    //   await getPic("icons", hero.image.full,"http://ossweb-img.qq.com/images/lol/img/champion/" +  hero.image.full);

    let name = hero.key + "001" + ".jpg";
    await getPic(
      "themes",
      name,
      "http://ossweb-img.qq.com/images/lol/web201310/skin/big" + name
    );

    index++;
  }

  //   let log = await query("delete from t_hero");
  //   console.log(log);
  //   console.log("Hi");
  // let log = await query(sql, values);
  //console.log(log);
*})();
*/

//爬取图片
async function getPic(folder, name, url) {
  let prefix = "./";
  let path = prefix + folder + "/" + name;

  if (fs.existsSync(path)) {
    return false;
  }

  if (!fs.existsSync(prefix + folder)) {
    fs.mkdirSync(prefix + folder);
  }

  console.log(url);
  console.log(path);

  let res = await axios.get(url, {
    responseType: "arraybuffer"
  });
  fs.writeFile(path, res.data, function(err) {
    if (err) {
      return false;
    }
    return true;
  });
}

//爬取详情页
async function getHeroInfo(name) {
  let prefix = "";
  let url = prefix + "/" + name;
}

(async () => {
  let res = await axios.get("https://lol.qq.com/biz/hero/Aatrox.js");
  let info = eval(res.data).data;

  let name = info.id;

  await query("insert into t_hero_info(name,skill) values (?,?)", [
    name,
    JSON.stringify(info)
  ]);
})();
