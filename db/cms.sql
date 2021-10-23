DROP DATABASE IF EXISTS cms;
CREATE database cms;
USE cms;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  name VARCHAR(50)
);