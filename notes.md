# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      | home.jsx           | _none_            | _none_         |
| Register new user<br/>(t@jwt.com, pw: test)         | register.jsx       | [POST] /api/auth  | INSERT INTO user (name, email, password) VALUES (?, ?, ?) <br/> INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)            |
| Login new user<br/>(t@jwt.com, pw: test)            | login.tsx          | [PUT] /api/auth   | INSERT INTO auth (token, userId) VALUES (?, ?) <br/> SELECT * FROM user WHERE email=? <br/> SELECT * FROM userRole WHERE userId=?           |
| Order pizza                                         | menu.tsx           | [GET] /api/order/menu <br/> [GET] /api/franchise [POST] /api/order            | INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date) VALUES (?, ?, ?, now()) <br/> INSERT INTO orderItem (orderId, menuId, description, price) VALUES (?, ?, ?, ?)      | 
| Verify pizza                                        | payment.tsx        | [POST] /api/order/verify |  SELECT id, franchiseId, storeId, date FROM dinerOrder WHERE dinerId=? LIMIT ${offset},${config.db.listPerPage} <br/> SELECT id, menuId, description, price FROM orderItem WHERE orderId=?         |
| View profile page                                   | dinerDashboard.tsx | _none_            | _none_       |
| View franchise<br/>(as diner)                       | franchiseDashboard.tsx | [GET] /api/franchise/5       | _none_              |
| Logout                                              | logout.tsx         | [DELETE] /api/auth | DELETE FROM auth WHERE token=?              |
| View About page                                     | about.tsx          | _none_            | _none_       |
| View History page                                   | history.tsx        | _none_            | _none_       |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) | login.tsx          | [PUT] /api/auth   | INSERT INTO auth (token, userId) VALUES (?, ?) <br/> SELECT * FROM user WHERE email=? <br/> SELECT * FROM userRole WHERE userId=?                  |
| View franchise<br/>(as franchisee)                  | franchiseDashboard.tsx | [GET] /api/franchise/3 | SELECT id, name FROM franchise <br/> SELECT id, name FROM store WHERE franchiseId=?            |
| Create a store                                      | createStore.tsx    | [POST] /api/franchise/1/store <br/> [GET] /api/franchise/3 | SELECT id, name FROM user WHERE email=? <br/> INSERT INTO franchise (name) VALUES (?) <br/> INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)              |
| Close a store                                       | closeStore.tsx     | [DELETE] /api/franchise/1/store/2 | DELETE FROM store WHERE franchiseId=? <br/> DELETE FROM userRole WHERE objectId=? <br/> DELETE FROM franchise WHERE id=?             |
| Login as admin<br/>(a@jwt.com, pw: admin)           | login.tsx          | [PUT] /api/auth   | INSERT INTO auth (token, userId) VALUES (?, ?) <br/> SELECT * FROM user WHERE email=? <br/> SELECT * FROM userRole WHERE userId=? |
| View Admin page                                     | adminDashboard.tsx | [GET] /api/franchise | SELECT objectId FROM userRole WHERE role='franchisee' AND userId=? <br/> SELECT id, name FROM franchise WHERE id in (${franchiseIds.join(',')})              |
| Create a franchise for t@jwt.com                    | createFranchise.tsx| [POST] /api/franchise   | INSERT INTO store (franchiseId, name) VALUES (?, ?)              |
| Close the franchise for t@jwt.com                   | closeFranchise.tsx | [DELETE] /api/franchise/2          |  DELETE FROM store WHERE franchiseId=? AND id=?            |
