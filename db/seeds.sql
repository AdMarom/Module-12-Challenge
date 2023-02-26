INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
        ("Salesperson", 80000, 4),
        ("Lead Engineer", 150000, 1),
        ("Software Eningeer", 120000, 1);
;

INSERT INTO employee (first_name, last_name)
VALUES ("John", "Doe", 1, 24),
        ("Jane", "Doe", 2, 24),
        ("Thomas", "Jefferson", 3, 7),
        ("Jay", "Z", 4, 7);
