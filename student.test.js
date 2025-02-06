// student.test.js

// Correct import of the Student class
const Student = require('./Student');
const LinkedList = require('./LinkedList');

describe('LinkedList tests', () => {
  it('should add and find a student in the list', () => {
    const student1 = new Student('John Doe', 'Sophomore', 'johndoe@example.com', 'Computer Science');
    const student2 = new Student('Jane Smith', 'Freshman', 'janesmith@example.com', 'Engineering');
    
    const list = new LinkedList();
    list.add(student1);
    list.add(student2);

    // Test if the students are found correctly
    expect(list.find('John Doe')).toEqual(student1);
    expect(list.find('Jane Smith')).toEqual(student2);
    expect(list.find('Nonexistent Student')).toBeNull();
  });
});
