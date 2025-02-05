// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

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
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    if (!this.head) {
      return;
    }

    if (this.head.data.email === email) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.length--;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data.email !== email) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      if (!current.next) {
        this.tail = current;
      }
      this.length--;
    }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    let current = this.head;
    while (current !== null) {
      if (current.data.email === email) {
        return current.data;
      }
      current = current.next;
    }
    return -1;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  #clearStudents() {
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
      studentNames.push(current.data.getName());  // Assuming getName() method exists in Student class
      current = current.next;
    }
    return studentNames.join(', ');
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    let students = [];
    let current = this.head;
    while (current !== null) {
      students.push(current.data);
      current = current.next;
    }

    students.sort((a, b) => a.getName().localeCompare(b.getName()));
    return students;
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
      if (current.data.specialization && 
          current.data.specialization.toLowerCase() === specialization.toLowerCase()) {
        filteredStudents.push(current.data);
      }
      current = current.next;
    }

    return this.#sortStudentsByName(filteredStudents);
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    let filteredStudents = [];
    let current = this.head;
    while (current !== null) {
      if (current.data.age >= minAge) {
        filteredStudents.push(current.data);
      }
      current = current.next;
    }

    return this.#sortStudentsByName(filteredStudents);
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    const fs = require('fs');

    if (!fileName || typeof fileName !== 'string') {
      throw new Error('A valid file name must be provided');
    }

    let current = this.head;
    let studentData = [];

    while (current !== null) {
      studentData.push({
        name: current.data.name,
        year: current.data.year,
        email: current.data.email,
        specialization: current.data.specialization
      });
      current = current.next;
    }

    try {
      fs.writeFileSync(fileName, JSON.stringify(studentData, null, 2));
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    const fs = require('fs');

    if (!fileName || typeof fileName !== 'string') {
      throw new Error('A valid file name must be provided');
    }

    try {
      const data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
      this.#clearStudents();  // Clear existing students before loading new data

      data.forEach(studentData => {
        const student = new Student(studentData.name, studentData.year, studentData.email, studentData.specialization);
        this.addStudent(student);
      });
    } catch (error) {
      console.error('Error reading from file:', error);
    }
  }
}

module.exports = { LinkedList };