import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  // auth context
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  //   set alert
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
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
    if (email == "" || password == "") {
      setAlert("Please enter all fields", "danger");
    } else {
      login({ email, password });
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
        <span className="text-primary">Log in</span>
      </h1>
      <form onSubmit={onSubmit}>
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
          type="submit"
          value="Log in "
          className="btn btn-primary button-block"
        />
      </form>
    </div>
  );
};

export default Login;
