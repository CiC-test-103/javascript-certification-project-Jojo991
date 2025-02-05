// Import the full Student class (no destructuring)
const Student = require('./Student');  // Correct import without destructuring

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Add a student to the linked list
  addStudent(student) {
    const newNode = {
      student,
      next: null,
    };

    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  // Display all student names in the linked list
  displayStudents() {
    let current = this.head;
    let studentNames = [];
    while (current) {
      studentNames.push(current.student.getName());
      current = current.next;
    }
    return studentNames.join(', ');
  }

  // Filter students by specialization
  filterBySpecialization(specialization) {
    let current = this.head;
    let result = [];
    while (current) {
      if (current.student.getSpecialization() === specialization) {
        result.push(current.student);
      }
      current = current.next;
    }
    return result;
  }

  // Save students to a JSON file
  async saveToJson(fileName) {
    const fs = require('fs').promises;
    const studentsData = [];
    let current = this.head;
    while (current) {
      studentsData.push({
        name: current.student.getName(),
        year: current.student.year,
        email: current.student.getEmail(),
        specialization: current.student.getSpecialization(),
      });
      current = current.next;
    }

    await fs.writeFile(fileName, JSON.stringify(studentsData, null, 2));
  }

  // Load students from a JSON file
  async loadFromJSON(fileName) {
    const fs = require('fs').promises;
    const studentsData = JSON.parse(await fs.readFile(fileName, 'utf-8'));
    studentsData.forEach(studentData => {
      const student = new Student(
        studentData.name,
        studentData.year,
        studentData.email,
        studentData.specialization
      );
      this.addStudent(student);
    });
  }

  // Find a student by email
  findStudent(email) {
    let current = this.head;
    while (current) {
      if (current.student.getEmail() === email) {
        return current.student;
      }
      current = current.next;
    }
    return -1;  // Student not found
  }

  // Remove a student by email
  removeStudent(email) {
    if (this.head === null) return;

    if (this.head.student.getEmail() === email) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.student.getEmail() === email) {
        current.next = current.next.next;
        this.length--;
        return;
      }
      current = current.next;
    }
  }
}

module.exports = LinkedList;
