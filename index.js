const mysql = require('mysql2');
var inquirer = require('inquirer');
const cTable = require('console.table');

// This creates a connection to the database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'departments_db'
},
    console.log(`Connected to departments_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    menu();
})

//Connection query will go here. refer to https://www.npmjs.com/package/mysql2
//inquirer prompt questions refer to https://www.npmjs.com/package/inquirer/v/8.2.4

function menu() {
// Menu
    inquirer.prompt([
        {
            type: 'list',
            name: 'view_options',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        },
    ])


    // view departments
        .then((answers) => {
            if (answers.view_options === 'view all departments') {
                db.query(`SELECT * FROM department`,
                    function (err, results) {
                        console.table(results);
                        return menu();
                    })
        // view roles            
            } else if (answers.view_options === 'view all roles') {
                db.query(`SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id;`,
                    function (err, results) {
                        console.table(results);
                        return menu();
                    })
        // view employees            
            } else if (answers.view_options === 'view all employees') {
                db.query( `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS 'manager' FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;`,
                    function (err, results) {
                        console.table(results);
                        return menu();
                    })
            } else if (answers.view_options === 'add a department') {
                addDepartment();
            } else if (answers.view_options === 'add a role') {
                addRole();
            } else if (answers.view_options === 'add an employee') {
                addEmployee();
            } else {
                return updateRole();
            }
        });
};

// add department
function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        message: 'Please enter new department name',
        name: 'name'
    }])

        .then(answers => {
            console.log(answers)
            var newDepartment = `INSERT INTO department (name) VALUES ("${answers.name}")`;
            db.query(newDepartment, function (err, results) {
                if (err) throw err;
                console.log("New Department Added");
                menu();
            })
        })
};

// add role
function addRole() {
    db.query('SELECT * FROM department;', function (err, data) {
        let departmentData = data.map(department => {
            return {
                value: department.id,
                name: `${department.name}`
            }
        })

        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter role title',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Please enter role salary',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Please choose employee department',
                name: 'department',
                choices: departmentData
            }




        ]).then(answers => {
            console.log(answers)
            var newRole = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}" , "${answers.salary}" , "${answers.department}")`;
            db.query(newRole, function (err, results) {
                if (err) throw err;
                console.log("New Role Added");
                menu();
            })
        })
    })

};

function addEmployee() {

    db.query('SELECT * FROM employee', function (err, data) {
        let employeeData = data.map(employee => {
            return {
                value: employee.id,
                name: `${employee.first_name}, ${employee.last_name}`
            }
        })

        db.query('SELECT * FROM role', function (err, data) {
            let roleData = data.map(role => {
                return {
                    value: role.id,
                    name:`${role.title}`
                }
            })
        

        inquirer.prompt([

            {
                type: 'input',
                message: 'Please enter Employees First Name',
                name: 'first_name'
            },
            {
                type: 'input',
                message: 'Please enter Employees Last Name',
                name: 'last_name'

            },
            {
                type: 'list',
                message: 'Please choose employee role',
                name: 'role',
                choices: roleData
            },
            {
                type: 'list',
                message: 'Please choose manager',
                name: 'manager',
                choices: employeeData
            }



        ]).then(answers => {
            console.log(answers)
            var newRole = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}" , "${answers.last_name}" , "${answers.role}", "${answers.manager}")`;
            db.query(newRole, function (err, results) {
                if (err) throw err;
                console.log("New Employee Added");
                menu();
            })
        })
    })

})

};

// update employee role

function updateRole() {
    db.query('SELECT * FROM employee', function (err, data) {
        let employeeData = data.map(employee => {
            //console.log(employee)
            return {
                value: employee.id,
                name: `${employee.first_name}, ${employee.last_name}`
            }
            
        })

        // console.log(employeeData)

        db.query('SELECT * FROM role', function (err, data) {
            let roleData = data.map(role => {
                return {
                    value: role.id,
                    name:`${role.title}`
                }
            })   

        

        inquirer.prompt ([
            {
                type: 'list',
                message: 'Please choose employee',
                name: 'employee',
                choices: employeeData
            },
            {
                type: 'list',
                message: 'Please choose role',
                name: 'role',
                choices: roleData
            }

        ]).then(answers =>{
            console.log(answers.role)
            var updateRole = `UPDATE employee SET role_id = ${answers.role} WHERE id = ${answers.employee}`;
            db.query(updateRole, function (err, results) {
                if (err) throw err;
                console.log("Employee Role Updated");
                menu();
            })
        })
    })
})

}