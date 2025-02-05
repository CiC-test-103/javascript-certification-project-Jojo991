const Student = require('./Student');  // Import the Student class

class Node {
  // Helper class to create each node in the linked list
  constructor(student) {
    this.student = student;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  
  // Method to add a student to the list
  addStudent(student) {
    if (!(student instanceof Student)) {
      throw new Error('Only instances of Student can be added'); // Ensure student is of type Student
    }

    const newNode = new Node(student);  // Create a new node with the student
    if (!this.head) {  // If the list is empty
      this.head = newNode;  // Set the new node as the head
      this.tail = newNode;  // Set the new node as the tail
    } else {  // If the list already has students
      this.tail.next = newNode;  // Link the last node to the new one
      this.tail = newNode;  // Update the tail to the new node
    }
  }

  // Method to display the names of all students in the list
  displayStudents() {
    let current = this.head;
    let studentNames = [];
    while (current !== null) {
      studentNames.push(current.student.getName());  // Assuming getName() method exists in Student class
      current = current.next;
    }
    return studentNames.join(', ');  // Join the names into a string
  }

  // Method to filter students by their specialization
  filterBySpecialization(specialization) {
    if (!specialization || typeof specialization !== 'string') {
      throw new Error('Specialization must be a non-empty string');
    }

    let filteredStudents = [];
    let current = this.head;

    while (current !== null) {
      // Ensure the student exists and specialization matches
      if (current.student && current.student.specialization && 
          current.student.specialization.toLowerCase() === specialization.toLowerCase()) {
        filteredStudents.push(current.student);
      }
      current = current.next;
    }
    
    return filteredStudents;  // Return the filtered students
  }

  // Method to save the student list to a JSON file
  saveToJSON(fileName) {
    const fs = require('fs');

    if (!fileName || typeof fileName !== 'string') {
      throw new Error('A valid file name must be provided');
    }

    let current = this.head;
    let studentData = [];

    while (current !== null) {
      studentData.push({
        name: current.student.name,
        year: current.student.year,
        email: current.student.email,
        specialization: current.student.specialization
      });
      current = current.next;
    }

    try {
      fs.writeFileSync(fileName, JSON.stringify(studentData, null, 2));
    } catch (error) {
      console.error('Error writing to file:', error);
    }
  }

  // Method to load the student list from a JSON file
  loadFromJSON(fileName) {
    const fs = require('fs');

    if (!fileName || typeof fileName !== 'string') {
      throw new Error('A valid file name must be provided');
    }

    try {
      const data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
      this.clearStudents();  // Clear existing students before loading new data

      data.forEach(studentData => {
        const student = new Student(studentData.name, studentData.year, studentData.email, studentData.specialization);
        this.addStudent(student);
      });
    } catch (error) {
      console.error('Error reading from file:', error);
    }
  }

  // Method to clear all students from the list
  clearStudents() {
    this.head = null;
    this.tail = null;
  }
}

module.exports = LinkedList;  // Export the LinkedList class for use in other files
