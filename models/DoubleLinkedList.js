
const Node = require('./Node.js');

class DoubleLinkedList {

  constructor() {
    this.first = null;
    this.last = null;
  }

  /**
   * Agrega un Node al final de la lista.
   * @method add
   * @param {Node} node - Instancia de Node.
   */
  add(value) {
    if (!value) throw new Error("value param is empty");
    const node = new Node(value);
    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      node.prev = this.last;
      this.last.next = node;
      this.last = node;
    }
  }

  find(callback) {
    if (!this.first) return
    function loop(node) {
      if (callback(node.value)) return node.value;
      if (node.next) return loop(node.next);
    }
    return loop(this.first);
  }

  delete(callback) {
    if (callback(this.first)) {
      let aux = this.first
      this.first = this.first.next;
      this.first.prev = null
      return aux.value;
    }

    function loop(node) {
      if (!node) return;
      if (callback(node)) {
        let aux = node;
        if(!node.next){
          node.prev.next = aux.next;
          return aux
        }
        if(!node.prev){
          node.next.prev = aux.prev;
          return aux
        }

        node.prev.next = aux.next;
        node.next.prev = aux.prev;
        return aux;
      }
      if (node.next) return loop(node.next);
    }
    return loop(this.first.next);
  }

  /**
   * todo: eliminar esta función
   */
  _insert(position, value) {
    if (position === 1) {
      this.addFirst(value);
      return
    }

    let count = 1;
    let finishFlag = false;
    const newNode = new Node(value);
    function recursiveTraversal(node) {
      if (++count === position) {
        newNode.next = node.next;
        node.next = newNode;
        finishFlag = true;
        return
      }
      if (node.next) return recursiveTraversal(node.next);
    }
    recursiveTraversal(this.first);

    if (position >= count && !finishFlag) this.add(value);
  }

  /**
   * Elimina y retorna el primer Node de la lista.
   * @method shift
   * @returns {Node} Instancia de Node.
   */
  _shift() {
    let aux = this.first;
    this.first = this.first.next;
    return aux;
  }

  /**
   * Elimina y retorna el ultimo nodo de la lista.
   * @method pop
   * @returns {Node} Instancia de Node.
   */
  _pop() {
    if (!this.first.next) {
      let aux = this.first;
      this.first = null;
      return aux
    }

    //***Sin recursividad */
    // let node = this.first;
    // while(node.next.next != null){
    //   node = node.next;
    // }
    // let aux = node.next
    // node.next = null;
    // return aux;

    //***Con recursividad */
    const loop = (nodo = this.first) => {
      if (nodo.next.next != null) {
        return loop(nodo.next);
      }
      let aux = nodo.next;
      nodo.next = null;
      return aux;
    }

    return loop();
  }

  /**
   * Retorna una lista de todos los Node.
   * @getter list
   * @returns {String} Lista de nodos.
   */
  get list() {
    if (!this.first) return '';
    return this.#listRecursion();
  }

  #listRecursion(str = '', nodo = this.first) {
    str += `${nodo.value}, `;
    if (nodo.next) {
      return this.#listRecursion(str, nodo.next);
    } else {
      return str;
    }
  }

  /**
   * Retorna una lista en reversa de todos los Node.
   * @getter reverseList
   * @returns {String} Lista de nodos.
   */
  get reverseList() {
    if (!this.first) return '';
    return this.#reverseListRecursion();
  }

  #reverseListRecursion(node = this.first) {
    if (!node.next) return node.value.getValueInString;
    /**
     * como el ultimo ya retornó llega al final y suma su numero 
     * despues de este y como entrando a este if reotrna algo y el
     * que ejecuta la función antes no tiene su next en null hace esto mismo.
     */
    return `${this.#reverseListRecursion(node.next)}\n${node.value.getValueInString}`;
  }
}

module.exports = DoubleLinkedList;