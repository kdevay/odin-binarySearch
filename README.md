# odin-binarySearch
binary search tree practice - Build a balanced BST using classes & recursion

Node class:
- value
- left child
- right child

Tree class
- accepts an array when initialized
- root attribute (assigned by buildTree)

Specs:
1. Ignore duplicate values (remove duplicate values from array)
2. BuildTree Function 
    - converts an array of numbers into a balanced binary tree of Node objects 
    - The buildTree function should return the root node.
3. Insert/Delete Functions 
    - insert/delete a number from the tree
4. Find Function
    - returns node matching a given value
5. levelOrder Function 
    - accepts another function as a parameter
    - (traverse the tree in breadth-first(?) level order, passing each node as argument to the provided function) basically like 'forEach'
    - use iteration or recursion 
    - return an array of values if no function is given. 
    - Tip: use an array as a 'queue' track the child nodes yet to be traversed and to add new ones to the list.
6. InOrder, PreOrder, and PostOrder Functions 
that accept a function parameter. 
    - (traverse the tree in depth-first order (?), passing each node as argument to the provided function) basically like 'forEach'
    - return an array of values if no function is given. 
7. height function 
    - calculates a node's height
    - Height = number of edges in longest path from a given node to a 'leaf'(?) node.
8. depth function
    - calculates a node's depth
    - Depth = number of edges in the path between a given node and the root node.
9. isBalanced function
    - checks if the tree is balanced (height difference of left and right subtree is <=1 for every node)
10. ReBalance function 
    - rebalances an unbalanced tree. 
    - Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

Tie it all together:
1. Create a function that returns an array of random, ascending numbers.
2. Convert that array into a binary search tree.
3. Confirm the tree is balanced (call isBalanced)
4. Print all elements in level, pre, post, and in order
5. Unbalance the tree by adding several random numbers > 100
6. Confirm the tree is unbalanced (call isBalanced)
7. Balance the tree (call reBalance)
8. Confirm the tree is balanced (call isBalanced)
9. Print all elements in level, pre, post, and in order