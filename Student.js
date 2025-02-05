// Student.js

// Define the Student class
class Student {
  constructor(name, year, email, specialization) {
    this.name = name;            // Student's name
    this.year = year;            // Student's year of study
    this.email = email;          // Student's email address
    this.specialization = specialization; // Student's area of study
  }

  // Getter method for the student's name
  getName() {
    return this.name;
  }

  // Getter method for the student's email
  getEmail() {
    return this.email;
  }

  // Getter method for the student's specialization
  getSpecialization() {
    return this.specialization;
  }

  // Setter method to update the student's specialization
  setSpecialization(specialization) {
    this.specialization = specialization;
  }
}

module.exports = Student; // Export the Student class
