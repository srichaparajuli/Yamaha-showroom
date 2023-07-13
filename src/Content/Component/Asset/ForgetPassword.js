import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/ForgetPassword.css";
import OtpInput from "react18-input-otp";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function ForgetPassword() {
  const initialValues = {
    Email: "",
    Password: "",
    ConfirmPassword: "",
  };
  const [userValues, setuserValues] = useState(initialValues);
  const [SignUpErrors, setSignUpErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [otp, setOtp] = useState("");
  const [oTPPin, setOTPPin] = useState("");
  const [oTPStatus, setOTPStatus] = useState(false);
  const [isNotError, setNotError] = useState(false);

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
      Body: `Your OTP Code for forget password to Tirupati Auto City is ${oTPPin}`,
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

  const postRegisterData = async () => {
    if (otp != oTPPin) {
      toast.error("OTP not matched");
    } else {
      // console.log(userValues);
      const result = await axios.post(
        "https://localhost:7166/api/ForgetPassword/UserForgetPassword",
        userValues
      );

      // console.log(result);

      if (result.data[0].result == "OK") {
        toast.success("Your password has been Reset Successfully");
        setIsSubmit(false);
        setuserValues(initialValues);
      } else if (result.data[0].result == "BAD") {
        toast.warning("Your password  Existed");
      }
    }
  };

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
  }, [SignUpErrors, userValues, isSubmit]);

  useEffect(() => {
    if (isNotError) {
      OTPClick();
    }
  }, [isNotError]);

  const validate = (check, values) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.Email) {
      errors.Email = "Please Enter the email-address!";
    } else if (!emailPattern.test(values.Email)) {
      errors.Email = "Enter Valid Email";
    } else if (check == 1 && isNotError == false) {
      setNotError(true);
    } else if (check == 2) {
      if (!values.Password) {
        errors.Password = "Password is required!";
      } else if (!values.ConfirmPassword) {
        errors.ConfirmPassword = "ConfirmPassword is required!";
      } else if (values.Password != values.ConfirmPassword) {
        errors.ConfirmPassword = "Password didnot matched";
      }
    }

    return errors;
  };

  return (
    <div>
      <ToastContainer />
      <div className="Forgetpassword">
        <div className="Forgetpasword-image">
          <img src="./images/Forgot password.png" className="" />
        </div>
        <form>
          <div className="Forgetpassword-box">
            <h1>Forget Password ?</h1>
            <p>Please enter the account that you want to reset the password.</p>
            <input
              type="text"
              // required
              placeholder="Enter your Email Address"
              name="Email"
              value={userValues.Email}
              onChange={handleChange}
            />
            <p className="form-errors">{SignUpErrors.Email}</p>

            <button className="optbutton" role="button" onClick={validateOTP}>
              Send OTP
            </button>
            {oTPStatus ? (
              <>
                <div className="digital-Otp">
                  <OtpInput
                    numInputs={6}
                    separator={<span>-</span>}
                    onChange={setOtp}
                    value={otp}
                  />
                </div>
                <div class="Recoverycontainer">
                  <input
                    type="text"
                    // required
                    placeholder="Enter Your Password"
                    name="Password"
                    value={userValues.Password}
                    onChange={handleChange}
                  />
                  <p className="form-errors">{SignUpErrors.Password}</p>
                  <input
                    type="password"
                    // required
                    id="psw"
                    placeholder="Enter Your Confirm Password"
                    name="ConfirmPassword"
                    value={userValues.ConfirmPassword}
                    onChange={handleChange}
                  />
                  <p className="form-errors">{SignUpErrors.ConfirmPassword}</p>

                  {/* <input type="submit" value="Submit"/> */}
                  {/* </form> */}
                </div>
                <button class="button-25" role="button" onClick={handleSubmit}>
                  Submit
                </button>
              </>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
