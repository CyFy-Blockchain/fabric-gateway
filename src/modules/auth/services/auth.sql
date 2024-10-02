CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  encrypted_identity TEXT NOT NULL -- encrypted using password
);

CREATE TABLE admins (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(50),
  parent_dept_id INT, -- Allows hierarchical relationships between departments
  FOREIGN KEY (parent_dept_id) REFERENCES departments(id)
);

CREATE TABLE admins_departments_association (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  encrypted_dept_key TEXT NOT NULL,
  admin_id INT NOT NULL,
  dept_id INT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admins(id),
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);

CREATE TABLE users_departments_associations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  encrypted_user_key TEXT NOT NULL,
  user_id INT NOT NULL,
  dept_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);

INSERT INTO departments (dept_name, parent_dept_id) VALUES ('Admins', NULL); -- CEO oversees Admins
INSERT INTO departments (dept_name, parent_dept_id) VALUES ('Operations', 1); -- COO oversees Operations
INSERT INTO departments (dept_name, parent_dept_id) VALUES ('Finance', 1); -- CFO oversees Finance
INSERT INTO departments (dept_name, parent_dept_id) VALUES ('Marketing', 1); -- CMO oversees Marketing
INSERT INTO departments (dept_name, parent_dept_id) VALUES ('Audit', 3); -- Sub-department of Finance
INSERT INTO departments (dept_name, parent_dept_id) VALUES ('Sales', 4); -- Sub-department of Marketing

-- CEO
INSERT INTO users (username, encrypted_identity) VALUES ('CEO', 'enc_ceo');
-- COO
INSERT INTO users (username, encrypted_identity) VALUES ('COO', 'enc_coo');
-- CFO
INSERT INTO users (username, encrypted_identity) VALUES ('CFO', 'enc_cfo');
-- CMO
INSERT INTO users (username, encrypted_identity) VALUES ('CMO', 'enc_cmo');
-- Operations Manager
INSERT INTO users (username, encrypted_identity) VALUES ('Operations Manager', 'enc_op_manager');
-- Finance Manager
INSERT INTO users (username, encrypted_identity) VALUES ('Finance Manager', 'enc_fin_manager');
-- Audit Manager
INSERT INTO users (username, encrypted_identity) VALUES ('Audit Manager', 'enc_audit_manager');
-- Marketing Manager
INSERT INTO users (username, encrypted_identity) VALUES ('Marketing Manager', 'enc_marketing_manager');
-- Sales Manager
INSERT INTO users (username, encrypted_identity) VALUES ('Sales Manager', 'enc_sales_manager');
-- Team Lead (Operations)
INSERT INTO users (username, encrypted_identity) VALUES ('Team Lead (Operations)', 'enc_team_lead');
-- Senior Accountant
INSERT INTO users (username, encrypted_identity) VALUES ('Senior Accountant', 'enc_senior_accountant');
-- Junior Accountant
INSERT INTO users (username, encrypted_identity) VALUES ('Junior Accountant', 'enc_junior_accountant');
-- Internal Auditor
INSERT INTO users (username, encrypted_identity) VALUES ('Internal Auditor', 'enc_internal_auditor');
-- Brand Manager
INSERT INTO users (username, encrypted_identity) VALUES ('Brand Manager', 'enc_brand_manager');
-- Sales Representative
INSERT INTO users (username, encrypted_identity) VALUES ('Sales Representative', 'enc_sales_rep');

-- CEO Admin of Admins
INSERT INTO admins (user_id) VALUES (1); -- CEO becomes Admin
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('admins_CEO_enc_key', 1, 1);

-- COO Admin of Operations
INSERT INTO admins (user_id) VALUES (2); -- COO becomes Admin
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_op_coo', 2, 2);

-- CFO Admin of Finance
INSERT INTO admins (user_id) VALUES (3); -- CFO becomes Admin
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_fin_cfo', 3, 3);

-- CMO Admin of Marketing
INSERT INTO admins (user_id) VALUES (4); -- CMO becomes Admin
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_marketing_cmo', 4, 4);

-- Operations Manager as Sub-admin of Operations
INSERT INTO admins (user_id) VALUES (5);
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_op_manager', 5, 2);

-- Finance Manager as Sub-admin of Finance
INSERT INTO admins (user_id) VALUES (6);
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_fin_manager', 6, 3);

-- Audit Manager as Sub-admin of Audit
INSERT INTO admins (user_id) VALUES (7);
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_audit_manager', 7, 5);

-- Marketing Manager as Sub-admin of Marketing
INSERT INTO admins (user_id) VALUES (8);
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_marketing_manager', 8, 4);

-- Sales Manager as Sub-admin of Sales
INSERT INTO admins (user_id) VALUES (9);
INSERT INTO admins_departments_association (encrypted_dept_key, admin_id, dept_id) VALUES ('enc_sales_manager', 9, 6);

-- Team Lead (Operations)
INSERT INTO users_departments_associations (encrypted_user_key, user_id, dept_id) VALUES ('enc_op_team_lead', 10, 2);

-- Senior Accountant
INSERT INTO users_departments_associations (encrypted_user_key, user_id, dept_id) VALUES ('enc_fin_senior_accountant', 11, 3);

-- Junior Accountant
INSERT INTO users_departments_associations (encrypted_user_key, user_id, dept_id) VALUES ('enc_fin_junior_accountant', 12, 3);

-- Internal Auditor
INSERT INTO users_departments_associations (encrypted_user_key, user_id, dept_id) VALUES ('enc_audit_internal_auditor', 13, 5);

-- Brand Manager
INSERT INTO users_departments_associations (encrypted_user_key, user_id, dept_id) VALUES ('enc_marketing_brand_manager', 14, 4);

-- Sales Representative
INSERT INTO users_departments_associations (encrypted_user_key, user_id, dept_id) VALUES ('enc_sales_rep', 15, 6);


-- Queries:
SELECT depts.*, username
FROM users u JOIN users_departments_associations uda ON u.id=uda.user_id
  JOIN departments depts ON uda.dept_id=depts.id
WHERE username='Brand Manager';

SELECT depts.*, username
FROM users u JOIN admins_departments_association ada ON u.id=ada.admin_id
  JOIN departments depts ON ada.dept_id=depts.id
WHERE username='CEO';


WITH RECURSIVE dept_hierarchy AS (
    -- Start from the sub-department and work upwards
    SELECT d1.id AS dept_id, d1.dept_name, d1.parent_dept_id
    FROM departments d1
    WHERE d1.id = 6 -- Starting from the sub-department

    UNION ALL

    -- Recursively find the parent department
    SELECT d2.id, d2.dept_name, d2.parent_dept_id
    FROM departments d2
    INNER JOIN dept_hierarchy dh ON dh.parent_dept_id = d2.id
)
SELECT * FROM dept_hierarchy;

SELECT *
FROM admins_departments_association ada
WHERE ada.dept_id = 4 OR ada.dept_id = 1;