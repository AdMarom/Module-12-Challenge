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

db.connect(function(err){
    if(err)throw err;
    menu();
})

//Connection query will go here. refer to https://www.npmjs.com/package/mysql2
//inquirer prompt questions refer to https://www.npmjs.com/package/inquirer/v/8.2.4

function menu() {

inquirer.prompt( [
    {
        type: 'list',
        name: 'view_options',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles','view all employees','add a department','add a role', 'add an employee','update an employee role'],
    },
])
.then((answers) => {
    if(answers.view_options === 'view all departments') {
       db.query(`SELECT * FROM department`,
       function(err, results) {
        console.table(results);
        return menu();
       })
    } else if (answers.view_options === 'view all roles') {
        db.query(`SELECT * FROM role`,
         function(err, results) {
        console.table(results);
        return menu();
       })
    } else { (answers.view_options === 'view all employees')
        db.query(`SELECT * FROM employee`,
         function(err, results) {
        console.table(results);
        return menu();
       })
    };


});
// .catch((error) => {
//     if(error) {
//     } else {

//     }
// });
 }
