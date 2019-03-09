function renderUniqueKey(len = 8) {
  let baseWordArr = "qwertyuiopasdfghjklzxcvbnm".split("").sort();
  let res = [];
  for (let i = 0; i < len; i++) {
    let wordOrNum = Math.random() * 10 > 4 ? "word" : "num";
    let temp = "";
    if (wordOrNum === "word") {
      temp = baseWordArr[Math.round(Math.random() * 25)];
      let ifToUpper = Math.round(Math.random() * 10) > 5;
      if (ifToUpper) {
        temp = temp.toUpperCase();
      }
    } else {
      temp = Math.round(Math.random() * 10);
    }
    res.push(temp);
  }
  return res.join("");
}

export default renderUniqueKey
