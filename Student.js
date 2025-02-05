// Student class to define the structure of a student
class Student {
  constructor(name, year, email, specialization) {
    this.name = name;
    this.year = year;
    this.email = email;
    this.specialization = specialization;
  }

  // Getter for the student's name
  getName() {
    return this.name;
  }

  // Setter for the student's specialization
  setSpecialization(specialization) {
    this.specialization = specialization;
  }

  // Getter for the student's specialization
  getSpecialization() {
    return this.specialization;
  }

  // Getter for the student's email
  getEmail() {
    return this.email;
  }
}

module.exports = Student;
