const Command = require("./command");

class Message {
   constructor(name, commands) {
      this.name = name;
      if(!name){
         throw new Error("Name required")
      }
      this.name = name;
      this.commands = commands || [];
      }
      }
   

module.exports = Message;