# Employee Management System Proposal
The project involves developing an employee management system that will allow an organization to manage information about its employees. The system will be designed to register, store, and manage key data related to employees, thereby facilitating decision-making and improving human resources management efficiency.

## Content
- [API](#api)
- [Tutorial](#tutorial)
  * [Employee List](#employee-list)
  * [Create New Employee](#create-new-employee)
  * [Edit Employee Details](#edit-employee-details)
  * [Delete Employee](#delete-employee)
  * [Filter and Pagination](#filter-and-pagination)
- [App Demonstration](#app-demonstration)

## API
For this proposal, there are only 5 basic endpoints to demonstrate the main functionalities of the system.

GET: deparment/list => get list of deparments.<br>
GET:employee/list => get list of employees.<br>
POST: employee/save => create a new employee.<br>
PUT: employee/update/{IdEmployee} => update desired employee details.<br>
DELETE: employee/delete/{IdEmployee} => delete desired employee.<br>

<p align="center">
	<img src="documentation_imgs/api_endpoints.png"  width="650" height="500">
</p>

## Tutorial
## Employee List
When the app is ready, you can see a list of recents employees.

<p align="center">
	<img src="documentation_imgs/employee_list.png"  width="650" height="500">
</p>

## Create New Employee
To add a new employee, click on the "New Employee" blue button, located at the top of the app. Then, start completing the fields:
<b>Full name, department, salary and contract date</b>

When fields are completed, the "Save" blue button will be able to save the new employee data. In case you want to close the window, click on the red button "Go back".

<p align="center">
	<img src="documentation_imgs/new_employee.png"  width="650" height="500">
</p>

## Edit Employee Details
Click on the employee's blue pencil icon from the list in order to edit all data related to the employee. You will be able to change the name, deparment, salary and contract date.
When finished, click on the "Update" blue button to save the new employee data. In case you want to close the window, click on the red button "Go back".

<p align="center">
	<img src="documentation_imgs/edit_employee.png"  width="650" height="500">
</p>

## Delete Employee
Click on the employee's red trash icon from the list in order to delete the selected employee. A message will appear, asking if you are sure to delete it.

## Filter and Pagination
Filter: You can search any employee by  id, name, department, salary or contract date. W
Pagination: When employee list gets bigger, you can change to other page in order to view more employees (this is bases in how many employees you want to display on the list).

<p align="center">
	<img src="documentation_imgs/employee_list.png"  width="650" height="500">
</p>

## App Demonstration
![angularCRUD](https://github.com/moralessIvann/net_angular/assets/42558181/26f572c9-effb-42d0-8641-0e1b45461443)

