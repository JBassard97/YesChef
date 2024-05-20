import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_EMPLOYEE } from "../../utils/mutations";
import "./UpdateEmployeeForm.css";

const UpdateEmployeeForm = ({ employee }) => {
  const [formState, setFormState] = useState({
    firstname: employee.firstname || "",
    lastname: employee.lastname || "",
    email: employee.email || "",
    position: employee.position || "",
    phone: employee.phone || "",
    rate: employee.rate || "",
  });

  const [updateEmployee, { data, loading, error }] =
    useMutation(UPDATE_EMPLOYEE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateEmployee({
        variables: { id: employee._id, input: formState },
      });
      setFormState({
        firstname: "",
        lastname: "",
        email: "",
        position: "",
        phone: "",
        rate: "",
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <form className="update-employee-form" onSubmit={handleSubmit}>
      <h5>Update Employee</h5>
      <div className="form-columns">
        <div className="form-columns-1">
          <div className="form-input">
            <p>First Name:</p>
            <input
              name="firstname"
              value={formState.firstname}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-input">
            <p>Last Name:</p>
            <input
              name="lastname"
              value={formState.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="form-input">
            <p>Email:</p>
            <input
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="form-columns-2">
          <div className="form-input">
            <p>Title:</p>
            <input
              name="position"
              value={formState.position}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="form-input">
            <p>Phone:</p>
            <input
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
          </div>
          <div className="form-input">
            <p>Rate:</p>
            <input
              name="rate"
              value={formState.rate}
              onChange={handleChange}
              placeholder="Rate"
              required
            />
          </div>
        </div>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Employee"}
      </button>
      {data && <p>Employee updated successfully!</p>}
    </form>
  );
};

export default UpdateEmployeeForm;
