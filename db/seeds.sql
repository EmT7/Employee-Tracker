USE cms;

-- Department values
INSERT into department (id, name) VALUES (1, "Marketing");
INSERT into department (id, name) VALUES (2, "IT");
INSERT into department (id, name) VALUES (3, "Accounting");
INSERT into department (id, name) VALUES (4, "HR");
INSERT into department (id, name) VALUES (5, "Customer Service");


-- Role values
INSERT into role (id, title, salary, department_id) VALUES (1,"Customer Service Representative", 35000, 5);
INSERT into role (id, title, salary, department_id) VALUES (2, "IT Director", 85000, 2);
INSERT into role (id, title, salary, department_id) VALUES (3, "Social Media Specialist", 72000, 1);
INSERT into role (id, title, salary, department_id) VALUES (4, "Accounts Payable", 75000, 3);
INSERT into role (id, title, salary, department_id) VALUES (5, "Human Resources Assistant", 65000, 4);


-- Employee values
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Harry", "Potter", 2, 2);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (5, "Miranda", "Thompson", 3, 1);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (7, "Laci", "Carpenter", 1, null);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (10,"Kim", "Kardashian", 1, null);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (21, "Toby","Maguire",4,null);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (55, "Jacinda","Barrett",4,4);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (32, "Evangeline","Lilly",3, null);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (16, "Susan","Anthony", 4, null);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (77, "Molly","Williams", 5, null);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (13, "Diesel","VanPelt", 3,3);
INSERT into employee (id, first_name, last_name, role_id, manager_id) VALUES (2, "Bobby","Hanson",5,5);
