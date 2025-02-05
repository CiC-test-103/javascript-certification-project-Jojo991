// LinkedList.js

// Import the Student class so we can use it when loading from JSON
const Student = require('./Student');

// Define the LinkedList class
class LinkedList {
  constructor() {
    this.head = null; // The head will point to the first element in the list
    this.length = 0; // Track the number of students in the list
  }

  // Method to add a student to the list
  addStudent(student) {
    const newNode = { student, next: null }; // Create a new node for the student

    // If the list is empty, set the head to the new node
    if (this.head === null) {
      this.head = newNode;
    } else {
      // Otherwise, traverse the list and append the new node at the end
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    // Increment the length of the list
    this.length++;
  }

  // Method to display all students in the list as a comma-separated string
  displayStudents() {
    let current = this.head;
    let studentsList = [];

    // Traverse the list and collect each student's name
    while (current) {
      studentsList.push(current.student.getName());
      current = current.next;
    }

    return studentsList.join(', '); // Return the students as a string
  }

  // Method to filter students by their specialization
  filterBySpecialization(specialization) {
    let current = this.head;
    const filteredStudents = [];

    // Traverse the list and collect students that match the specialization
    while (current) {
      if (current.student.getSpecialization() === specialization) {
        filteredStudents.push(current.student);
      }
      current = current.next;
    }

    return filteredStudents; // Return the filtered students
  }

  // Method to save the list of students to a JSON file
  async saveToJson(fileName) {
    const studentsData = [];
    let current = this.head;

    // Collect student data into an array
    while (current) {
      studentsData.push({
        name: current.student.getName(),
        year: current.student.year,
        email: current.student.getEmail(),
        specialization: current.student.getSpecialization(),
      });
      current = current.next;
    }

    // Write the data to a JSON file
    const fs = require('fs/promises');
    await fs.writeFile(fileName, JSON.stringify(studentsData, null, 2));
  }

  // Method to load students from a JSON file
  async loadFromJSON(fileName) {
    const fs = require('fs/promises');
    const data = await fs.readFile(fileName, 'utf-8');
    const studentsData = JSON.parse(data);

    // Add each student from the file to the list
    studentsData.forEach(studentData => {
      const student = new Student(  // Fix: Create Student instance
        studentData.name,
        studentData.year,
        studentData.email,
        studentData.specialization
      );
      this.addStudent(student);
    });
  }

  // Method to find a student by email
  findStudent(email) {
    let current = this.head;

    // Traverse the list and search for the student by email
    while (current) {
      if (current.student.getEmail() === email) {
        return current.student; // Return the student if found
      }
      current = current.next;
    }

    return -1; // Return -1 if the student is not found
  }

  // Method to remove a student by email
  removeStudent(email) {
    let current = this.head;
    let previous = null;

    // Traverse the list to find the student to remove
    while (current) {
      if (current.student.getEmail() === email) {
        // If the student is found, remove it from the list
        if (previous) {
          previous.next = current.next;
        } else {
          this.head = current.next; // If the student is at the head, update the head
        }

        this.length--; // Decrement the length of the list
        return; // Exit after removal
      }
      previous = current;
      current = current.next;
    }
  }
}

module.exports = LinkedList; // Export LinkedList class
