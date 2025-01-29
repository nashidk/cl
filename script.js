

let names;


// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Get elements
  const fileInput = document.getElementById('fileInput');
  const chooseFileBtn = document.getElementById('chooseFileBtn');
  const printBtn = document.getElementById('printBtn');

  // Event listeners
  chooseFileBtn.addEventListener('click', () => fileInput.click());
  printBtn.addEventListener('click', () => window.print());
  fileInput.addEventListener('change', handleFile);

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

      names = rangeValues(sheet, 'B2:B115');
      currentStock = rangeValues(sheet, 'AA2:AA115');

      fetch('caliberate.txt')
        .then(response => response.text())  // Convert response to text
        .then(data => {
          // console.log(data); // Output the file content
          getRealStock(data, currentStock);

        })
        .catch(error => console.error('Error reading the file:', error));

    }

    reader.onerror = function () {
      alert('Error reading file');
    };

    reader.readAsArrayBuffer(file);


  };







});

function currentSheet(e) {
  const data = new Uint8Array(e.target.result);
  const workbook = XLSX.read(data, { type: 'array' });
  const today = new Date();


  for (sheetName of workbook.SheetNames) {
    const day = today.getDate().toString();
    let sheetDay = sheetName.split('.')[0]


    if (sheetDay == day) {
      console.log(sheetName);
      return workbook.Sheets[sheetName];
    }
  }
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