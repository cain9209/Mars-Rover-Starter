const Message = require("./message");

class Rover {
   constructor(position, generatorWatts = 110) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = generatorWatts;
   }
 
   receiveMessage(message){
      const results = [];

      for (const command of message.commands){
         let result = {};


         if (command.commandType === "STATUS CHECK"){
            result = this.updatedStatus();
         } else if (command.commandType === "MODE CHANGE"){
            result = this.updatedMode(command.value);
         } else if (command.commandType === "MOVE"){
            result = this.updatedMove(command.value);
         } else {
            result = {completed: false, error: 'Unkown command type'};
         }
         results.push(result);
      }
      return {
         message: message.name,
         results: results
      };
   }
    
   updatedStatus() {
      return {
        completed: true,
        roverStatus: {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        }
      };
    }
 
    updatedMode(newMode) {
      this.mode = newMode;
      return {completed: true};
    }
     updatedMove(newPosition) {
      if (this.mode === 'LOW_POWER') {
        return { completed: false, error: 'Cannot move in LOW_POWER mode' };
      }
      this.position = newPosition;
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