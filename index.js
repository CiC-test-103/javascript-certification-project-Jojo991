// Necessary Imports
const readline = require('readline');
const { LinkedList } = require('./LinkedList');
const { Student } = require('./Student');
const fs = require('fs');

// Create a new LinkedList instance
const studentList = new LinkedList();

// Set up readline interface for command-line interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main function to handle the program's flow
function main() {
  console.log("Welcome to the Student Management System.");
  showAvailableCommands();
  rl.on('line', handleCommand);  // Now we are waiting for the user's command input
}

// Function to display the available commands to the user
function showAvailableCommands() {
  console.log("\nAvailable Commands:");
  console.log("1. add <name> <year> <email> <specialization> - Add a new student.");
  console.log("2. remove <email> - Remove a student by email.");
  console.log("3. find <email> - Find a student by email.");
  console.log("4. display - Display all students.");
  console.log("5. filterSpecialization <specialization> - Filter students by specialization.");
  console.log("6. filterAge <minAge> - Filter students by minimum age.");
  console.log("7. saveToFile <fileName> - Save all students to a file.");
  console.log("8. loadFromFile <fileName> - Load students from a file.");
  console.log("9. clear - Clear all students.");
  console.log("q - Quit the system.");
}

// Function to handle each command entered by the user
function handleCommand(command) {
  const args = command.trim().split(' ');  // Split input into command and arguments
  const operation = args[0];  // Get the operation name (first part of input)

  switch (operation) {
    case 'add':
      addStudent(args);
      break;
    case 'remove':
      removeStudent(args);
      break;
    case 'find':
      findStudent(args);
      break;
    case 'display':
      displayStudents();
      break;
    case 'filterSpecialization':
      filterSpecialization(args);
      break;
    case 'filterAge':
      filterAge(args);
      break;
    case 'saveToFile':
      saveToFile(args);
      break;
    case 'loadFromFile':
      loadFromFile(args);
      break;
    case 'clear':
      clearAll();
      break;
    case 'q':
      quitSystem();
      break;
    default:
      console.log("Invalid command. Please try again.");
      showAvailableCommands();
      break;
  }
}

// Add a new student to the system
function addStudent(args) {
  if (args.length !== 5) {
    console.log("Error: Invalid number of arguments. Usage: add <name> <year> <email> <specialization>");
    return;
  }

  const [name, year, email, specialization] = args.slice(1);
  const student = new Student(name, parseInt(year), email, specialization);

  studentList.addStudent(student);
  console.log(`Student ${name} added successfully.`);
}

// Remove a student by email
function removeStudent(args) {
  if (args.length !== 2) {
    console.log("Error: Invalid number of arguments. Usage: remove <email>");
    return;
  }

  const email = args[1];
  studentList.removeStudent(email);
  console.log(`Student with email ${email} removed successfully.`);
}

// Find a student by email
function findStudent(args) {
  if (args.length !== 2) {
    console.log("Error: Invalid number of arguments. Usage: find <email>");
    return;
  }

  const email = args[1];
  const student = studentList.findStudent(email);

  if (student === -1) {
    console.log("Student not found.");
  } else {
    console.log("Student Found:", student);
  }
}

// Display all students in the system
function displayStudents() {
  const students = studentList.displayStudents();
  if (students === "") {
    console.log("No students to display.");
  } else {
    console.log("All Students:", students);
  }
}

// Filter students by specialization
function filterSpecialization(args) {
  if (args.length !== 2) {
    console.log("Error: Invalid number of arguments. Usage: filterSpecialization <specialization>");
    return;
  }

  const specialization = args[1];
  const students = studentList.filterBySpecialization(specialization);

  if (students.length === 0) {
    console.log(`No students found with specialization: ${specialization}`);
  } else {
    console.log("Students with specialization", specialization, ":", students);
  }
}

// Filter students by minimum age
function filterAge(args) {
  if (args.length !== 2 || isNaN(args[1])) {
    console.log("Error: Invalid number of arguments. Usage: filterAge <minAge>");
    return;
  }

  const minAge = parseInt(args[1]);
  const students = studentList.filterByMinAge(minAge);

  if (students.length === 0) {
    console.log(`No students found with age >= ${minAge}`);
  } else {
    console.log("Students with age >= ", minAge, ":", students);
  }
}

// Save all students to a JSON file
function saveToFile(args) {
  if (args.length !== 2) {
    console.log("Error: Invalid number of arguments. Usage: saveToFile <fileName>");
    return;
  }

  const fileName = args[1];
  studentList.saveToJson(fileName);
  console.log(`All students saved to ${fileName}.`);
}

// Load students from a JSON file
function loadFromFile(args) {
  if (args.length !== 2) {
    console.log("Error: Invalid number of arguments. Usage: loadFromFile <fileName>");
    return;
  }

  const fileName = args[1];

  // Check if file exists
  if (!fs.existsSync(fileName)) {
    console.log(`Error: File ${fileName} does not exist.`);
    return;
  }

  studentList.loadFromJSON(fileName);
  console.log(`Students loaded from ${fileName}.`);
}

// Clear all students from the system
function clearAll() {
  studentList.clearStudents();
  console.log("All students have been cleared.");
}

// Quit the system
function quitSystem() {
  console.log("Exiting Student Management System...");
  rl.close(); // Close the readline interface
}

// Start the main function
main();
