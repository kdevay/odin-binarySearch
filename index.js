// Node class
class Node {
    constructor(int) {
    this.value = int;
    this.left = null;
    this.right = null;
    }
}

// Helpers
function getChildValues(node, deleteMe, arr){ // Recursively gets values from a branch
    if (node === null){
        return arr.sort(function compare(a, b) {
            if (a < b) {return -1}
            if (a > b) {return 1}
            return 0;
        });
    }
    if (node.value !== deleteMe){ arr.push(node.value);}
    getChildValues(node.left, deleteMe, arr);
    getChildValues(node.right, deleteMe, arr);
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

    insert(num, node){
        // find where the number belongs in the tree
        if (num > node.value) {
            if (node.right === null) {
                num = new Node(num) // convert number into node
                node.right = num// add number to tree
                return;
            }
            return this.insert(num, node.right);
        } else if (num < node.value) {
            if (node.left === null) {
                num = new Node(num) // convert number into node
                node.left = num// add number to tree
                return;
            }
            return this.insert(num, node.left);
        }
        // If number is duplicate return error message
        console.log('Duplicate numbers are not allowed.');
    }
    delete(num, node, parent){
        // If node.value != num, keep searching
        if (num > node.value) {
            return this.insert(num, node.right, node);
        } else if (num < node.value) {
            return this.insert(num, node.left, node);
        }
        // If node.value = num
        // Find node in relation to parent
        let parentSide = parent.left === node ? parent.left : parent.right;
        if (node.left === null && node.right === null){
            // If node has no children, set to null
            parentSide = null;
            return;
        }
        // Get node's descendant values in a sorted array
        let arr = getChildValues(node, node.value, []);
        // Find new root by rebuilding branch without node's value
        let root = buildTree(arr, 0, arr.length - 1);
        // Replace node with new root
        parentSide = root;
        return;
    }
}

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101, 102];

let tree = new Tree(arr);
tree.root = tree.buildTree(arr, 0, arr.length - 1, 'mid');
console.log('\n');
console.log('root: ', tree.root);
// console.log('tree: ', tree.root.left);
