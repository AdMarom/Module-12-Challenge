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
inquirer.prompt()
.then((answers) => {

})
.catch((error) => {
    if(error) {
    } else {

    }
});
}
