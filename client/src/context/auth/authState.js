import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import setToken from "../../utils/setToken";
import { set } from "mongoose";

const AuthState = (props) => {
  const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // load user

  // register user
  const register = async (formData) => {
    // add headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users/", formData, config);
      // on success
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      // load user
      loadUser();
    } catch (error) {
      // on fail
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.errors });
    }
  };
  // load user
  const loadUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_FAILED });
    }
  };
  // login user
  const login = async (formData) => {
    // add headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth/", formData, config);
      // on success
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      // load user
      loadUser();
    } catch (error) {
      // on fail
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.errors });
    }
  };

  // logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
