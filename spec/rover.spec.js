const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// 7 tests here!
describe("Rover classs", () => {
  
it ("constructor sets position and default values for mode and generatorWatts", () => {
const rover = new Rover(10)

expect(rover.position).toBe(10);
expect(rover.mode).toBe('NORMAL');
expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", () => {
  const message = new Message("Test message name"); 
    const rover = new Rover(98382); 
    const response = rover.receiveMessage(message);
    expect(response.message).toBe("Test message name");
  });

it ("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
  const commands = [
    new Command("MODE_CHANGE","LOW_POWER"),
    new Command("STATUS_CHECK"),
  ];

  const message = new Message("Test Message", commands);
   const rover = new Rover(98382); 
   const response = rover.receiveMessage(message);
   expect(response.results.length).toEqual(commands.length);
 });

  it("responds correctly to the status check command", () => {
    const commands = [new Command("STATUS_CHECK")];
    const message = new Message("Test message name", commands);
    const rover = new Rover(98382); 
    const response = rover.receiveMessage(message);
    
    expect(response.results[0]).toHaveProperty("roverStatus");
    expect(response.results[0].roverStatus.mode).toBe("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  });



});




