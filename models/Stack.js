class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Stack {

  constructor(list) {
    this.first = null;
    this.last = null;
    if (list) {
      for (let itm of list) {
        this.add(itm);
      }
    }
  }

  add(data) {
    const node = new Node(data);
    if (!this.first) {
      this.first = node;
      this.last = node;
    }
    else {
      let aux = this.last;
      node.prev = aux;
      aux.next = node;
      this.last = node;
    }
  }

  extract() {
    if (!this.last) return null;
    if (this.last === this.first) {
      let aux = this.last;
      this.first = null;
      this.last = null;
      return aux.value;
    }
    let aux = this.last;
    aux.prev.next = null;
    this.last = aux.prev;
    return aux.value;
  }

  get current() {
    return this.last.value;
  }

  get list() {
    let res = "";
    let temp = this.first;
    while (temp != null) {
      res += `${temp.value}, `;
      temp = temp.next;
    }
    return res;
  }

  get listRaw() {
    let res = "";
    let temp = this.first;
    while (temp != null) {
      res += `${temp.value}`;
      temp = temp.next;
    }
    return res;
  }
}

module.exports = Stack;