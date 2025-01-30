

let halfkg = (title) => {
  return title.toLowerCase().includes("half")
}

function readCalib(params) {
  fetch('caliberate.txt')
    .then(response => response.text())  // Convert response to text
    .then(data => {
      // console.log(data); // Output the file content
      getRealStock(data);
    })
    .catch(error => console.error('Error reading the file:', error));

}

function getRealStock(textData, currentStock) {
  stockList = [];

  for (let line of textData.split("\n")) {
    // let [name, stockStr] = line.split(",");
    // stock = parseInt(stockStr);
    // console.log(name, stock);

    splitLine = line.split(",");
    stockList.push(splitLine[splitLine.length - 1]);
  }

  findCounter(currentStock, stockList);

}

function findCounter(currentStock, realStock) {

  currentStock = makeIntList(currentStock)
  realStock = makeIntList(realStock);

  let one = {}, half = {};

  for (let i = 0; i < currentStock.length; i++) {
    let counter = realStock[i] - currentStock[i]
    if (counter > 0) {
      if (halfkg(names[i])) {
        half[names[i]] = counter;
      } else {
        one[names[i]] = counter;
      }
    }
  }


  setCounter(one, half);



}

function setCounter(onekg, halfkg) {
  let counterDiv = document.querySelector('.counter');
  counterDiv.textContent = concatenateObject("1kg", onekg) +
    "\n\n" + concatenateObject("Half kg", halfkg);
}

function makeIntList(list) {
  let intList = [];
  for (let i = 0; i < list.length; i++) {
    intList.push(parseInt(list[i]));
  }
  return intList;
}

function concatenateObject(caption, obj) {
  let result = `${caption}\n`;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += `${key} ${obj[key]}\n `;
    }
  }
  return result
}
