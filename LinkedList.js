// Importing the Student class correctly
const { Student } = require('./Student'); // Correct import
const fs = require('fs').promises;

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addStudent(newStudent) {
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

  removeStudent(email) {
    if (!this.head) return;

    if (this.head.data.getEmail() === email) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return;
    }

    let current = this.head;
    let prev = null;

    while (current) {
      if (current.data.getEmail() === email) {
        prev.next = current.next;
        if (!current.next) this.tail = prev;
        this.length--;
        return;
      }
      prev = current;
      current = current.next;
    }
  }

  findStudent(email) {
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data;
      }
      current = current.next;
    }
    return -1;
  }

  clearStudents() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  displayStudents() {
    const names = [];
    let current = this.head;
    while (current) {
      names.push(current.data.getName());
      current = current.next;
    }
    return names.join(', ');
  }

  filterBySpecialization(specialization) {
    const filtered = [];
    let current = this.head;
    while (current) {
      if (current.data.getSpecialization() === specialization) {
        filtered.push(current.data);
      }
      current = current.next;
    }
    return filtered.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  async saveToJson(fileName) {
    const students = [];
    let current = this.head;
    while (current) {
      students.push({
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization()
      });
      current = current.next;
    }
    await fs.writeFile(fileName, JSON.stringify(students, null, 2));
  }

  async loadFromJSON(fileName) {
    const data = await fs.readFile(fileName, 'utf8');
    const students = JSON.parse(data);
    this.clearStudents();
    for (const student of students) {
      this.addStudent(new Student(
        student.name,
        student.year,
        student.email,
        student.specialization
      ));
    }
  }
}

module.exports = { LinkedList }; // Correctly exporting the class
