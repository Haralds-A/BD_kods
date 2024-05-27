// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract LogTestContract {
    // Definē struktūru priekš žurnāla ieraksta
    struct Log {
        uint256 eventId; // Notikuma ID
        string message; // Ziņojums
        string timeCreated; // Izveidošanas laiks
        string levelDisplayName; // Līmeņa nosaukums
        string providerName; // Piegādātāja nosaukums
    }

    // Privāts masīvs, kas satur visus žurnāla ierakstus
    Log[] private logs;

    // Funkcija, kas saglabā žurnāla ierakstu
    function saglabatZurnalu(
        uint256 eventId, // Notikuma ID
        string memory message, // Ziņojums
        string memory timeCreated, // Izveidošanas laiks
        string memory levelDisplayName, // Līmeņa nosaukums
        string memory providerName // Piegādātāja nosaukums
    ) public {
        // Pievieno jaunu žurnāla ierakstu masīvam
        logs.push(Log(eventId, message, timeCreated, levelDisplayName, providerName));
    }

    // Funkcija, kas meklē žurnāla ierakstus pēc notikuma ID
    function mekletPecId(uint256 eventId) public view returns (Log[] memory) {
        uint256 count = 0;
        
        // Skaita cik žurnāla ieraksti atbilst dotajam notikuma ID
        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].eventId == eventId) {
                count++;
            }
        }

        // Izveido jaunu masīvu rezultātu glabāšanai
        Log[] memory result = new Log[](count);
        uint256 index = 0;
        
        // Pievieno atbilstošos žurnāla ierakstus rezultātu masīvam
        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].eventId == eventId) {
                result[index] = logs[i];
                index++;
            }
        }

        // Atgriež rezultātu masīvu
        return result;
    }
}
