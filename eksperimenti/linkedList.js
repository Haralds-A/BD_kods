import fs from 'fs';

// Read the path to the temporary file from command-line argument
const tempFilePath = process.argv[2];

// Read the JSON data from the temporary file
const logsJson = fs.readFileSync(tempFilePath, 'utf8');

// Parse the JSON logs
const logs = JSON.parse(logsJson);

class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    ievietot(data) {
        const newNode = new ListNode(data);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    garums() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }
}

function saklabasSaistitaSaraksta(logs) {
    const logList = new LinkedList();
    const startTime = performance.now();
    logs.forEach(log => {
        logList.ievietot(log);
    });
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    return { logList, elapsedTime };
}

const { logList, elapsedTime } = saklabasSaistitaSaraksta(logs);

console.log("Visu " + logList.garums() + " žurnālu saglabāšanas laiks " + elapsedTime.toFixed(3) + " milisekundes");
