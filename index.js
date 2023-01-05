// Node class //
class Node {
    constructor(int) {
    this.value = int;
    this.left = null;
    this.right = null;
    }
}


// Helpers //
function randomNumber(min, max){// Generates random number within a range
    // Max is exclusive, Min is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}
// Generates an array of 7 random numbers > 100
function arrayDisruptor() {
    let arr = [];
    while (arr.length < 7) {
        let num = randomNumber(100, 1000000);
        while (arr.includes(num) === true) {
            num = randomNumber(100, 1000000);
        }
        arr.push(num);
    }
    // Return sorted array
    return arr.sort(function compare(a, b) {
        if (a < b) { return -1 }
        if (a > b) { return 1 }
        return 0;
    });
}
// Recursively gets values from a branch
function getChildValues(node, deleteMe, arr){ 
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
// Returns a sorted array of nodes (inorder, postorder, and preorder)
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



// Tree class //
class Tree {
    constructor(array) {
        this.root = null;
    }
    // 1. Converts an array of numbers into a balanced binary tree of Node objects 
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
    // 2. Insert a number from the tree
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
    // 2. Delete a number from the tree
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
    // 3. Find a node in the binary tree
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
    // 4. Traverse the tree in level order, applying a function to each node along the way
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
    // 5. Traverse the tree in order, applying a function to each node along the way
    inOrder(func) {
        let nodes = helpOrder('in', this.root, [], func);
        if (func === undefined) { return nodes;}
        return nodes;
    }
    // 5. Traverse the tree in pre-order, applying a function to each node along the way
    preOrder(func) { 
        let nodes = helpOrder('pre', this.root, [], func);
        if (func === undefined){return nodes;}
        return;
    }
    // 5. Traverse the tree in post order, applying a function to each node along the way
    postOrder(func) { 
        let nodes = helpOrder('post', this.root, [], func);
        if (func === undefined){return nodes;}
        return;
    }
    // 6. Get node height (distance from given node to outermost leaf)
    height(node) {
        if (node === null) { return -1 } // Base case
        if (node === undefined) { node = this.root } // Default to full height if called w/o arg
        return 1+ Math.max(this.height(node.left), this.height(node.right)); // +1 to include current node
    }
    // Helper function for calculating node depth (see 7, below)
    depthHelper(node, current, count) {
        if (current === null) { return } // If node not found
        if (node === current) { return count } // If node is found
        // Else increment counter, search tree
        if (node.value > current.value) { return this.depthHelper(node, current.right, count + 1) }
        return this.depthHelper(node, current.left, count + 1)
    }
    // 7. Get node depth (distance from given node to root)
    depth(node) {
        if (node === this.root){ return 0 } // Depth of root is 0
        return this.depthHelper(node, this.root, 0);
    }
    // 8. Check if tree is balanced (height difference of left and right subtree is <=1)
    isBalanced() {
        let leftSide, rightSide, diff;
        leftSide = this.height(this.root.left) + 1;
        rightSide = this.height(this.root.right) + 1;
        diff = leftSide > rightSide ? leftSide - rightSide : rightSide - leftSide;
        if (diff > 1) { return false }
        return true;
    }
    // 9. Re-balance (rebuild) the tree 
    reBalance() {
        // Create array from tree
        let arr = getChildValues(this.root, 'deleteMe', []);
        // Rebuild tree
        this.buildTree(arr, 0, arr.length - 1);
        return
    }
}


// Tie it all together: //
// 1. Create a function that returns an array of random, ascending numbers.
function createSortedArr() {
    let length = randomNumber(8, 50);
    let arr = [];
    while (arr.length < length) {
        let num = randomNumber(1, 99);
        while (arr.includes(num) === true) {
            num = randomNumber(1, 99);
        }
        arr.push(num);
    }
    // Return sorted array
    return arr.sort(function compare(a, b) {
    if (a < b) { return -1 }
    if (a > b) { return 1 }
    return 0;
    });
}
let arr = createSortedArr(); // Create random array

// 2. Convert that array into a binary search tree.
let tree = new Tree(arr);
tree.root = tree.buildTree(arr, 0, arr.length - 1);

// 3. Confirm the tree is balanced
console.log(tree.isBalanced());

// 4. Print all elements in level, pre, post, and in order
tree.levelOrder(console.log);
tree.inOrder(console.log);
tree.preOrder(console.log);
tree.postOrder(console.log);

// 5. Unbalance the tree by adding several random numbers > 100
let disrupt = arrayDisruptor();
let i = 0;
while(i < 8) {
    tree.insert(disrupt[i], tree.root);
    i++;
}

// 6. Confirm the tree is unbalanced (call isBalanced)
console.log(tree.isBalanced())

// 7. Balance the tree (call reBalance)
tree.reBalance();

// 8. Confirm the tree is balanced (call isBalanced)
console.log(tree.isBalanced())

// 9. Print all elements in level, pre, post, and in order
tree.levelOrder(console.log);
tree.inOrder(console.log);
tree.preOrder(console.log);
tree.postOrder(console.log);
