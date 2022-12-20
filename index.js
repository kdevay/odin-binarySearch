// Node class
class Node {
    constructor(int) {
        this.value = int;
        this.left = null;
        this.right = null;
    }
}

// Tree class
// - accepts an array when initialized
// - root attribute (assigned by buildTree)
class Tree {
    constructor(){
        this.root = null;
    }
    buildTree(array, startIndex, endIndex) {
        // Base case
        if (startIndex > endIndex){return NULL}
        // Find root index
        let i =  Math.round((startIndex + endIndex ) / 2);
        this.root = new Node(array[i]); // Make root node
        // Build branches
        this.root.left = buildTree(array, startIndex, i - 1);
        this.root.right = buildTree(array, i + 1, endIndex);
        return this.root;
    }
}

let arr = [10, 19, 50, 100, 200, 400, 1000,];

let tree = new Tree();
tree = tree.buildTree(arr, 0, arr.length - 1);
console.log(tree);