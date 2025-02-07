// Student class with private fields and getter methods
class Student {
  // Private Fields
  #name;               // String (full name with no space in between)
  #year;               // Number
  #email;              // String
  #specialization;     // String (must be written in camelCase)

  constructor(name, year, email, specialization) {
    this.#name = name;
    this.#year = year;
    this.#email = email;
    this.#specialization = specialization;
  }

  getName() {
    return this.#name;
  }

  getYear() {
    return this.#year;
  }

  getEmail() {
    return this.#email;
  }

  getSpecialization() {
    return this.#specialization; 
  }

  getString() {
    return `Name: ${this.#name}, Year: ${this.#year}, Email: ${this.#email}, Specialization: ${this.#specialization}`;
  }

  setEmail(newEmail) {
    this.#email = newEmail;
  }

  setSpecialization(newSpecialization) {
    this.#specialization = newSpecialization;
  }
}

// Export the class using the correct syntax
module.exports = { Student };
