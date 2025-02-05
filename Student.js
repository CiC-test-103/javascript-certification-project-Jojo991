// Student.js
class Student {
  // Private Fields
  #name               // String (fullname, no space in between)
  #year               // Number
  #email              // String
  #specialization     // String (must be written in camelCase)

  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Student instance
   * RETURNS:   None
   */
  constructor(name, year, email, specialization) {
    this.#name = name;
    this.#year = year;
    this.#email = email;
    this.#specialization = specialization;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student name (String)
   */
  getName() {
    return this.#name;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student year (Number)
   */
  getYear() {
    return this.#year;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student email (String)
   */
  getEmail() {
    return this.#email;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   The student specialization (String)
   */
  getSpecialization() {
    return this.#specialization;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   Student object as string
   */
  getString() {
    return `Name: ${this.#name}, Year: ${this.#year}, Email: ${this.#email}, Specialization: ${this.#specialization}`;
  }

  /**
   * REQUIRES:  The student's new email (String)
   * EFFECTS:   Modifies the student's email to match
   * RETURNS:   None
   */
  setEmail(newEmail) {
    this.#email = newEmail;
  }

  /**
   * REQUIRES:  The student's new specialization (String)
   * EFFECTS:   Modifies the student's specialization to match
   * RETURNS:   The student specialization (String)
   */
  setSpecialization(newSpecialization) {
    this.#specialization = newSpecialization;
  }
}

module.exports = { Student }


// LinkedList.js
const { Student } = require('./Student');

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object

  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    if (!(newStudent instanceof Student)) {
      throw new Error('Only instances of Student can be added');
    }

    const newNode = new Node(newStudent);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    let current = this.head;
    let studentNames = [];
    while (current !== null) {
      studentNames.push(current.data.getName());
      current = current.next;
    }
    return studentNames.join(', ');
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    if (!specialization || typeof specialization !== 'string') {
      throw new Error('Specialization must be a non-empty string');
    }

    let filteredStudents = [];
    let current = this.head;

    while (current !== null) {
      if (current.data.getSpecialization().toLowerCase() === specialization.toLowerCase()) {
        filteredStudents.push(current.data);
      }
      current = current.next;
    }
    
    return filteredStudents.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    const fs = require('fs');
    const studentData = [];
    
    let current = this.head;
    while (current !== null) {
      studentData.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      });
      current = current.next;
    }

    try {
      await fs.promises.writeFile(fileName, JSON.stringify(studentData, null, 2));
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   */
  async loadFromJSON(fileName) {
    const fs = require('fs');
    try {
      const data = await fs.promises.readFile(fileName, 'utf-8');
      const students = JSON.parse(data);
      this.clearStudents();
      students.forEach(studentData => {
        const student = new Student(studentData.name, studentData.year, studentData.email, studentData.specialization);
        this.addStudent(student);
      });
    } catch (error) {
      console.error('Error reading from file:', error);
    }
  }
}

module.exports = { LinkedList };


// student.test.js
const { LinkedList } = require('./LinkedList');
const { Student } = require('./Student');
const fs = require('fs');

let linkedList;

beforeEach(() => {
  linkedList = new LinkedList();
});

test('Adding and displaying students', () => {
  const student1 = new Student('AliceJohnson', 2022, 'alice@example.com', 'computerScience');
  const student2 = new Student('BobSmith', 2022, 'bob@example.com', 'mathematics');
  const student3 = new Student('CharlieBrown', 2023, 'charlie@example.com', 'computerScience');

  linkedList.addStudent(student1);
  linkedList.addStudent(student2);
  linkedList.addStudent(student3);

  const allStudents = linkedList.displayStudents();
  expect(allStudents).toEqual('AliceJohnson, BobSmith, CharlieBrown');
});

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

test('Saving and loading from JSON', () => {
  const student1 = new Student('AliceJohnson', 2022, 'alice@example.com', 'computerScience');
  const student2 = new Student('BobSmith', 2022, 'bob@example.com', 'mathematics');
  const student3 = new Student('CharlieBrown', 2023, 'charlie@example.com', 'computerScience');
});
  