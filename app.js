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

       if (choices.choices == 'Exit') {
           console.log("All complete! press control + C to exit.")

        }


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
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'Which department does this role belong to?'
        }
    ]).then (newRole => {
        let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
        
        db.query(sql, [newRole.role, newRole.salary, newRole.deptId], (err, res) => {
            if (err) throw err;
            console.log(`Added`, newRole.role, `to database`)
        })
        promptUser();
    })
};

const addEmployee = () => {
    inquirer.prompt ([
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
            name: 'empRole',
            message: 'What is this employees role?'
        }
    ]).then (newEmp => {
        let sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`;

        db.query(sql, [newEmp.firstName, newEmp.lastName, newEmp.empRole], (err, res) => {
            if (err) throw err;
            console.log(`Added`, newEmp.firstName, newEmp.lastName, `to the database`)
        })
        promptUser();
    })
}



promptUser()


