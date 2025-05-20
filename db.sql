CREATE database IF NOT EXISTS EPMS;

USE EPMS;

CREATE TABLE DEPARTMENT (
    DepartementCode VARCHAR(255) PRIMARY KEY,
    DepartementName VARCHAR(255),
    glosssalary   VARCHAR(255)
);


CREATE TABLE EMPLOYEE (
    EmployeeNumber VARCHAR(255) PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Position VARCHAR(255),
    Address VARCHAR(255),
    Telephone VARCHAR(20),
    Gender VARCHAR(10),
    HiredDate DATE,
    DepartementCode VARCHAR(255),
    FOREIGN KEY (DepartementCode) REFERENCES DEPARTMENT(DepartementCode)
);

CREATE TABLE SALARY (
    EmployeeNumber VARCHAR(255),
    Month VARCHAR(255),
    GrossSalary DECIMAL(10, 2),
    TotalDeduction DECIMAL(10, 2),
    NetSalary DECIMAL(10, 2),
    PRIMARY KEY (EmployeeNumber),
    FOREIGN KEY (EmployeeNumber) REFERENCES EMPLOYEE(EmployeeNumber)
);

-- INSERT INTO DEPARTMENT (DepartementCode, DepartementName) VALUES
-- ('CW', 'Carwash'),
-- ('ST', 'Stock'),
-- ('MC', 'Mechanic'),
-- ('ADMS', 'Administration Staff');


-- INSERT INTO SALARY (EmployeeNumber, Month, GrossSalary, TotalDeduction, NetSalary) VALUES
-- ('1', 'January', 300000, 20000, 280000),  
-- ('2', 'January', 200000, 5000, 195000),    
-- ('3', 'January', 450000, 40000, 410000),
-- ('4', 'January', 600000, 70000, 530000);

