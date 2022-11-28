const readlineSync = require('readline-sync');

class Keyboard {
  static readString(msg) {
    var value = readlineSync.question(msg);

    return value;
  }

  static readNumber(msg) {
    var value = readlineSync.question(msg);
    return Number(value);
  }

  static readDate(msg) {
    let value = readlineSync.question(msg + "(dd/mm/aaaa): ");
    let dateParts = value.split("/");

    return  new Date(Number(dateParts[2]), Number(dateParts[1])-1, Number(dateParts[0]));
  }
}

module.exports = Keyboard;