const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter", function(){
expect( function() { new Message();}).toThrow(new Error('Name required'));
        
    })

});

describe("Message class", function() {
    it("constructor sets name", function() {
        const name1 = new Message('name1','commands1');
        expect(name1.name).toBe('name1','commands1')
       });

});

describe("Message class", function() {
    it("contains a command array passed into the constructor as the 2nd argument", function(){
       const commands = [new Command('name2','command2'), new Command('name3','command3')]
       let message = new Message('Test message with two comands', commands)
    expect(message.commands) 
    })

});
