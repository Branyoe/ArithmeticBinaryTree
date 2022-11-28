const DoubleLinkedList = require('./DoubleLinkedList.js');
const Queue = require('./Queue.js');
const Stack = require('./Stack.js');

class BinaryTree {
  constructor(expression) {
    this._expression = expression;
    this.expStr = expression;
    this.expList = this._getExpressionList(expression);
    this._tree = this._buildTree();
    this.preOrder = this.getPreOrderStack().list;
    this.postOrder = this.getPostOrderQueue().list;
  }

  //*methods
  //**instance
  //***public
  getPreOrderCalc(){
    return BinaryTree.resWhitPreOrder(this.getPreOrderStack());
  }
  
  getPostOrderCalc() {
    return BinaryTree.resWhitPostOrder(this.getPostOrderQueue());
  }

  getPreOrderStack() {
    const stack = new Stack();
    return this._preOrderLoop(stack);
  }
  
  getPostOrderQueue(){
    const queue = new Queue();
    return this._postOrderLoop(queue);
  }

  //***private
  _preOrderLoop(stack, root = this._tree.first) {
    if (root){
      stack.add(root.value);
      this._preOrderLoop(stack, root.left);
      this._preOrderLoop(stack, root.right);
    }
    return stack;
  }

  _postOrderLoop(queue, root = this._tree.first) {
    if (root){
      this._postOrderLoop(queue, root.left);
      this._postOrderLoop(queue, root.right);
      queue.add(root.value);
    }
    return queue;
  }

  _getExpressionList() {
    const list = new DoubleLinkedList();
    for (let char of this._expression) {
      if (Number(char)) {
        list.add(Number(char));
      } else {
        list.add(char);
      }
    }
    return list;
  }

  _filterLevel1(node, list) {
    if (!node) return
    if (node.value === '*' || node.value === '/') {
      node.left = node.prev;
      node.right = node.next;
      list.delete((n) => n === node.prev);
      list.delete((n) => n === node.next);
    }
    this._filterLevel1(node.next, list)
  }

  _filterLevel2(node, list) {
    if (!node) return
    if (node.value === '+' || node.value === '-') {
      node.left = node.prev;
      node.right = node.next;
      list.delete((n) => n === node.prev)
      list.delete((n) => n === node.next)
    }
    this._filterLevel2(node.next, list)
  }

  _buildTree() {
    const expListCopy = this._getExpressionList(this._expression);
    this._filterLevel1(expListCopy.first, expListCopy);
    this._filterLevel2(expListCopy.first, expListCopy);
    return expListCopy;
  }

  //**static
  //***public
  static preOrderCalc(expr) {
    const preOrderStack = new Stack(expr);
    return BinaryTree.resWhitPreOrder(preOrderStack);
  }

  static postOrderCalc(expr) {
    const postOrderQueue = new Queue(expr);
    return BinaryTree.resWhitPostOrder(postOrderQueue);
  }

  static resWhitPreOrder(preOrderStack) {
    const resStack = new Stack();
    let value = preOrderStack.extract();
    while(value){
      if(Number(value)){
        resStack.add(value);
      }else{
        const a = resStack.extract();
        const b = resStack.extract();
        resStack.add(eval(`${a}${value}${b}`));
      }
      value = preOrderStack.extract();
    }
    return resStack.current;
  }

  static resWhitPostOrder(postOrderQueue) { 
    const resStack = new Stack();
    let value = postOrderQueue.extract();
    while(value){
      if(Number(value)){
        resStack.add(value);
      }else{
        const a = resStack.extract();
        const b = resStack.extract();
        resStack.add(eval(`${b}${value}${a}`));
      }
      value = postOrderQueue.extract();
    }
    return resStack.current;
  }
}

module.exports = BinaryTree;