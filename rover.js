const Message = require("./message");

class Rover {
   constructor(position, generatorWatts = 110) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = generatorWatts;
   }
 
   receiveMessage(message){
      const results = [];
      
      for (const command of message.commands) {
         results.push(this.executeCommand(command));
       }
   
       return {
         message: message.name,
         results: results
       };
     }
   
     executeCommand(command) {
       switch (command.commandType) {
         case 'MOVE':
           return this.executeMoveCommand(command);
         case 'STATUS_CHECK':
           return this.executeStatusCheckCommand();
         case 'MODE_CHANGE':
           return this.executeModeChangeCommand(command);
         default:
           return { completed: false, error: 'Unknown command type' };
       }
     }
   
     executeMoveCommand(command) {
       if (this.mode === 'LOW_POWER') {
         return { completed: false };
       }
   
       this.position = command.value;
       return { completed: true };
     }
   
     executeStatusCheckCommand() {
       return {
         completed: true,
         roverStatus: {
           mode: this.mode,
           generatorWatts: this.generatorWatts,
           position: this.position
         }
       };
     }
   
     executeModeChangeCommand(command) {
       this.mode = command.value;
       return { completed: true };
     }
   }
 
module.exports = Rover;
let rover = new Rover(100);
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
