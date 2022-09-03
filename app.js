// Requirements
const mysql = require ("mysql2");
const inquirer = require ("inquirer");
const figlet = require ("figlet");
require("dotenv").config();
// const cTable = require ("console.table");

// Connect to mysql database
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(function (err) {
    if (err) throw err;
    console.log ("Office Database is Connected")
    trackerInit();
})

// Figlet renders EMPLOYEE TRACKER in ASCII art
figlet("EMPLOYEE TRACKER", function(err, res) {
    if (err) {
        console.log("That didn't work...");
        console.dir(err);
        return;
    }
    console.log(res)
});

function trackerInit() {
    inquirer.prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update a Role",
            "Update a Manager",
            "Delete Options",
            "Exit Database"
        ]
    }).then(function (answers)  {
        switch (answers.menu) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update a Role":
                updateRole();
                break;
            case "Update a Manager":
                updateManager();
                break;
            case "Delete Options":
                deleteOptions();
                break;   
            case "Exit Database":
                db.end();
        }
    });
};

// User options

// View Departments
function viewDepartments() {
    figlet("DEPARTMENTS", function(err, res) {
        if (err) {
            console.log("That didn't work...");
            console.dir(err);
            return;
        }
        console.log(res)
    });

    const query = ("SELECT * FROM department");
    db.query(query, function (err, res) {
        console.table(res);
        trackerInit();
    });
};

// View Roles
function viewRoles() {
    figlet("ROLES", function(err, res) {
        if (err) {
            console.log("That didn't work...");
            console.dir(err);
            return;
        }
        console.log(res)
    });

    const query = ("SELECT * FROM role");
    db.query(query, function (err, res) {
        console.table(res);
        trackerInit();
    });
};

// View Employees
function viewEmployees() {
    figlet("EMPLOYEES", function(err, res) {
        if (err) {
            console.log("That didn't work...");
            console.dir(err);
            return;
        }
        console.log(res)
    });

    const query = ("SELECT * FROM employee");
    db.query(query, function (err, res) {
        console.table(res);
        trackerInit();
    });
};

// Add a Department
function addDepartment() {
    figlet("ADD A DEPARTMENT", function(err, res) {
        if (err) {
            console.log("That didn't work...");
            console.dir(err);
            return;
        }
        console.log(res)
    });

    inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "What is the name of the new department?"
        },
    )
    .then(res => {
        db.query("INSERT INTO department SET ?", { name: res.department}, (err, res) => {
            if (err) throw err;
            console.log("Your department has been successfully added")
            trackerInit();
        });
    });
}

function addRole() {
    figlet("ADD A ROLE", function(err, res) {
        if (err) {
            console.log("That didn't work...");
            console.dir(err);
            return;
        }
        console.log(res)
    });

    inquirer.prompt ([
        {
            type: "input",
            message: "Please enter the title of this new role",
            name: "role"
        },
        {
            type: "number",
            message: "Please enter the salary for this new role",
            name: "salary"
        },
        {
            type: "number",
            messages: "Please enter the ID number for this new role",
            name: "dept_id"
        }
    ])
    .then(res => {
        db.query("INSERT INTO role (title, salary, department_id) values (?,?,?)", [res.role, res.salary, res.dept_id], (err, res) => {
            if (err) throw err;
            console.log("This role has been added");
            trackerInit()
        }) 
    });
};
