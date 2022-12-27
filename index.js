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
    
    return arr.sort(function compare(a, b) {
        if (a < b) {return -1}
        if (a > b) {return 1}
        return 0;
    });
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

    insert(num, node) {
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
        } else if (num === node.value) {
            // If number is duplicate print error message & return node
            console.log('Duplicate numbers are not allowed.');
            return node;
        }
    }
    
    delete(num, node, parent) {
        if (node === null) {return} // If node not found
        if (num > node.value) { 
            return this.delete(num, node.right, node);// Search right side of tree
        } else if (num < node.value) {
            return this.delete(num, node.left, node); // Search left side of tree
        } else if (num === node.value) {
        if (node.left === null && node.right === null) {
            // If node has no children, set to null
            parent.left === node ? parent.left = null : parent.right = null;
            return;
        }
        // Get node descendants' values in a sorted array
        let arr = getChildValues(node, node.value, []);
        // Rebuild branch without node's value
        let root = this.buildTree(arr, 0, arr.length - 1);
        if (node === this.root) {
            this.root = root; // If deleting root, reassign to new root value
            return;
        }
        // Replace node with new root
        parent.left === node ? parent.left = root : parent.right = root;
        return;
        }
        console.log('error');
        return;
    }
}

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101, 102];

let tree = new Tree(arr);
tree.root = tree.buildTree(arr, 0, arr.length - 1, 'mid');
console.log('\n');
console.log('root: ', tree.root);
// console.log('tree: ', tree.root.left);
