

let names, fullNames, branchSelector;

const selector = document.querySelector('.dateSelector');


// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Get elements
  const fileInput = document.querySelector('.fileInput');
  const chooseFileBtn = document.querySelector('.fileBt');
  const printBtn = document.getElementById('printBtn');
  const copyBtn = document.querySelector('.copyBt');
  branchSelector = document.querySelector('.branchSelector');

  // Event listeners
  chooseFileBtn.addEventListener('click', () => fileInput.click());
  printBtn.addEventListener('click', () => window.print());
  fileInput.addEventListener('change', handleFile);
  selector.addEventListener('change', handleDate);
  copyBtn.addEventListener('click', () => {
    const counter = document.querySelector('.counter');
    navigator.clipboard.writeText(counter.textContent);
  });

});


function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    let sheet = currentSheet(e);

    // const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    // const html = XLSX.utils.sheet_to_html(firstSheet);
    // document.getElementById('tableContainer').innerHTML = html;
    // printBtn.classList.remove('hidden');
    start(sheet)

  }

  reader.onerror = function () {
    alert('Error reading file');
  };

  reader.readAsArrayBuffer(file);


};

function handleDate(e) {
  const data = new Uint8Array(e.target.result);
  const workbook = XLSX.read(data, { type: 'array' });
  start(workbook.Sheets[selector.value]);
}


function start(sheet) {

  fullNames = rangeValues(sheet, 'B2:B115');
  names = getNames()
  currentStock = rangeValues(sheet, 'AA2:AA115');

  readCalib(currentStock);
}

function currentSheet(e) {
  const data = new Uint8Array(e.target.result);
  const workbook = XLSX.read(data, { type: 'array' });
  const today = new Date();

  workbook.SheetNames.forEach(element => {
    const option = document.createElement('option');
    option.value = element;
    option.text = element;
    selector.appendChild(option);
  });

  for (sheetName of workbook.SheetNames) {
    const day = today.getDate().toString();
    let sheetDay = sheetName.split('.')[0]


    if (sheetDay == day) {
      console.log(sheetName);
      selector.value = sheetName;
      return workbook.Sheets[sheetName];
    }
  }

  return workbook.Sheets[workbook.SheetNames[0]];
  toast("No sheet found for today's date");
}


function rangeValues(sheet, rangeParam) {

  const range = XLSX.utils.decode_range(rangeParam);
  const values = [];

  // Extract values from the range
  for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    const cellAddress = { c: range.s.c, r: rowNum };
    const cellRef = XLSX.utils.encode_cell(cellAddress);
    const cell = sheet[cellRef];

    // Get formatted value (cell.w) or raw value (cell.v)
    values.push(cell ? (cell.w || cell.v) : '');
  }

  return values;

}




function getNames(params) {

  const cakeNames = [
    "Australian milky",
    "AUSTRALIAN MILKY",
    "BELGIUM CHOCLATE",
    "BELGIUM CHOCLATE",
    "Black forest",
    "Black forest",
    "Blueberry ",
    "Blueberry ",
    "BUTTERSCOTCH",
    "BUTTERSCOTCH",
    "Cheese ",
    "Choco Almond ",
    "Choco Almond ",
    "Choco reddies ",
    "Choco reddies ",
    "Chocolate butterscotch ",
    "Chocolate butterscotch ",
    "Chocolate caramel ",
    "Chocolate caramel ",
    "Chocolate truffle",
    "Chocolate truffle",
    "Choconut ",
    "Choconut ",
    "Dark vancho",
    "Dark vancho",
    "Death by chocolate",
    "Death by chocolate",
    "DREAM LARG",
    "DREAM MEDIUM",
    "DREAM SMALL",
    "FERRERO",
    "FRESH FRUIT",
    "FRESH FRUIT",
    "Fruit and nut ",
    "Fudge and nut ",
    "Full chocolate",
    "Full chocolate",
    "German forest ",
    "German forest ",
    "HONEY NUT",
    "HONEY NUT",
    "Irish coffee ",
    "Irish coffee ",
    "JACK FRUIT",
    "JACK FRUIT",
    "KITKAT",
    "LOTUS BISCOUFF",
    "Mango cake",
    "Mango cake",
    "MANGO GALAXY",
    "MANGO GALAXY",
    "MILKY FUDGE",
    "MILKY FUDGE",
    "MILKY VANCHO",
    "MILKY VANCHO",
    "MIRROR GLAZE",
    "MIRROR GLAZE",
    "Nutty bubble ",
    "Nutty bubble ",
    "NUTTY NUTTELLA",
    "OREO CAKE",
    "OREO CAKE",
    "Pineapple vancho",
    "Pineapple vancho",
    "PISTHA NUT",
    "PISTHACHIO",
    "PISTHACHIO",
    "PLUM CAKE",
    "PRALAIN RED",
    "PRALAIN RED",
    "PURPLE VELVET",
    "PURPLE VELVET",
    "RAFFAELO",
    "Rainbow ",
    "Red bee ",
    "Red bee ",
    "Red velvet ",
    "Red velvet ",
    "Redcho ",
    "Redcho ",
    "Royal pista nut",
    "Royal pista nut",
    "Royal truffle ",
    "ROYAL TRUFFLE",
    "STRAWBERRY",
    "STRAWBERRY",
    "TENDER COCONUT",
    "Truffle silky ",
    "Truffle silky ",
    "VANILA ",
    "VANILA ",
    "White forest",
    "White forest",
    "White truffle ",
    "White truffle ",
    "White vancho",
    "White vancho",
    "GALAXY RS.9",
    "DIARY MILK FAMILYPACK RS.3",
    "KITKAT RS7",
    "DIARYMILK BITES RS.75",
    "DIARY MILK HEARTBLUSH RS.335",
    "GALAXY RS.8",
    "GALAXY FRUIT NUT RS.8",
    "DIARY MILK HAZELNUT RS.75",
    "DIARY MILK SILK ROAST ALMOND RS.95",
    "DIARY MILK SILK 8",
    "DIARY MILK FRUIT AND NUT 95",
    "CARAMEL ",
    "CARAMEL ",
    "FUDGE AND NUT",
    "Rainbow", "", "",
  ];
  return cakeNames;
}
