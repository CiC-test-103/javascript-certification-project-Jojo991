// Student.js

// Student class with a constructor and getter methods
class Student {
  constructor(name, year, email, specialization) {
    this.name = name;
    this.year = year;
    this.email = email;
    this.specialization = specialization;
  }

  // Getter methods
  getName() {
    return this.name;
  }

  getYear() {
    return this.year;
  }

  getEmail() {
    return this.email;
  }

  getSpecialization() {
    return this.specialization;
  }
}

// Correct export syntax
module.exports = Student;  // EXPORTING ONLY ONCE, THIS IS CORRECT
