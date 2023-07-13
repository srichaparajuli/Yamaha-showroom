import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../Pages/BookNow.css";
import { Link } from "react-router-dom";
import Khalti from "../Khalti/Khalti";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { LoginContext } from "../../../Context/LoginContext";
import { useNavigate } from "react-router-dom";

function BookNow() {
  const { loginData, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    fullname: "",
    email: "",
    phonenumber: "",
    address: "",
    productId: id,
    paymentType: "",
    userId: loginData.UserId,
    status: "",
    amount: 200,
  };

  const [productData, setproductData] = useState([]);
  const [loginErrors, setloginErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userValues, setuserValues] = useState(initialValues);
  const [checkbox, setCheckbox] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const handleMethodChange = (e) => {
    setPaymentType(e.target.value);
    setuserValues((prevFormData) => ({
      ...prevFormData,
      paymentType: e.target.value,
    }));

    if (e.target.value == "Cash") {
      setuserValues((prevFormData) => ({
        ...prevFormData,
        status: 0,
      }));
    }

    if (e.target.value == "Khalti") {
      setuserValues((prevFormData) => ({
        ...prevFormData,
        status: 1,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setloginErrors(validate(userValues));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserValues({ ...userValues, [name]: value });
  };

  const handleChangeCheckbox = (e) => {
    setCheckbox(!checkbox);
  };
  

  useEffect(() => {
    if (Object.keys(loginErrors).length === 0 && isSubmit) {
      postBookingData();
    }
    getProductData(id);
  }, [isSubmit, loginData, loginErrors]);



  const getProductData = async (id) => {
    const result = await axios.get(
      "https://localhost:7166/api/Addproduct/ProductgetbyId=" + id
    );
    console.log(result.data);
    setproductData(result.data);
  };

  const postBookingData = async () => {
    const result = await axios.post(
      "https://localhost:7166/api/Booking/UserBooking",
      userValues
    );
    console.log(result);
    navigate("/Motorcycle");
    if (result.data == 1) {
      toast.success("Booking details has been Sent Successfully");
      setIsSubmit(false);
      setuserValues(initialValues);
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.fullname) {
      errors.fullname = "Username is required!";
    } else if (!values.email) {
      errors.email = "Please Enter Email!";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Enter Valid Email";
    } else if (!values.phonenumber) {
      errors.phonenumber = "PhoneNumber is required!";
    } else if (values.phonenumber.length != 10) {
      errors.phonenumber = "PhoneNumber must be of 10 digit!";
    } else if (!values.address) {
      errors.address = "Address is required!";
    }

    if (checkbox == false) {
      alert("termfssdfdsaf");
    }
    if (!values.paymentType) {
      errors.paymentType = "Choose your paymentType !";
    }

    return errors;
  };

  return (
    <div>
      <ToastContainer />
      <div class="testcontainer">
        <div class="book">
          <div class="description">
            <h1>
              Online <strong>Booking FORM</strong>
            </h1>
            <div class="quote">
              <img src="/images/Booking.png" className="" />
            </div>
            {checkbox ? (
              <>
                <h3>Payment Method</h3>
                <h4>
                  <i>Choose Your Payment Method</i>
                </h4>
                <div className="radio-button">
                  <input
                    type="radio"
                    name="radiobutton"
                    value="Cash"
                    className="radio"
                    checked={paymentType === "Cash"}
                    onChange={handleMethodChange}
                  />
                  <p>Cash</p>
                </div>
                {paymentType === "Cash" && <p className="pay"></p>}
                <div className="payment-method">
                  <div className="radio-button">
                    <input
                      type="radio"
                      value={"Khalti"}
                      checked={paymentType === "Khalti"}
                      onChange={handleMethodChange}
                      name="Khalti"
                    />
                    <p>Khalti</p>
                  </div>
                  {paymentType === "Khalti" && (
                    <p className="pay">
                      {" "}
                      <div className="khalti-acc ms-3">
                        <Khalti
                          shippingData={userValues}
                          class="btn btn-success"
                          name="radiobutton"
                        />
                      </div>
                    </p>
                  )}
                </div>

                <button
                  className="button-29"
                  role="button"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>
              </>
            ) : null}
          </div>

          <div className="form-Book">
            <h3>PERSONAL DETAILS</h3>
            <div className="inputfield">
              <label>Full Name:</label>
              <p className="Booking-errors">{loginErrors.fullname}</p>
              <input
                type="text"
                className="input"
                name="fullname"
                value={userValues.fullname}
                onChange={handleChange}
              />
            </div>

            <div className="inputfield">
              <label>Email Address:</label>
              <p className="Booking-errors">{loginErrors.email}</p>

              <input
                type="text"
                className="input"
                name="email"
                value={userValues.email}
                onChange={handleChange}
              />
            </div>

            <div className="inputfield">
              <label>Phone Number:</label>
              <p className="Booking-errors">{loginErrors.phonenumber}</p>
              <input
                type="text"
                className="input"
                name="phonenumber"
                value={userValues.phonenumber}
                onChange={handleChange}
              />
            </div>

            <div className="inputfield">
              <label>Address:</label>
              <p className="Booking-errors">{loginErrors.address}</p>
              <input
                type="textbox"
                className="input"
                placeholder="Enter Your Provinnce,District,Sate,City"
                name="address"
                value={userValues.address}
                onChange={handleChange}
              />
            </div>

            <h3>
              <strong> TERMS & POLICY</strong>
            </h3>

            <div className="inputfield-terms">
              <li>
                The Booking amount Rs.2000 is a down payment and shall be
                adjusted against overall vehicle price at the time of final
                Quotation.
              </li>
              <li>
                {" "}
                Vehicles will be provided on the based on stock availability.In
                certain bookings, the vehicles availibility might take more than
                45 days.
              </li>

              <li>
                Booking will be cancel if you didnt came in touch with company
                within 5 days of your bookings
              </li>
              <div className="Terms">
                <label className="check">
                  <input type="checkbox" onChange={handleChangeCheckbox} />
                  <span className="checkmark"></span>
                </label>
                <label className="Agreeterms" required>
                  <p>Agreed to terms and conditions</p>
                </label>
              </div>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default BookNow;
