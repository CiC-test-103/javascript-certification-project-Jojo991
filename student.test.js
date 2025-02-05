// student.test.js
const LinkedList = require('./LinkedList');  // Import LinkedList class
const Student = require('./Student');        // Import Student class
const fs = require('fs');

// Helper function to create mock students
function createMockStudents() {
  return [
    new Student('AliceJohnson', 2, 'alice@example.com', 'computerScience'),
    new Student('BobSmith', 3, 'bob@example.com', 'Engineering'),
    new Student('CharlieBrown', 4, 'charlie@example.com', 'Mathematics'),
  ];
}

// Initialize a new LinkedList instance before each test
let linkedList;

beforeEach(() => {
  linkedList = new LinkedList(); // Create a new LinkedList instance before each test
});

// Test adding and displaying students
test('Adding and displaying students', () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student)); // Add students to the linked list

  // Check if the students are added correctly and display the list
  expect(linkedList.displayStudents()).toBe('AliceJohnson, BobSmith, CharlieBrown');
  expect(linkedList.length).toBe(3); // Ensure the length of the list is 3
});

// Test filtering students by specialization
test('Filtering by specialization', () => {
  const students = createMockStudents();
  students[2].setSpecialization('computerScience'); // Change Charlie's specialization to 'computerScience'
  students.forEach(student => linkedList.addStudent(student)); // Add all students to the linked list

  // Filter students by the 'computerScience' specialization
  const filtered = linkedList.filterBySpecialization('computerScience');
  
  // Check if the filter works as expected
  expect(filtered.length).toBe(2); // Expect 2 students with 'computerScience' specialization (Alice and Charlie)
  expect(filtered.map(student => student.getName())).toEqual(['AliceJohnson', 'CharlieBrown']);
});

// Test saving and loading from JSON
test('Saving and loading from JSON', async () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student)); // Add students to the linked list

  const fileName = 'test_students.json';
  await linkedList.saveToJson(fileName); // Save the list to a file

  // Create a new LinkedList instance and load data from the JSON file
  const newLinkedList = new LinkedList();
  await newLinkedList.loadFromJSON(fileName); // Load the students from the saved file

  // Verify the loaded list contains the same students
  expect(newLinkedList.displayStudents()).toBe('AliceJohnson, BobSmith, CharlieBrown');
  expect(newLinkedList.length).toBe(3);

  // Clean up the test file after testing
  await fs.promises.unlink(fileName); 
});

// Test finding a student by email
test('Finding a student by email', () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student)); // Add students to the linked list

  // Find student by email
  const foundStudent = linkedList.findStudent('bob@example.com');
  expect(foundStudent).not.toBe(-1); // Expect student to be found
  expect(foundStudent.getName()).toBe('BobSmith'); // Verify the found student's name

  const notFound = linkedList.findStudent('nonexistent@example.com');
  expect(notFound).toBe(-1); // Verify that a non-existent email returns -1
});

// Test removing a student by email
test('Removing a student by email', () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student)); // Add students to the linked list

  // Remove BobSmith by email and check the list after removal
  linkedList.removeStudent('bob@example.com');
  expect(linkedList.displayStudents()).toBe('AliceJohnson, CharlieBrown'); // Expect only Alice and Charlie to remain
  expect(linkedList.length).toBe(2); // Ensure the list length is updated to 2

  // Remove AliceJohnson by email and check the list after removal
  linkedList.removeStudent('alice@example.com');
  expect(linkedList.displayStudents()).toBe('CharlieBrown'); // Only Charlie should remain
  expect(linkedList.length).toBe(1); // Ensure the list length is updated to 1
});
