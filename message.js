const Command = require("./command");

class Message {
   constructor(name, commands = []) {
      this.name = name;
      if(!name){
         throw Error("Name required")
      }
      this.commands = commands;
      }
   }
let commands = [new Command('command1','command2'), new Command('command3')]
let message = new Message('Test message with two comands', commands)

console.log(message.name)
console.log(message.commands)
module.exports = Message;