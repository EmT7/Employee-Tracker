DROP DATABASE IF EXISTS cms;
CREATE database cms;
USE cms;

-- Department table
CREATE TABLE department (
  id INTEGER NOT NULL auto_increment,
  name VARCHAR(50),
  PRIMARY KEY (id)
);

-- Role table
CREATE TABLE role (
  id INTEGER NOT NULL auto_increment,
  title VARCHAR(50),
  salary DECIMAL,
  department_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Employee table
CREATE TABLE employee (
  id INTEGER NOT NULL auto_increment,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

