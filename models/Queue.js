class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class Queue{

  constructor(list) {
    this.first = null;
    if (list) {
      for (let itm of list) {
        this.add(itm);
      }
    }
  }

  add(data) {
    const node = new Node(data);
    if (!this.first)
      this.first = node;
    else {
      let temp = this.first;
      while (temp.next != null)
        temp = temp.next;
      temp.next = node;
    }
  }

  extract(){
    if(!this.first) return null;
    let aux = this.first;
    this.first = this.first.next;
    return aux.value;
  }

  get current(){
    return this.first.value;
  }

  get list() {
    let res = "";
    let temp = this.first;
    while (temp != null) {
      res += temp.value + ", ";
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

module.exports = Queue;