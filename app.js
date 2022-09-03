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
            "Delete Options"
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

    const query = ("SELECT * FROM departments");
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

    const query = ("SELECT * FROM roles");
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

    const query = ("SELECT * FROM employees");
    db.query(query, function (err, res) {
        console.table(res);
        trackerInit();
    });
};

