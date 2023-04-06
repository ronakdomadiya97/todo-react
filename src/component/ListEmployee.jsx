export const ListEmployee = ({
    employees,
    setSelectedEmployee,
    setShowEditForm,
    setShowDeleteModal
}) => {
    return (
        employees?.length > 0 ? (
            <div className="employee-container">
              {employees.map((employee) => (
                <div className="employee-card" key={employee.id}>
                  <div className="employee-details">
                    <h2>{employee?.name}</h2>
                    <p>Email: {employee?.email}</p>
                    <p>Department: {employee?.department}</p>
                    <p>Gender: {employee?.gender}</p>
                    <p>Phone: {employee?.phone}</p>
                  </div>
                  <div className="employee-action">
                    <button 
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setShowEditForm(true);
                      }} className="edit-btn">Edit</button>
        
                    {/* Delete button */}
                    <button onClick={() => {
                      setSelectedEmployee(employee);
                      setShowDeleteModal(true);
                    }} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
        ) : (
        <div>No employees found</div>
        )
    )
}