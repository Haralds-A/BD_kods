
import fs from 'fs';
const pagaiduFails = process.argv[2];
const zurnaliJson = fs.readFileSync(pagaiduFails, 'utf8');
const zurnali = JSON.parse(zurnaliJson);


function glabatZurnalusUnMeritLaiku(logs) {
    const startTime = performance.now();
    const logArray = [];
    logs.forEach(log => {
        logArray.push(log);
    });
    const endTime = performance.now();
    const kopejaisLiaks = endTime - startTime;

    return { logArray, kopejaisLiaks};
}
  const { logArray, kopejaisLiaks} = glabatZurnalusUnMeritLaiku(zurnali);
  console.log("Visu žurnālu masīvs: ", JSON.stringify(logArray, null, 2));
  console.log("visu "+logArray.length+". žurnālu saglabasanas laiks "+kopejaisLiaks.toFixed(3) + " milisekundes");