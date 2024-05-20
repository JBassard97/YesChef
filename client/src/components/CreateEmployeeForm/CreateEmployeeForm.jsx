import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_EMPLOYEE } from "../../utils/mutations";
import "./CreateEmployeeForm.css";

const CreateEmployeeForm = () => {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    phone: "",
    rate: "",
  });

  const [createEmployee, { data, loading, error }] =
    useMutation(CREATE_EMPLOYEE);

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
      await createEmployee({ variables: { input: formState } });
      // Optionally reset form or give feedback to user
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
    <form className="create-employee-form" onSubmit={handleSubmit}>
      <h5>Create Employee</h5>
      <div className="form-columns">
        <div className="form-colums-1">
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
            <p>Rate($):</p>
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
      <button type="submit">Create Employee</button>
    </form>
  );
};

export default CreateEmployeeForm;
