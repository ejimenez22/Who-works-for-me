INSERT INTO department (id, name)
VALUES
(1, 'Mangement'),
(2, 'Developers'),
(3, 'Maintenance');

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Executive Director', '200000.00', 1),
(2, 'Lead Developer', '150000.00', 2),
(3, 'Developer', '120000.00', 2),
(4, 'Tech Maintenance', '100000.00', 2),
(5, 'Janitorial Director', '25000.00', 3);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES
(1, 'Enrique', 'Jimenez', 1),
(2, 'Chris', 'Humphrey', 2),
(3, 'Joe', 'Gagliardo', 3),
(4, 'Tony', 'Sabatino', 3),
(5, 'Eric', 'Humphrey', 4),
(6, 'Jared', 'Humphrey', 5);