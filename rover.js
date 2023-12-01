class Rover {
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
   this.position = position;
   this.mode = mode;
   this.generatorWatts = generatorWatts;
   }
   receiveMessage(message) {
      let results = []; //init empty results array to store object
      message.commands.forEach((command) => {
         let result      //declare result, to make it available within if loops
         if(command.commandType === 'STATUS_CHECK') {
            result = {
               completed: true,
               roverStatus: {
                  position: this.position,
                  mode: this.mode,
                  generatorWatts: this.generatorWatts
               }
            };
         } else if(command.commandType === 'MODE_CHANGE') {
            //Loops to toggle this.mode. 2 possible values, so just need one conditional
            if(this.mode === 'NORMAL') {
               this.mode = 'LOW_POWER';
            } else {
               this.mode = 'NORMAL'
            }
            result = {
               completed: true,
               
            };

         } 
         results.push(result)       //push command into results array

      });
      return {
         message: message.name,
         results: results
      };

   }  
}

module.exports = Rover;