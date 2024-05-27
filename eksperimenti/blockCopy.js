import Web3 from 'web3'; // Importē Web3 bibliotēku

import fs from 'fs'; // Importē failu sistēmas bibliotēku

const tempFilePath = process.argv[2]; // Iegūst pagaidu faila ceļu no komandrindas argumentiem

const logsJson = fs.readFileSync(tempFilePath, 'utf8'); // Nolasa žurnāla failu kā tekstu

const logs = JSON.parse(logsJson); // Parsē žurnāla faila saturu JSON formātā


const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"); // Iestata HTTP nodrošinātāju priekš Web3
const web3 = new Web3(provider); // Izveido Web3 instanci ar norādīto nodrošinātāju
const contractAddress = '0xB01D76c2160b5c8015f459dd1531a6bD91F1D8a1'; // Norāda līguma adresi
const contractAbi = [ // Norāda līguma ABI (Application Binary Interface)
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timeCreated",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "levelDisplayName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "providerName",
        "type": "string"
      }
    ],
    "name": "saglabatZurnalu",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "eventId",
        "type": "uint256"
      }
    ],
    "name": "mekletPecId",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "eventId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "timeCreated",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "levelDisplayName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "providerName",
            "type": "string"
          }
        ],
        "internalType": "struct LogTestContract.Log[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const testData = {
  Id: 401,
  ProviderName: 'MyApp',
  TimeCreated: '2024-05-16T15:44:48Z',
  LevelDisplayName: 'Information',
  Message: 'Zurnala ieraksts par notikumu 96'
}

const contract = new web3.eth.Contract(contractAbi, contractAddress); // Izveido līguma instanci

async function saglabatZurnalus(logs) { // Funkcija žurnāla ierakstu saglabāšanai
    const startTime = performance.now(); // Sāk laika mērīšanu
    for (const log of logs) {
        try {
            await contract.methods.saglabatZurnalu(log.Id, log.TimeCreated, log.LevelDisplayName, log.ProviderName, log.Message).send(
              { from: "0x97B4182f333beF7330f60C048Af51ec8DAf7666A", gas: 3000000 }); // Izsauc saglabāšanas metodi līgumā
        } catch (error) {
            console.error("Kļūda sūtot datus:", error); // Ja notiek kļūda, izvada kļūdas ziņojumu
        }
    }
    const endTime = performance.now(); // Beidz laika mērīšanu
    const throughput = endTime - startTime; // Aprēķina caurlaidību (kopējais laiks)
    return { throughput };
}

async function glabatZurnaluGala() { // Funkcija viena žurnāla ieraksta saglabāšanai
  const startTime = performance.now(); // Sāk laika mērīšanu
  try {
      await contract.methods.saglabatZurnalu(testData.Id, testData.TimeCreated, testData.LevelDisplayName, testData.ProviderName, testData.Message).send(
        { from: "0x97B4182f333beF7330f60C048Af51ec8DAf7666A", gas: 3000000 }); // Izsauc saglabāšanas metodi līgumā
  } catch (error) {
      console.error("Kļūda sūtot datus:", error); // Ja notiek kļūda, izvada kļūdas ziņojumu
  }
  const endTime = performance.now(); // Beidz laika mērīšanu
  const elapsedTime = endTime - startTime; // Aprēķina izpildes laiku
  return { elapsedTime };
}

async function mekletZurnalsu(eventId) { // Funkcija žurnāla ierakstu meklēšanai pēc notikuma ID
    const startTime = performance.now(); // Sāk laika mērīšanu
    const foundLogs = await contract.methods.mekletPecId(eventId).call({ gas: 300000000000000000 }); // Izsauc meklēšanas metodi līgumā
    const endTime = performance.now(); // Beidz laika mērīšanu
    const elapsedTime = endTime - startTime; // Aprēķina izpildes laiku
    return { foundLogs, elapsedTime };
}

(async () => {
    try {
        const {throughput} = await saglabatZurnalus(logs); // Izsauc žurnāla ierakstu saglabāšanas funkciju
        console.log("laiks lai saglabatu visus zurnālus " + throughput.toFixed(3) + " milisekundes"); // Izvada caurlaidības laiku
        const {elapsedTime} = await glabatZurnaluGala(); // Izsauc vienu žurnāla ierakstu saglabāšanas funkciju
        console.log("saglabasanas laiks vianam zurnalam " + elapsedTime.toFixed(3) + " milisekundes"); // Izvada viena ieraksta saglabāšanas laiku

        const eventIdFirst = 401;
        const { foundLogs: atrastiZurnali, elapsedTime: laiksPirmajam } = await mekletZurnalsu(eventIdFirst); // Izsauc žurnāla ierakstu meklēšanas funkciju pēc pirmā notikuma ID
        console.log("Meklesanas laiks lai atrastu visus zurnalus ar notikuma identifikatoru " + eventIdFirst + ":", laiksPirmajam.toFixed(3) + " milisekundes"); // Izvada meklēšanas laiku

        const eventId = 403;
        const { foundLogs, elapsedTime: laiksOtrajam } = await mekletZurnalsu(eventId); // Izsauc žurnāla ierakstu meklēšanas funkciju pēc otrā notikuma ID
        console.log("Meklesanas laiks lai atrastu visus zurnalus ar notikuma identifikatoru " + eventId + ":", laiksOtrajam.toFixed(3) + " milisekundes"); // Izvada meklēšanas laiku
    } catch (error) {
        console.error("Notikusi kļūda:", error); // Ja notiek kļūda, izvada kļūdas ziņojumu
    }
})();
