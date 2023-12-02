const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
//Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {

    let rover = new Rover('position');
    expect(rover.position).toBe('position');
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
});
//Test 8
describe("Rover receivedMessage method", function() {
  it("response returned by receiveMessage contains the name of the message", function() {
    
    let message = new Message('testMessage');
    let rover = new Rover(0);   
    let roverInput = rover.receiveMessage(message);
    expect(roverInput.message).toBe('testMessage'); 
  });
  //Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    
    let message = new Message('testMessage', [    //create message with 2 class objects 
      {commandType: 'Command1', value: 'Value1'},
      {commandType: 'Command2', value: 'Value2'}
    ]);
    let rover = new Rover(0);                     //create new Rover, then pass message to recieveMessage
    let roverInput = rover.receiveMessage(message);
    expect(roverInput.results).toHaveLength(2);   //checks what receiveMessage returns, verifing 2 objects are returned
    //??? I tried .length but it would not work properly 
  });
  //Test10
  it("responds correctly to the status check command", function() {
    let message = new Message('Status Check', [
      new Command('STATUS_CHECK')             //create new command with stat check command
    ]);
    let rover = new Rover(0);                      //create new rover
    let roverInput = rover.receiveMessage(message);   // pass rover the desired command
    let roverStatus = roverInput.results[0];             
      expect(roverStatus).toEqual({
        completed: true,
        roverStatus: {
          generatorWatts: 110,
          mode: 'NORMAL',
          position: 0
        }
        
      });
  });
  //Test11
  it("responds correctly to the mode change command", function(){
    let message = new Message('Mode Change', [
      new Command('MODE_CHANGE', 'LOW_POWER')        //create new command with mode change command
    ]);
    let rover = new Rover(0);                      //create new rover
    //console.log("before", rover.mode);
    let roverModeChange = rover.receiveMessage(message);   // pass rover the desired command
    //console.log("After", rover.mode);
    let modeChangeResults = roverModeChange.results[0];         //extract results recieveMessage
   // console.log(message.commands[0])
    expect(modeChangeResults).toEqual({
      completed: true,
    })
      //expect that rovers mode is low power
    expect(rover.mode).toEqual("LOW_POWER")
  });

  //Test12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    // create message and command  to move
    let message = new Message('Move', [
      new Command('MOVE', 2)
    ]);
    //create a rover who's mode is in low power, and send it the message/command, then declare var(s) for results
    let rover = new Rover (0,'LOW_POWER');
    let moveRover = rover.receiveMessage(message);
    let moveRoverResults = moveRover.results[0];
    //check that result is false AND rover position = 0
    expect(moveRoverResults).toEqual({
      completed: false,
    })
    expect(rover.position).toEqual(0)
  })
  //Test13
  //MOVE command will update the rover’s position with the position value in the command.
  it("responds with the position for the move command", function(){
    // create message and command  to move
    let message = new Message('Move', [
      new Command('MOVE', 2)
    ]);
    let rover = new Rover (0);
    let moveRover = rover.receiveMessage(message);
    let moveRoverResults = moveRover.results[0];
    //check that result is false AND rover position = 0
    expect(moveRoverResults).toEqual({
      completed: true,
    })
    expect(rover.position).toEqual(2)
  })

});
