const inquirer = require('inquirer');
const db = require('./db/connection')



const promptUser = () => {

    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select from the following',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])

    .then((choices) => {
       

        if (choices.choices == 'View all departments') {
            viewAllDepartments()
        }

        if (choices.choices == 'View all roles') {
            viewAllRoles()
        }

        if (choices.choices == 'View all employees') {
            viewAllEmployees()
        }

        if (choices.choices == 'Add a department') {
            addDepartment()
        }

        if (choices.choices == 'Add a role') {
           addRole()
        }

        if (choices.choices == 'Add an employee') {
            addEmployee()
        }

        if (choices.choices == 'Update an employee role') {
            updateRole()
        }

       // if (choices.choices == 'Exit') {

        //}


    })

};

const viewAllDepartments = () => {
    let sql = `SELECT * FROM department`;

    db.query(sql, (err , res) => {
        if (err) throw err;
        console.table(res)
    })

    promptUser();
};

const viewAllRoles = () => {
    let sql = `SELECT * FROM roles`;

    db.query(sql, (err , res) => {
        if (err) throw err;
        console.table(res)
    })

    promptUser();
};



const viewAllEmployees = () => {
    let sql = `SELECT * FROM employee`;

               db.query(sql, (err , res) => {
                   if (err) throw err;
                   console.table(res)
               })

    promptUser();
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the department ?'
        }
       
    ]).then (choices => {
        let sql = `INSERT INTO department (department_name) VALUES (?)`;
      

        db.query(sql, choices.deptName, (err, res) => {
            if (err) throw err;
            console.log(`Added`, choices.deptName, ' to databse')
        });
        promptUser();
    })
   
};

const addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'role',
            message: 'What is the new role ?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        }
    ]).then (newRole => {
        let sql = `INSERT INTO roles (roles_title, roles_salary) VALUES (?,?)`;
        const roles = [newRole.role, newRole.salary]
        db.query(sql, roles.role, (err, res) => {
            if (err) throw err;
            console.log(`Added`, newRole.role, `to database`)
        })
        promptUser();
    })
}



promptUser()


