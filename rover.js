class Rover {
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
   this.position = position;
   this.mode = mode;
   this.generatorWatts = generatorWatts;
   }
   receiveMessage(message) {
      let results = []; //init empty results array to store object
      message.commands.forEach(function(command) {
         let result = command;      //init variable to store individual commands from message
         results.push(result)       //push command into results array

      });
      return {
         message: message.name,
         results: results
      };

   }  
}

module.exports = Rover;