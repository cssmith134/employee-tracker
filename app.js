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

const viewAllEmployees = () => {
    let sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.department_name AS 'department,
                role.salary
                FROM employee, role, department
                WHERE department.id = role.department_id
                AND role.id = employee.role_id
                ORDER BY employee.id ASC'
                `;

               db.query(sql, (err , res) => {
                   if (err) throw err;
                   console.table(res)
               })
};



promptUser()


