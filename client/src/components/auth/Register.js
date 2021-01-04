import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;
  //   get alert context
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  // init auth context
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  // show error alerts
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error) {
      error.forEach((e) => setAlert(e.msg, "danger"));
    }
    clearErrors();

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  //   submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    if (name == "" || email == "" || password == "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  //   change fields handler
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="form-container">
      <h1>
        <span className="text-light">Account</span>{" "}
        <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={onChange} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm password"
          onChange={onChange}
        />
        <input
          type="submit"
          value="Register"
          className="btn btn-primary button-block"
        />
      </form>
    </div>
  );
};

export default Register;
