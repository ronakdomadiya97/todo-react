import { Formik, Form, Field, ErrorMessage } from "formik";

const AddEmployee = ({
    showAddForm,
    employeeSchema,
    addEmployee,
    setShowAddForm,
    showEditForm,
    selectedEmployee,
    updateEmployee,
    setShowEditForm
}) => {
    const initialEmployee = { 
        name: "", 
        email: "", 
        department: "", 
        gender: "", 
        phone: "" 
    }
    const isEdit = showEditForm && selectedEmployee
    return (
        (showAddForm || isEdit) && (
            <div className="modal">
                <div className="modal-content add-employee">
                <h2>{isEdit ? `Edit Employee` : `Add Employee` }</h2>
                <div>
                    <Formik 
                        initialValues={isEdit ? selectedEmployee : initialEmployee} 
                        validationSchema={employeeSchema} 
                        onSubmit={isEdit ? updateEmployee : addEmployee}
                    >
                    {({ isSubmitting }) => (
                        <Form>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="department">Department:</label>
                            <Field as="select" name="department">
                                <option value=""></option>
                                <option value="Engineering">Engineering</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                            </Field>
                            <ErrorMessage name="department" component="div" className="error" />
                        </div>

                        <div className="gender-wrapper">
                            <label htmlFor="gender">Gender:</label>
                            <div className="gender-radio">
                            <label className="gender-field">
                                <Field type="radio" name="gender" value="Male" />
                                Male
                            </label>
                            <label className="gender-field">
                                <Field type="radio" name="gender" value="Female" />
                                Female
                            </label>
                            </div>
                            <ErrorMessage name="gender" component="div" className="error" />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone:</label>
                            <Field type="tel" name="phone" />
                            <ErrorMessage name="phone" component="div" className="error" />
                        </div>

                        <div>
                            <button type="submit" disabled={isSubmitting}>
                            Save
                            </button>
                            <button type="button" onClick={() => {
                                if (isEdit) {
                                    setShowEditForm(false)
                                } else {
                                    setShowAddForm(false)
                                }
                            }}>
                            Cancel
                            </button>
                        </div>
                        </Form>
                    )}
                    </Formik>
                </div>
                </div>
            </div>
        )
    )
};

export default AddEmployee;