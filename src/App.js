import { useState } from "react";
import "./App.css";
import AddEmployee from "./component/AddEmployee";
import { ListEmployee } from "./component/ListEmployee";
import { employeesKey } from "./utils/constant";
import { employeeValidationSchema, getEmployee, setLocalStorage } from "./utils/functions";

// Employee data stored in local storage
const initialEmployees = getEmployee();

// Validation schema for employee form
const employeeSchema = employeeValidationSchema();

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Save employees to local storage when updated
  setLocalStorage(employeesKey, JSON.stringify(employees))

  // Add new employee to list
  const addEmployee = (values, { resetForm }) => {
    const newEmployee = { id: Date.now(), ...values };
    setEmployees([...employees, newEmployee]);
    resetForm();
    setShowAddForm(false);
  };

  // Update selected employee in list
  const updateEmployee = (values, { resetForm }) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === selectedEmployee.id ? { ...employee, ...values } : employee
    );
    setEmployees(updatedEmployees);
    resetForm();
    setShowEditForm(false);
  };

  // Delete selected employee from list
  const deleteEmployee = () => {
    const updatedEmployees = employees.filter((employee) => employee.id !== selectedEmployee.id);
    setEmployees(updatedEmployees);
    setShowDeleteModal(false);
  };

  return (
    <div>
      {/* Add Employee button */}
      <button onClick={() => setShowAddForm(true)} className="add-employee-btn">Add Employee</button>

      {/* Add Employee form */}
      <AddEmployee
        showAddForm={showAddForm} 
        employeeSchema={employeeSchema} 
        addEmployee={addEmployee} 
        setShowAddForm={setShowAddForm} 
        showEditForm={showEditForm}
        selectedEmployee={selectedEmployee}
        updateEmployee={updateEmployee}
        setShowEditForm={setShowEditForm}
      />

      {/* Employee list */}
      <ListEmployee 
        employees={employees}
        setSelectedEmployee={setSelectedEmployee}
        setShowEditForm={setShowEditForm}
        setShowDeleteModal={setShowDeleteModal}
      />

      {/* Delete Employee modal */}
      {showDeleteModal && selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Employee</h2>
            <p>Are you sure you want to delete {selectedEmployee.name}?</p>
            <div>
              <button onClick={deleteEmployee}>OK</button>
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
