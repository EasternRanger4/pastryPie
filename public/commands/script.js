// Command mapping with custom commands
const commandMapping = {
    "hello": helloCommand,
    "date": dateCommand,
    "cls": clearCommand,
    "nus": newUser,
    "lls": linkServer,
    // Add more custom commands here
  };

  // Get input and output elements
  const commandInput = document.getElementById("commandInput");
  const outputArea = document.getElementById("outputArea");
  
  let commandHistory = []; // Store command history
  let commandIndex = 0; // Track current position in command history
  
  // Event listener for Enter key (execute command) and Up arrow key (command history)
  commandInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Check if Enter key is pressed
      event.preventDefault();
      const command = commandInput.value;
      processCommand(command);
      commandHistory.push(command); // Add command to history
      commandIndex = commandHistory.length; // Update command index
    } else if (event.keyCode === 38) { // Check if Up arrow key is pressed
      event.preventDefault();
      if (commandIndex > 0) {
        commandIndex--;
        commandInput.value = commandHistory[commandIndex]; // Populate input box
      }
    }
  });
  
  async function processCommand(command) {
    const args = command.split(" ");
    const commandName = args[0].toLowerCase();
  
    if (commandMapping.hasOwnProperty(commandName)) {
      const commandFunction = commandMapping[commandName];
      const output = await commandFunction(args); // Use async/await for linkServer
      displayOutput(output);
    } else {
      displayOutput("Command not found.");
    }
  
    commandInput.value = "";
  }
  
  // Display output in the output area
  async function displayOutput(output) {
    if (output instanceof Promise) {
      // If output is a Promise, wait for it to resolve and then display the result
      const result = await output;
      outputArea.innerHTML += "> " + result + "\n";
    } else {
      outputArea.innerHTML += "> " + output + "\n";
    }
  }
  
  
  // Custom command functions
  
  // Command: hello
  function helloCommand(args) {
    return "Hello, " + args[1] + "!";
  }
  
  // Command: date
  function dateCommand() {
    const currentDate = new Date();
    return currentDate.toDateString();
  }
  
  // Command: cls
  function clearCommand() {
    outputArea.innerHTML = "";
    return "Terminal cleared.";
  }
  
  // Command: lls
  async function newUser(args) {
    if (args[1] == undefined || args[2] == undefined) {
      const res = "Username or Password Undefined";
      return res;
    } else {
      const response = await fetch("/esLogin/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          username: args[1],
          password: args[2]
        }),
      });
      const data = await response.json();
      return "Terminal.";
    }
  }

  async function linkServer(args) {
    if (args[1] == undefined || args[2] == undefined) {
      const res = "Username or Password Undefined";
      return res;
    } else {
      const response = await fetch("/esLogin/checkPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          username: args[1],
          password: args[2]
        }),
      });
      const data = await response.json();
      if (data.message == true) {
        return "Loged In";
      } else if (data.message == false) {
        return "Incorect Password";
      }
    }
  }
  