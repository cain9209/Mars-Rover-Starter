const Command = require("./command");

class Message {
   constructor(name, commands = []) {
      this.name = name;
      if(!name){
         throw Error("Name required")
      }
      this.commands = commands;
      if(!commands){
         throw Error("Invalid Input")
      }
      }
   }
let commands = [new Command('name2','command2'), new Command('name3','command3')]
let message = new Message('Test message with two comands', commands)
console.log(message.commands)
module.exports = Message;