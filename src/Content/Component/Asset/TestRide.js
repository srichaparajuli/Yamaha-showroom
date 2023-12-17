import "../Pages/TestRide.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { LoginContext } from "../../../Context/LoginContext";
// import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function TestRide() {
  const initialValues = {
    FullName: "",
    PhoneNumber: "",
    EmailAddress: "",
    Address: "",
    Date: "",
    Lisence: "",
    ProductId: "",
  };
  const [userValues, setuserValues] = useState(initialValues);
  const [SignUpErrors, setSignUpErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [productData, setproductData] = useState([]);
  const [mssgValues, setmssgValues] = useState();
  // const { loginData, setLoginData } = useContext(LoginContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserValues({ ...userValues, [name]: value });
    setmssgValues();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignUpErrors(valiDate(userValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(SignUpErrors).length === 0 && isSubmit) {
      postTestRideData();
    }
    getProductData();
  }, [isSubmit, SignUpErrors, isSubmit]);

  const getProductData = async () => {
    const result = await axios.get(
      "https://localhost:7166/api/Addproduct/Productget"
    );
    console.log(result.data);
    setproductData(result.data);
  };

  const postTestRideData = async () => {
    console.log(userValues);
    const result = await axios.post(
      "https://localhost:7166/api/TestRide/UserTestRide",
      userValues
    );
    console.log(result);
    if (result.data == 1) {
      toast.success("Booking for TestRide has been Sent Successfully");
      setIsSubmit(false);
      setuserValues(initialValues);
    }
    // else {
    //   alert("Data cannot be Saved");
    // }
  };
  const OTPClick = async (e) => {
    e.preventDefault();
    setSignUpErrors(valiDate(userValues));
    // setOTPStatus(true);
    if (Object.keys(SignUpErrors).length) {
      toast.success("Vehicles Booking Details has been sent sucessfully");
      // toast.dark("Choose a Payment Method Below!");
    }
    var userData = {
      To: userValues.email,
      Subject: "Tirupati Auto City Booking Notification",
      Body: `Thank you for Booking your vehicles from Tirupati Auto city. Please Reach Out to Us within 5 days of your Booking `,
    };
    const result = await axios.post(
      "https://localhost:7166/api/Tirupatiemail/sendemail",
      userData
    );

    if (result.status == 200) {
    }
  };

  const valiDate = (values) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.FullName) {
      errors.FullName = "FullName is required!";
    } else if (!values.PhoneNumber) {
      errors.PhoneNumber = "PhoneNumber is required!";
    } else if (values.PhoneNumber.length != 10) {
      errors.PhoneNumber = "PhoneNumber must be of 10 digit !";
    } else if (!values.EmailAddress) {
      errors.EmailAddress = "Please Enter  Email Address!";
    } else if (!emailPattern.test(values.EmailAddress)) {
      errors.EmailAddress = "Enter Valid  Email Address";
    } else if (!values.Lisence) {
      errors.Lisence = "Enter your valid Lisence Number!";
    } else if (values.Lisence.length != 13) {
      errors.Lisence = "Lisence Number must be of 13 digit !";
    } else if (!values.Date) {
      errors.Date = "Enter your Date for TestRide!";
    } else if (!values.Address) {
      errors.Address = "Enter your Valid  Address!";
    }

    return errors;
  };

  return (
    <div>
      <ToastContainer />
      <div class="testcontainer">
      <div class="page-header" data-aos="fade-down">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2> <strong>Book</strong> Your Test Ride</h2>
              </div>
              <div class="col-12">
                <a href="/">Home</a>
                <a href="/TestRide">TestRide</a>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="book">
          
          <div class="form">
            <form>
              <div class="inpbox full">
                <span class="flaticon-taxi"></span>
                <select name="ProductId" onChange={handleChange}>
                  <option value="0">Select</option>
                  {productData.map((data, index) => (
                    <option value={data.id}>{data.productName}</option>
                  ))}
                </select>
              </div>
              <div class="inpbox">
                <span class="flaticon-globe"></span>
                <input
                  type="text"
                  placeholder="FULL NAME"
                  name="FullName"
                  value={userValues.FullName}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.FullName}</p>
              </div>

              <div class="inpbox">
                <span class="flaticon-calendar"></span>
                <input
                  type="text"
                  placeholder="PHONE NUMBER"
                  name="PhoneNumber"
                  value={userValues.PhoneNumber}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.PhoneNumber}</p>
              </div>

              <div class="inpbox">
                <span class="flaticon-location"></span>
                <input
                  type="email"
                  placeholder=" Email Address"
                  name="EmailAddress"
                  value={userValues.EmailAddress}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.EmailAddress}</p>
              </div>
              <div class="inpbox">
                <span class="flaticon-calendar"></span>
                <input
                  type="text"
                  placeholder="Address"
                  name="Address"
                  value={userValues.Address}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.Address}</p>
              </div>
              <div class="inpbox">
                <span class="flaticon-user"></span>
                <input
                  type="text"
                  placeholder="Lisence Number"
                  name="Lisence"
                  value={userValues.Lisence}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.Lisence}</p>
              </div>
              <div class="inpbox">
                <span class="flaticon-user"></span>
                <input
                  type="Date"
                  placeholder="Date"
                  name="Date"
                  value={userValues.Date}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.Date}</p>
              </div>

              <button className="subt" role="button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div> */}

<section class="containerr">
  {/* <header>Registration Form</header> */}
      <form action="#" class="form">
      <div class="column">
            <div class="select-box">
            <select name="ProductId" onChange={handleChange}>
                  <option value="0">Select vehicles</option>
                  {productData.map((data, index) => (
                    <option value={data.id}>{data.productName}</option>
                  ))}
                </select>
            </div>
            
          </div>
        <div class="input-box">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" 
                  name="FullName"
                  value={userValues.FullName}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.FullName}</p>
        </div>
        <div class="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter email address"  name="EmailAddress"
                  value={userValues.EmailAddress}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.EmailAddress}</p>
        </div>
        <div class="column">
          <div class="input-box">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter phone number"  name="PhoneNumber"
                  value={userValues.PhoneNumber}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.PhoneNumber}</p>
          </div>
          <div class="input-box">
            <label>Date</label>
            <input type="date"  placeholder="Date"
                  name="Date"
                  value={userValues.Date}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.Date}</p>
          </div>
          
        </div>
        <div class="column">
        <div class="input-box">
            <label>Address</label>
            <input type="TEXT"  placeholder="Enter address"
                  name="Address"
                  value={userValues.Address}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.Address}</p>
          </div>
          <div class="input-box">
            <label> Lisence Number</label>
          <input type="text" placeholder="Enter your Lisence Number"  name="Lisence"
                  value={userValues.Lisence}
                  onChange={handleChange}
                />
                <p className="errortestride">{SignUpErrors.Lisence}</p>
                </div>
          </div>
       
       
        <button role="button" onClick={handleSubmit}>Submit</button>
      </form>
    </section>

      </div>
    </div>
  );
}

export default TestRide;
