// student.test.js
const LinkedList = require('./LinkedList');  // Import LinkedList class
const Student = require('./Student');        // Import Student class
const fs = require('fs');

// Initialize a new LinkedList instance before each test
let linkedList;

beforeEach(() => {
  linkedList = new LinkedList();
});

// Test adding and displaying students
test('Adding and displaying students', () => {
  const student1 = new Student('AliceJohnson', 2022, 'alice@example.com', 'computerScience');
  const student2 = new Student('BobSmith', 2022, 'bob@example.com', 'mathematics');
  const student3 = new Student('CharlieBrown', 2023, 'charlie@example.com', 'computerScience');

  linkedList.addStudent(student1);
  linkedList.addStudent(student2);
  linkedList.addStudent(student3);

  const allStudents = linkedList.displayStudents();
  expect(allStudents).toEqual('AliceJohnson, BobSmith, CharlieBrown');  // Test the names of the students
});

// Test filtering students by specialization
test('Filtering by specialization', () => {
  const student1 = new Student('AliceJohnson', 2022, 'alice@example.com', 'computerScience');
  const student2 = new Student('BobSmith', 2022, 'bob@example.com', 'mathematics');
  const student3 = new Student('CharlieBrown', 2023, 'charlie@example.com', 'computerScience');

  linkedList.addStudent(student1);
  linkedList.addStudent(student2);
  linkedList.addStudent(student3);

  const filtered = linkedList.filterBySpecialization('computerScience');
  expect(filtered.length).toBe(2);
  expect(filtered.map(student => student.getName())).toEqual(['AliceJohnson', 'CharlieBrown']);
});

// Test saving and loading from JSON
test('Saving and loading from JSON', () => {
  const student1 = new Student('AliceJohnson', 2022, 'alice@example.com', 'computerScience');
  const student2 = new Student('BobSmith', 2022, 'bob@example.com', 'mathematics');
  const student3 = new Student('CharlieBrown', 2023, 'charlie@example.com', 'computerScience');

  linkedList.addStudent(student1);
  linkedList.addStudent(student2);
  linkedList.addStudent(student3);

  const fileName = 'students.json';
  linkedList.saveToJSON(fileName);

  // Create a new LinkedList to load from the saved file
  let newLinkedList = new LinkedList();
  newLinkedList.loadFromJSON(fileName);

  const allStudents = newLinkedList.displayStudents();
  expect(allStudents).toEqual('AliceJohnson, BobSmith, CharlieBrown');  // Check if the students are loaded correctly
  expect(newLinkedList.head).not.toBeNull();  // Ensure the list is not empty

  // Clean up: remove the test JSON file
  fs.unlinkSync(fileName);
});

// Additional tests for other methods (remove, find, etc.) can be added here as needed
