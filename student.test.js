const LinkedList = require('./LinkedList');  // Import LinkedList class
const Student = require('./Student');        // Import Student class
const fs = require('fs');

// Helper to create mock students
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
  linkedList = new LinkedList();
});

// Test adding and displaying students
test('Adding and displaying students', () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student));

  expect(linkedList.displayStudents()).toBe('AliceJohnson, BobSmith, CharlieBrown');
  expect(linkedList.length).toBe(3);
});

// Test filtering students by specialization
test('Filtering by specialization', () => {
  const students = createMockStudents();
  students[2].setSpecialization('computerScience'); // Change Charlie's specialization to match Alice
  students.forEach(student => linkedList.addStudent(student));

  const filtered = linkedList.filterBySpecialization('computerScience');
  expect(filtered.length).toBe(2);
  expect(filtered.map(student => student.getName())).toEqual(['AliceJohnson', 'CharlieBrown']);
});

// Test saving and loading from JSON
test('Saving and loading from JSON', async () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student));

  const fileName = 'test_students.json';
  await linkedList.saveToJson(fileName);

  const newLinkedList = new LinkedList();
  await newLinkedList.loadFromJSON(fileName);

  expect(newLinkedList.displayStudents()).toBe('AliceJohnson, BobSmith, CharlieBrown');
  expect(newLinkedList.length).toBe(3);

  await fs.promises.unlink(fileName); // Clean up
});

// Test finding a student by email
test('Finding a student by email', () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student));

  const foundStudent = linkedList.findStudent('bob@example.com');
  expect(foundStudent).not.toBe(-1);
  expect(foundStudent.getName()).toBe('BobSmith');

  const notFound = linkedList.findStudent('nonexistent@example.com');
  expect(notFound).toBe(-1);
});

// Test removing a student by email
test('Removing a student by email', () => {
  const students = createMockStudents();
  students.forEach(student => linkedList.addStudent(student));

  linkedList.removeStudent('bob@example.com');
  expect(linkedList.displayStudents()).toBe('AliceJohnson, CharlieBrown');
  expect(linkedList.length).toBe(2);

  linkedList.removeStudent('alice@example.com');
  expect(linkedList.displayStudents()).toBe('CharlieBrown');
  expect(linkedList.length).toBe(1);
});
