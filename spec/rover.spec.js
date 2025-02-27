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
  const message = new Message("Message"); 
    const rover = new Rover(55434); 
    const response = rover.receiveMessage(message);
    expect(response.message).toBe("Message");
  });

it ("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
  const commands = [
    new Command("MODE_CHANGE","LOW_POWER"),
    new Command("STATUS_CHECK"),
  ];

  const message = new Message("Message", commands);
   const rover = new Rover(55434); 
   const response = rover.receiveMessage(message);
   expect(response.results.length).toEqual(commands.length);
 });

  it("responds correctly to the status check command", () => {
    const commands = [new Command("STATUS_CHECK")];
    const message = new Message("Message", commands);
    const rover = new Rover(10); 
    const response = rover.receiveMessage(message);
    
    expect(response.results[0]).toHaveProperty("roverStatus");
    expect(response.results[0].roverStatus.mode).toBe("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(10);
  });

  it ("responds correctly to the mode change command", () => {
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    const message = new Message("Test mode change command", commands);

    const rover = new Rover(10);
    const response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBe(true);

    expect(rover.mode).toBe("LOW_POWER");
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    const commands = [new Command("MOVE", "LOW_POWER")];
    const message = new Message("Message", commands);
    const rover = new Rover(10); 
    rover.receiveMessage(
      new Message("Change mode to low power", [
        new Command("MODE_CHANGE", "LOW_POWER"),
      ])
    );

    const response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBe(false);

    expect(rover.position).toEqual(10);
  });

  it("responds with the position for the move command", () => {
    const commands = [new Command("MOVE", 55434)];

    const message = new Message("Message", commands);
    const rover = new Rover(10); 
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toEqual(55434);
  });



});




