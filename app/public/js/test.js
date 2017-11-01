function myModule() {
  this.hello = function() {
    console.log('hello!');
  }

  this.goodbye = function() {
    console.log('goodbye!');
  }
}

module.exports = myModule;