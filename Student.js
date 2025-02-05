// Student.js
class Student {
  // Constructor to initialize the student details
  constructor(name, year, email, specialization) {
    this.name = name;
    this.year = year;
    this.email = email;
    this.specialization = specialization;
  }

  // Getter method to fetch the student's name
  getName() {
    return this.name;
  }
}

module.exports = Student; // Export the class so it can be used in other files
