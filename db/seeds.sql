-- DEPARTMENT SEEDS --
INSERT INTO departments (id, name)
VALUES  (1, "CEO"),
        (2, "Regional Management"),
        (3, "Branch Management"),
        (4, "Sales"),
        (5, "Accounting"),
        (6, "Warehouse"),
        (7, "Human-Resources" );

-- ROLE SEEDS --
INSERT INTO roles (department_id, title, salary)
VALUES  (1, "CEO", 200000),
        (2, "Regional Manager", 150000),
        (3, "Branch Manager", 130000),
        (4, "Sales Lead", 100000),
        (4, "Sales Person", 90000),
        (4, "Sales Intern", 50000),
        (5, "Lead Accountant", 90000),
        (5, "Accountant", 80000),
        (6, "Warehouse Manager", 100000),
        (6, "Warehouse Worker", 70000 ),
        (7, "HR Head", 100000),
        (7, "HR Consultant", 90000);

-- EMPLOYEE SEEDS --
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("David", "Wallace", 1, null),
        ("Jan", "Levinson", 2,1),
        ("Michael", "Scott", 3, 2),
        ("Dwight", "Schrute", 4, 3),
        ("Jim", "Halpert", 4, 3),
        ("Pam", "Beasley", 4, 3),
        ("Andy", "Bernard", 4,3),
        ("Phyllis", "Vance", 4, 3),
        ("Stanley", "Hudson", 4, 3),
        ("Oscar", "Martinez", 5, 3),
        ("Angela", "Martin", 5, 3),
        ("Kevin", "Malone", 5, 3),
        ("Darryl", "Philbin", 6, 3),
        ("Roy", "Anderson", 6, 3),
        ("Toby", "Flenderson", 7, 3),
        ("Holly", "Flax", 7, 3);
