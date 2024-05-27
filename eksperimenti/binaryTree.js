import fs from 'fs';

const tempFilePath = process.argv[2];

const logsJson = fs.readFileSync(tempFilePath, 'utf8');

const logs = JSON.parse(logsJson);

  class BinaryTreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new BinaryTreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) {
        if (newNode.data.TimeCreated < node.data.TimeCreated) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    countNodes() {
        return this.countNodesRecursively(this.root);
    }
    countNodesRecursively(node) {
        if (!node) {
            return 0;
        }
        return 1 + this.countNodesRecursively(node.left) + this.countNodesRecursively(node.right);
    }
}

function saveLogsAndMeasureTimeBinaryTree(logs) {
    const logTree = new BinaryTree();
    const startTime = performance.now();
    logs.forEach(log => {
        logTree.insert(log);
    });
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    return { logTree,elapsedTime };
}
const { logTree ,elapsedTime } = saveLogsAndMeasureTimeBinaryTree(logs);

console.log("visu "+logTree.countNodes()+". žurnālu saglabasanas laiks "+elapsedTime.toFixed(3) + " milisekundes")