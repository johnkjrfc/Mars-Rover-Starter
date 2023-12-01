const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {

    let rover = new Rover('position');
    expect(rover.position).toBe('position');
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
});
describe("Rover receivedMessage method", function() {
  it("response returned by receiveMessage contains the name of the message", function() {
    
    let message = new Message('testMessage');
    let rover = new Rover(0);   
    let roverInput = rover.receiveMessage(message);
    expect(roverInput.message).toBe('testMessage'); 
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    
    let message = new Message('testMessage', [    //create message with 2 class objects 
      {commandType: 'Command1', value: 'Value1'},
      {commandType: 'Command2', value: 'Value2'}
    ]);
    let rover = new Rover(0);                     //create new Rover, then pass message to recieveMessage
    let roverInput = rover.receiveMessage(message);
    expect(roverInput.results).toHaveLength(2);   //checks what receiveMessage returns, verifing 2 objects are returned
  })
});
