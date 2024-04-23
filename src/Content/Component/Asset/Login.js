import React, { useState, useEffect, useContext } from "react";
import "../Pages/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../Context/LoginContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const initialValues = { PhoneNumber: "", Password: "", RoleId: "1" };
  const [userValues, setuserValues] = useState(initialValues);
  const [loginErrors, setloginErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserValues({ ...userValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloginErrors(validate(userValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(loginErrors).length === 0 && isSubmit) {
      postLoginData();
    }
  }, [loginErrors]);
  const validate = (values) => {
    const errors = {};
    if (!values.PhoneNumber) {
      errors.PhoneNumber = "PhoneNumber is required!";
    } else if (values.PhoneNumber.length != 10) {
      errors.PhoneNumber = "PhoneNumber must be of 10 digit!";
    }

    if (!values.Password) {
      errors.Password = "Password is required";
    } else if (values.Password.length < 6) {
      errors.Password = "Password must be more than 4 characters";
    } else if (values.Password.length > 10) {
      errors.Password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const postLoginData = async () => {
    const result = await axios.post(
      "https://localhost:7166/api/Login/UserLogin",
      userValues
    );
    console.log(result);
    if (result.data.length) {
      toast.success("Login Successfully");
      navigate("/");
      const obj = {
        URL: "https://localhost:7166",
        UserId: result.data[0].id,
        UserName: result.data[0].fullName,
        PhoneNumber: result.data[0].phoneNumber,
      };
      setLoginData(obj);
      localStorage.setItem("loginData", JSON.stringify(obj));
    } else {
      toast.error("Login Denied!");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="Login">
        <div className="center">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div class="txt_field">
              <label>PhoneNumber</label>

              <input
                type="text"
                name="PhoneNumber"
                value={userValues.PhoneNumber}
                onChange={handleChange}
              />

              <p className="errorlgin">{loginErrors.PhoneNumber}</p>
            </div>

            <div class="txt_field">
              <label>Password</label>
              <input
                type="password"
                name="Password"
                value={userValues.Password}
                onChange={handleChange}
              />

              <p className="errorlgin">{loginErrors.Password}</p>
            </div>

            <div class="pass">
              <a href="/ForgetPassword">Forgot Password?</a>
            </div>

            <input type="submit" value="Login" />
            <div class="signup_link">
              Not a member? <a href="/Register">Signup</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
