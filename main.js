const BinaryTree = require('./models/BinaryTree.js');
const Keyboard = require('./models/Keyboard.js');
const Stack = require('./models/Stack.js');

const tree = new BinaryTree(Keyboard.readString("Introduce una exprecion algebrica: "))
// const tree = new BinaryTree("8+3-6*2-3*5+4*3*2/8");
// const tree = new BinaryTree("3+4*5+3");


console.log('\n**Calculado desde arbol:');
console.log('PreOrder:');
console.log(tree.preOrder);
console.log(tree.getPreOrderCalc());

console.log();

console.log('PostOrder:');
console.log(tree.postOrder);
console.log(tree.getPostOrderCalc());

console.log("\n**Calculado desde preOrder:");
console.log(BinaryTree.preOrderCalc(tree.getPreOrderStack().listRaw));

console.log("\n**Calculado desde postOrder:");
console.log(BinaryTree.postOrderCalc(tree.getPostOrderQueue().listRaw));