const Command = require("./command");

class Message {
   constructor(name, commands) {
      this.name = name;
      if (!name) {
         throw Error('Name required')
      }
      
      this.commands = commands;
      

   }
   
   
   
   
   // Write code here!


}

module.exports = Message;