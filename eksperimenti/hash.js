
import fs from 'fs';
const pagaiduFails = process.argv[2];
const zurnaliJson = fs.readFileSync(pagaiduFails, 'utf8');
const zurnali = JSON.parse(zurnaliJson);


function glabatZurnalus(logs) {
  const hashTabula = {};
  const startTime = performance.now();
  logs.forEach((log, index) => {
    hashTabula[index] = log;
  });
  const endTime = performance.now();
  const kopejaisLaiks = endTime - startTime;
  return { hashTabula , kopejaisLaiks};
}

const { hashTabula ,kopejaisLaiks } = glabatZurnalus(zurnali);
const logCount = Object.keys(hashTabula).length;
console.log("visu "+logCount+". žurnālu saglabasanas laiks " + kopejaisLaiks.toFixed(3) + " milisekundes");
