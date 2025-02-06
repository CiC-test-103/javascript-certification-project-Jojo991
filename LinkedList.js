// LinkedList.js

// Importing the Student class correctly
const Student = require('./Student');  // CORRECT IMPORT

class LinkedList {
  constructor() {
    this.head = null; // Linked list head
  }

  // Add a Student to the linked list
  add(student) {
    const newNode = { student, next: null };
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  // Find a student by name
  find(name) {
    let current = this.head;
    while (current) {
      if (current.student.getName() === name) {
        return current.student;
      }
      current = current.next;
    }
    return null;  // Return null if student not found
  }
}

module.exports = LinkedList;  // Correctly exporting the class
