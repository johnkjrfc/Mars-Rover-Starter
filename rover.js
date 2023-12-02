class Rover {
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
   this.position = position;
   this.mode = mode;
   this.generatorWatts = generatorWatts;
   }
   receiveMessage(message) {
      let results = []; //init empty results array to store object
      
      message.commands.forEach((command) => {
         let result //declare result, to make it available within if loops     
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
            
            this.mode = command.value
            
            result = {
               completed: true,
               
            };
//Handles a MOVE commandType. Cannot move in low power. otherwise move rover 
         } else if(command.commandType === 'MOVE') {
            //console.log('before command', this.position, this.mode)  //**debug line */
            //first, do not allow rover to move if in low power
            if(this.mode === 'LOW_POWER') {
               result = {
                  completed: false,
               };
               //Otherwise, move rover, and mark completed true
            }else {
                  this.position = command.value;
                  result = {
                     completed: true,
                  };
            }
            //console.log('after command', this.position, this.mode)  //**debug line */
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