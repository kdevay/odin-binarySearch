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
function helpOrder(type, node, array, func) {
    if (type === 'in'){ // InOrder
        if (node == null) { return array}
        helpOrder('in', node.left, array, func); // Left side recursion
        if (func !== undefined) { func(node) } // Apply function to node
        array.push(node); // Add node to array
        helpOrder('in', node.right, array, func); // Right side recursion
        return array;
    } else if (type === 'pre'){ //PreOrder
        if (node == null) {return array}
        if (func !== undefined) {func(node)} // Apply function to node
        array.push(node); // Add node to array
        helpOrder('pre', node.left, array, func); // Left side recursion
        helpOrder('pre', node.right, array, func); // Right side recursion
        return array;
    } else { // PostOrder
        if (node == null) {return array}
        helpOrder('post', node.left, array, func); // Left side recursion
        helpOrder('post', node.right, array, func); // Right side recursion
        if (func !== undefined) {func(node)} // Apply function to node
        array.push(node); // Add node to array
        return array;
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
    find(num, node){
        if (node === null) {return} // If node not found
        if (num > node.value) { 
            return this.find(num, node.right);// Search right side of tree
        } else if (num < node.value) {
            return this.find(num, node.left); // Search left side of tree
        } else if (num === node.value) {
            return node;
        }
    }
    levelOrder(func){
        let nodeQueue = [];
        nodeQueue.push(this.root);
        let nodeCache = [];
        while (nodeQueue.length > 0) {
            let currentNode = nodeQueue.shift();
            if (func !== undefined){func(currentNode)}
            nodeCache.push(currentNode);
            if (currentNode.left !== null) {nodeQueue.push(currentNode.left)}
            if (currentNode.right !== null) {nodeQueue.push(currentNode.right)} 
        }
        let returnVal = func !== undefined ? 'success' : nodeCache;
        return returnVal;
    }
    inOrder(func) {
        let nodes = helpOrder('in', this.root, [], func);
        if (func === undefined) { return nodes;}
        return nodes;
    }
    preOrder(func) { 
        let nodes = helpOrder('pre', this.root, [], func);
        if (func === undefined){return nodes;}
        return;
    }
    postOrder(func) { 
        let nodes = helpOrder('post', this.root, [], func);
        if (func === undefined){return nodes;}
        return;
    }
    height(node) {
        if (node === null) { return -1 } // Base case
        if (node === undefined) { node = this.root } // Default to full height if called w/o arg
        return 1+ Math.max(this.height(node.left), this.height(node.right)); // +1 to include current node
    }
    depthHelper(node, current, count) {
        if (current === null) { return } // If node not found
        if (node === current) { return count } // If node is found
        // Else increment counter, search tree
        if (node.value > current.value) { return this.depthHelper(node, current.right, count + 1) }
        return this.depthHelper(node, current.left, count + 1)
    }
    depth(node) {
        if (node === this.root){ return 0 } // Depth of root is 0
        return this.depthHelper(node, this.root, 0);
    }
}

let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101, 102];

let tree = new Tree(arr);
tree.root = tree.buildTree(arr, 0, arr.length - 1, 'mid');
console.log('\n');
console.log('root: ', tree.root);
// console.log('tree: ', tree.root.left);
