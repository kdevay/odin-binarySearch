// Node class
class Node {
    constructor(int) {
    this.value = int;
    this.left = null;
    this.right = null;
    }
}


// Tree class
class Tree {
    constructor(array) {
        this.root = null;
    }

    buildTree(array, start, end) {
        // Base case
        if (start > end) { return null }
    
        // Create head
        let mid
        if ((end + start) % 2 === 0) {
            mid = (end + start) / 2;
        } else {
            mid = (((end + start) / 2) + .5);
        }
    
        let root = new Node(array[mid]);
    
        // Create head children
        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
    
        return root;
    }
}

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101, 102];

let tree = new Tree(arr);
tree.root = tree.buildTree(arr, 0, arr.length - 1, 'mid');
console.log('\n');
console.log('root: ', tree.root);
// console.log('tree: ', tree.root.left);
