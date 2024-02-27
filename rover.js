const Message = require("./message");

class Rover {
   constructor(position, generatorWatts = 110) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = generatorWatts;
   }
 
   receiveMessage(message) {
      const results = [];
  
      for (const command of message.commands) {
        try {
          const result = this.executeCommand(command);
          results.push(result);
        } catch (error) {
          // Handle errors by returning an object with the error information
          results.push({ completed: false, error: error.message });
        }
      }
  
      return {
        message: message.name,
        results: results
      };
    }
  
    executeCommand(command) {
      try {
        // Attempt to execute the command
        if (command.commandType === 'MOVE') {
          return this.executeMoveCommand(command);
        } else if (command.commandType === 'STATUS_CHECK') {
          return this.executeStatusCheckCommand();
        } else if (command.commandType === 'MODE_CHANGE') {
          return this.executeModeChangeCommand(command);
        } else {
          throw new Error('Unknown command type');
        }
      } catch (error) {
        // Catch any errors specific to the command execution
        throw new Error(`Error executing ${command.commandType} command: ${error.message}`);
      }
    }
  
    executeMoveCommand(command) {
      if (this.mode === 'LOW_POWER') {
        throw new Error('Cannot move in LOW_POWER mode');
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

