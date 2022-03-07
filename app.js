const inquirer = require('inquirer');



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

promptUser()


