import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./Signup.css";

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

  useEffect(() => {
    if (Auth.loggedIn()) {
      window.location = "/dashboard";
    }
  }, []);

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters from the phone number
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Apply phone number formatting (###) ###-####
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return cleaned;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: name === "phone" ? formatPhoneNumber(value) : value,
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
    <>
      <main className="signup-full">
        <h4 className="">Sign Up</h4>
        <form className="signup-form" onSubmit={handleFormSubmit}>
          <input
            className="w-50"
            placeholder="First Name"
            name="firstname"
            type="text"
            value={formState.firstname}
            onChange={handleChange}
          />
          <br />
          <input
            className="w-50"
            placeholder="Last Name"
            name="lastname"
            type="text"
            value={formState.lastname}
            onChange={handleChange}
          />
          <br />
          <input
            className="w-50"
            placeholder="Phone"
            name="phone"
            type="text"
            maxLength="10"
            value={formState.phone}
            onChange={handleChange}
          />
          <br />
          <input
            className="w-50"
            placeholder="Job Title"
            name="position"
            type="text"
            value={formState.position}
            onChange={handleChange}
          />
          <br />
          <input
            className="w-50"
            placeholder="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <br />
          <input
            className="w-50"
            placeholder="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <br />
          <button
            className="btn btn-block btn-primary"
            style={{
              cursor: "pointer",
            }}
            type="submit"
          >
            Submit
          </button>
        </form>

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}

        <Link to="/">Already have an account? Login!</Link>
      </main>
    </>
  );
};

export default Signup;
