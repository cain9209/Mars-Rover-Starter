const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

});

describe("Command class", function() {

  it("constructor sets commandType", function() {
   const cmd1 = new Command('cmnd1','val1');
   expect(cmd1.commandType).toBe('cmnd1','val1')
  });

});

describe("Command class", function() {

  it("constructor sets a value passes in as the 2nd argument", function() {
    const cmd2 = new Command('cmnd2','val2');
   expect(cmd2.commandType).toBe('cmnd2','val2')
  });

});