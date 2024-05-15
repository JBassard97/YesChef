import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Footer from "../../components/Footer/Footer";
import WelcomeHeader from "../../components/WelcomeHeader/WelcomeHeader";
import Auth from "../../utils/auth";
import "./Login.css";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <WelcomeHeader/>

      <main className="login-full">
        <h4 className="">Login</h4>
        <form className="login-form" onSubmit={handleFormSubmit}>
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

        <Link to="/signup">Don't have an account? Signup!</Link>
      </main>

      <Footer />
    </>
  );
};

export default Login;
