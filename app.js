// Requirements //
const mysql = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");
require("dotenv").config();
const cTable = require("console.table");

// Connect to mysql database //
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Office Database is Connected");
  trackerInit();
});

// Figlet renders EMPLOYEE TRACKER in ASCII art //
figlet("EMPLOYEE TRACKER", function (err, res) {
  if (err) {
    console.log("That didn't work...");
    console.dir(err);
    return;
  }
  console.log(res);
});

// Main Menu Function //
function trackerInit() {
  inquirer
    .prompt({
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
        "Exit Database",
      ],
    })
    .then(function (answers) {
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
}

// View Database options //

// View Departments //
function viewDepartments() {
  figlet("DEPARTMENTS", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  const query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    console.table(res);
    trackerInit();
  });
}

// View Roles //
function viewRoles() {
  figlet("ROLES", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  const query = "SELECT * FROM role";
  db.query(query, function (err, res) {
    console.table(res);
    trackerInit();
  });
}

// View Employees //
function viewEmployees() {
  figlet("EMPLOYEES", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  const query = "SELECT * FROM employee";
  db.query(query, function (err, res) {
    console.table(res);
    trackerInit();
  });
}

// Add to Database Options //

// Add a Department //
function addDepartment() {
  figlet("ADD A DEPARTMENT", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the new department?",
    })
    .then((res) => {
      db.query(
        "INSERT INTO department SET ?",
        { name: res.department },
        (err, res) => {
          if (err) throw err;
          console.log("Your department has been successfully added");
          trackerInit();
        }
      );
    });
}

// Add a Role //
function addRole() {
  figlet("ADD A ROLE", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the title of this new role",
        name: "role",
      },
      {
        type: "number",
        message: "Please enter the salary for this new role",
        name: "salary",
      },
      {
        type: "number",
        message: "Please enter the department ID for this new role",
        name: "dept_id",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) values (?,?,?)",
        [res.role, res.salary, res.dept_id],
        (err, res) => {
          if (err) throw err;
          console.log("This role has been added");
          trackerInit();
        }
      );
    });
}

// Add an Employee //
function addEmployee() {
  figlet("ADD AN EMPLOYEE", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the first name of the new employee",
        name: "first_name",
      },
      {
        type: "input",
        message: "Please enter the last name of the new employee",
        name: "last_name",
      },
      {
        type: "number",
        message: "Please enter the ID number for this new employee",
        name: "roleid",
      },
      {
        type: "number",
        message: "Please enter the ID of the manager for this new employee",
        name: "manager_id",
      },
    ])
    .then((res) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
        [res.first_name, res.last_name, res.roleid, res.manager_id],
        (err, res) => {
          if (err) throw err;
          console.log("This employee has been added");
          trackerInit();
        }
      );
    });
}

// Update Database Options //

// Update Role of an Employee //
function updateRole() {
  figlet("UPDATE ROLES", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  db.query('SELECT * FROM employee', (err, res) => {
    console.table(res);
  })
  inquirer.prompt([
    {
      type: "number",
      message: "Enter the ID number of the employee you want to update",
      name: "employee_id"
    },
    {
      type: "number",
      message: "Enter their new ID number",
      name: "roleId"
    }
  ]).then (res => {
    db.query("UPDATE employee SET role_id = ? WHERE id = ?", [res.roleId, res.employee_id], (err, res) => {
      if (err) throw err;
      console.log("Employee Role Has Been Updated")
      trackerInit()
    })
  })
};

// Update Manager //
function updateManager() {
  figlet("UPDATE MANAGER", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
  })
  inquirer.prompt([
    {
      type: "number",
      message: "Choose any employee number to update their manager",
      name: "employeeId"
    },
    {
      type: "number",
      message: "Assign the new manager ID number",
      name: "managerId"
    }
  ]).then(res => {
    db.query("UPDATE employee SET manager_id = ? WHERE id = ?", [res.managerId, res.employeeId],
    (err, res) => {
      if (err) throw err;
      console.log ("Employee has been assigned a new Manager");
      trackerInit();
    })
  })
}

// Delete from Database Options //

function deleteOptions() {
  figlet("REMOVE", function (err, res) {
    if (err) {
      console.log("That didn't work...");
      console.dir(err);
      return;
    }
    console.log(res);
  });

  inquirer.prompt([
    {
      type: "list",
      message: "Please choose which item you would like to remove from the database",
      choices: ["Department", "Role", "Employee"],
      name: "delete_choice"
    },
  ]).then (res => {
    if (res.delete_choice === "Employee") {
      db.query("SELECT * FROM employee", (err, res) => {
        console.table(res);
        inquirer.prompt([
          {
            type: "number",
            message: "Choose the employee ID number you want to remove",
            name: "id_choice"
          }
        ]).then (res => {
          db.query("DELETE FROM employee WHERE id = ?", res.id_choice, (err, res) => {
            if (err) throw err;
            console.log ("Employee has been removed")
            trackerInit();
          })
        })
      }
      )} if (res.delete_choice === "Role") {
        db.query("SELECT * FROM role", (err, res) => {
          console.table(res);
          inquirer.prompt([
            {
              type: "number",
              message: "Please choose the role ID number you want to remove",
              name: "id_choice"
            }
          ]).then (res => {
            db.query("DELETE FROM role WHERE id = ?", res.id_choice, (err, res) => {
              if (err) throw err;
              console.log("Role has been removed")
              trackerInit();
            })
          })
        }
        )} if (res.delete_choice === "Department") {
          db.query("SELECT * FROM department", (err, res) => {
            console.table(res);
            inquirer.prompt([
              {
                type: "number",
                message: "Please choose the Department ID you want to remove",
                name: "id_choice"
              }
            ]).then (res => {
              db.query("DELETE FROM department WHERE id = ?", res.id_choice, (err, res) => {
                console.log("Department has been removed")
                trackerInit();
              })
            })
          })
        }
    })
  }
