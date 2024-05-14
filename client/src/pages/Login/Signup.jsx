import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    position: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await createUser({
        variables: { input: formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="container mb-4">
      <div className="d-flex justify-content-center col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              {/* phone, position */}
              <input
                className="form-input w-50"
                placeholder="First Name"
                name="firstname"
                type="text"
                style={{
                  marginBottom: 15,
                }}
                value={formState.firstname}
                onChange={handleChange}
              />
              <br />
              <input
                className="form-input w-50"
                placeholder="Last Name"
                name="lastname"
                type="text"
                style={{
                  marginBottom: 15,
                }}
                value={formState.lastname}
                onChange={handleChange}
              />
              <br />
              {/* figure out phone number input here */}
              <input
                className="form-input w-50"
                placeholder="Phone"
                name="phone"
                type="text"
                style={{
                  marginBottom: 15,
                }}
                value={formState.phone}
                onChange={handleChange}
              />
              <br />
              <input
                className="form-input w-50"
                placeholder="Job Title"
                name="position"
                type="text"
                style={{
                  marginBottom: 15,
                }}
                value={formState.position}
                onChange={handleChange}
              />
              <br />
              <input
                className="form-input w-50"
                placeholder="Email"
                name="email"
                type="email"
                style={{
                  marginBottom: 15,
                }}
                value={formState.email}
                onChange={handleChange}
              />
              <br />
              <input
                className="form-input w-50"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <br />
              <button
                className="btn btn-block btn-lg btn-primary"
                style={{
                  cursor: "pointer",
                  marginTop: 25,
                }}
                type="submit"
              >
                Submit
              </button>
            </form>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
