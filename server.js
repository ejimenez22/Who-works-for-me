const inquirer = require('inquirer')
const db = require('./db/connection')
const cTable = require('console.table')
const util = require('util');
const { resolve } = require('path');

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
                db.end();
                break;
        }
    })
}


// functions for selections
const viewDept = async () => {
    const query = 'SELECT * FROM department';

    db.query(query, function (err, res) {
        if (err) throw err;
        const deptArray = []
        res.forEach(department => deptArray.push(department))
        console.table(deptArray)
        viewAll()
    })
}

const viewRoles = async () => {
    const query = 'SELECT * FROM role';

    db.query(query, function (err, res) {
        if (err) throw err;
        const roleArray = []
        res.forEach(role => roleArray.push(role))
        console.table(roleArray)
        viewAll()
    })
}

const viewEmployees = async () => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, "", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;';

    db.query(query, function (err, res) {
        if (err) throw err;
        const employeeArray = []
        res.forEach(employee => employeeArray.push(employee))
        console.table(employeeArray)
        viewAll()
    })
}

// functions for adding to databases
const addDept = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'What is the name of the department?'
        }
    ])
    .then(function (answer) {
        console.log(answer)
        db.query('INSERT INTO department SET ?', {
            name: answer.dept
        }, function (err){
            if (err) throw err;
        })
        viewAll();
    })
}

const addRole = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Whats is the salary for the role?'
        },
        {
            type: 'input',
            name: 'roleDept',
            message: 'Which department does the role belong too?'
        }
    ])
    .then(function (answers){
        console.log(answers)
        db.query('INSERT INTO role SET ?', {
            title: answers.newRole,
            salary: answers.salary,
            department_id: answers.roleDept
        })
        viewAll();
    })
}

const addEmployee = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'emRole',
            message: 'what is the employees role?'
        }, 
        {
            type: 'input',
            name: 'emMang',
            message: 'Who is the employees manager?'
        }
    ])
    .then(function (answers){
        console.log(answers)
        db.query('INSERT INTO employee SET ?', {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.emRole,
            manager_id: answers.emMang
        })
        viewAll();
    })
}

//function to update employee and role

const updateEmployee = async () => {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) {
            console.log(err)
        }
        else {
            const choices = rows.map(emName => ({name:emName.first_name, value:emName.id}))
            
            inquirer.prompt ([
                {
                    type: 'list',
                    name: 'employeeList',
                    message: 'Which employees role do you wish to update?',
                    choices
                }
            ])
            .then(function (choice){
                updateRole()
            })
        }
    })
    
}

const updateRole = async () => {
    db.query('SELECT * FROM role', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            const choices = rows.map(roleTitle => ({title:roleTitle.title, value:roleTitle.title}))
            inquirer.prompt ([
                {
                    type: 'list',
                    name: 'roleList',
                    message: 'Please select the employees new role.',
                    choices
                }
            ])
            .then(function (choice){
                console.log("The employees role has been updated!")
                role_id = choice.roleTitle
                viewAll()
            })
        }
    })
}
viewAll()