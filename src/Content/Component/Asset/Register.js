import React from "react";
import { useState, useEffect } from "react";
import "../Pages/Register.css";
import axios from "axios";
import OtpInput from "react-otp-input";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const initialValues = {
    Fullname: "",
    Email: "",
    Phonenumber: "",
    Address: "",
    Password: "",
    ConfirmPassword: "",
    Rating: "",
    RoleId: "1",
  };

  const [userValues, setuserValues] = useState(initialValues);
  const [SignUpErrors, setSignUpErrors] = useState({});
  const [isNotError, setNotError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [otp, setOtp] = useState("");
  const [oTPPin, setOTPPin] = useState("");
  const [oTPStatus, setOTPStatus] = useState(false);

  useEffect(() => {
    setOTPPin(randomNumber(1, 10));
  }, []);

  const OTPClick = async () => {
    setOTPStatus(true);
    setNotError(false);
    toast.success("OTP has been sent to your mail");

    var userData = {
      To: userValues.Email,
      Subject: "OTP Notification",
      Body: `Your  Otp Code for user signup to Tirupati Auto City is ${oTPPin}`,
    };

    const result = await axios.post(
      "https://localhost:7166/api/Tirupatiemail/sendemail",
      userData
    );

    if (result.status == 200) {
    }
  };

  const validateOTP = async (e) => {
    e.preventDefault();
    setSignUpErrors(validate(1, userValues));
  };

  function randomNumber(min, max) {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserValues({ ...userValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignUpErrors(validate(2, userValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(SignUpErrors).length === 0 && isSubmit) {
      postRegisterData();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isNotError) {
      OTPClick();
    }
  }, [isNotError]);

  const validate = (check, values) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.Fullname) {
      errors.Fullname = "Username is required!";
    } else if (!values.Email) {
      errors.Email = "Please Enter Email!";
    } else if (!emailPattern.test(values.Email)) {
      errors.Email = "Enter Valid Email";
    } else if (!values.Phonenumber) {
      errors.Phonenumber = "PhoneNumber is required!";
    } else if (values.Phonenumber.length != 10) {
      errors.Phonenumber = "PhoneNumber must be of 10 digit!";
    } else if (!values.Address) {
      errors.Address = "Address is required!";
    } else if (!values.Password) {
      errors.Password = "Password is required!";
    } else if (values.Password.length < 6) {
      errors.Password = "Password must be more than 4 characters";
    } else if (values.Password.length > 10) {
      errors.Password = "Password cannot exceed more than 10 characters";
    } else if (!values.ConfirmPassword) {
      errors.ConfirmPassword = "ConfirmPassword is required!";
    } else if (values.ConfirmPassword != values.ConfirmPassword) {
      errors.ConfirmPassword = "Password didnot matched";
    } else if (check == 1 && isNotError == false) {
      setNotError(true);
    }

    return errors;
  };

  const postRegisterData = async () => {
    if (otp != oTPPin) {
      toast.error("OTP didn't matched");
    } else {
      const result = await axios.post(
        "https://localhost:7166/api/UserSignUp/Registration",
        userValues
      );

      if (result.data[0].result == "OK") {
        toast.success("User Created Successfully");
        setIsSubmit(false);
        setuserValues(initialValues);
      } else if (result.data[0].result == "BAD") {
        toast.warning("This user is already Existed");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="app">
        <div className="container-register-page">
          <form>
            <h1>Sign Up Here</h1>

            <div className="forms">
              <div className="content">
                <div className="col-19">
                  <input
                    className="textbox-19"
                    type="text"
                    name="Fullname"
                    value={userValues.Fullname}
                    onChange={handleChange}
                    placeholder="FullName"
                  />
                  <p className="form-errors">{SignUpErrors.Fullname}</p>
                </div>

                <div className="col-19">
                  <input
                    className="textbox-19"
                    type="text"
                    name="Email"
                    value={userValues.Email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <p className="form-errors">{SignUpErrors.Email}</p>
                </div>
              </div>
              <div className="content">
                <div class="col-19">
                  <input
                    className="textbox-19"
                    type="text"
                    name="Phonenumber"
                    value={userValues.Phonenumber}
                    onChange={handleChange}
                    placeholder="PhoneNumber"
                  />
                  <p className="form-errors">{SignUpErrors.Phonenumber}</p>
    
                </div>

                <div class="col-19">
                  <input
                    className="textbox-19"
                    type="text"
                    name="Address"
                    value={userValues.Address}
                    onChange={handleChange}
                    placeholder="Zone,District,City"
                  />
                  <p className="form-errors">{SignUpErrors.Address}</p>
              
                </div>
              </div>

              <div className="content">
                <div class="col-19">
                  <input
                    className="textbox-19"
                    type="password"
                    name="Password"
                    value={userValues.Password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <p className="form-errors">{SignUpErrors.Password}</p>
                
                </div>

                <div class="col-19">
                  <input
                    className="textbox-19"
                    type="password"
                    name="ConfirmPassword"
                    value={userValues.ConfirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  <p className="form-errors">{SignUpErrors.ConfirmPassword}</p>
        
                </div>
              </div>

              <button className="button-24" role="button" onClick={validateOTP}>
                Send OTP
              </button>
            </div>

            {oTPStatus ? (
              <>
                <h4>Please enter OTP to verify</h4>
                <div className="box-Otp">
                  <OtpInput
                    className="otpInput"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <button class="button-24" role="button" onClick={handleSubmit}>
                  Submit
                </button>
              </>
            ) : null}
          </form>
          <div class="Login_link">
            Already have an Account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
