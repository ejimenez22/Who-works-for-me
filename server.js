const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table')
const util = require('util');

// List of actions to view Database
const viewAll = async () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Which would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Done!']
        }
    ])
    .then((answer) => {
        switch (answer.choice) {
            case 'View All Departments':
                viewDept();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDept();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee':
                updateEmployee();
                break;
            case 'Done!':
                connection.end();
                break;
        }
    })
}


// functions for selections
const viewDept = async () => {
    const query = 'SELECT * FROM department';

    connection.query(query, function (err, res) {
        if (err) throw err;
        const deptArray = []
        res.forEach(department => deptArray.push(department))
        console.table(deptArray)
        viewAll()
    })
}

viewAll()