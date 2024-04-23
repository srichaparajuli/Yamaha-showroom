import React, { useState, useEffect } from "react";
import "../Pages/Contact.css";
import { ImLocation } from "react-icons/im";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Contact() {
  const initialValues = {
    fullname: "",
    phoneNumber: "",
    email: "",
    message: "",
  };
  const [userValues, setuserValues] = useState(initialValues);
  const [loginErrors, setloginErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value, reset } = e.target;
    setuserValues({ ...userValues, [name]: value });
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloginErrors(validate(userValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(loginErrors).length === 0 && isSubmit) {
      postContactData();
    }
  }, [loginErrors, userValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.fullname) {
      errors.fullname = "FullName is required!";
    } else if (!values.phoneNumber) {
      errors.phoneNumber = "PhoneNumber is required!";
    } else if (values.phoneNumber.length != 10) {
      errors.phoneNumber = "PhoneNumber must be of 10 digit!";
    } else if (!values.email) {
      errors.email = "Please Enter Email!";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Enter Valid Email";
    } else if (!values.message) {
      errors.message = "Enter your valid Message!";
    }

    return errors;
  };
  const postContactData = async () => {
    console.log(userValues);
    const result = await axios.post(
      "https://localhost:7166/api/Contactus/UserContactus",
      userValues
    );

    if (result.data == 1) {
      toast.success("Message Sent Successfully");
      setIsSubmit(false);
      setuserValues(initialValues);
    } else {
      alert("Data cannot be Saved");
    }
  };

  return (
    <div>
      <ToastContainer />

      <div class="wrapper">
        <div class="page-header" data-aos="fade-down">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2>Contact Us</h2>
              </div>
              <div class="col-12">
                <a href="">Home</a>
                <a href="">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      
        <div class="contact wow fadeInUp">
          <div class="container">
            <div class="contact-font section-header text-center">
              <p>Get In Touch</p>
              <h2>For Any Query</h2>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="contact-info">
                  <div class="contact-item">
                    <i class="flaticon-address">
                      <ImLocation />
                    </i>
                    <div class="contact-text">
                      <h2>Location</h2>
                      <p>Your Location, City, Country</p>
                    </div>
                  </div>
                  <div class="contact-item">
                    <i class="flaticon-call">
                      <FaPhoneSquareAlt />
                    </i>
                    <div class="contact-text">
                      <h2>Phone</h2>
                      <p>+012 345 67890</p>
                    </div>
                  </div>
                  <div class="contact-item">
                    <i class="flaticon-send-mail">
                      <MdEmail />
                    </i>
                    <div class="contact-text">
                      <h2>Email</h2>
                      <p>info@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="contact-form">
                  <div id="success"></div>
                  <form
                    name="sentMessage"
                    id="contactForm"
                    novalidate="novalidate"
                    onSubmit={handleSubmit}
                  >
                    <div class="control-group">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Your Name"
                        required="required"
                        data-validation-required-message="Please enter your name"
                        name="fullname"
                        value={userValues.fullname}
                        onChange={handleChange}
                      />
                      <p class="help-block text-danger">
                        {loginErrors.fullname}
                      </p>
                    </div>
                    <div class="control-group">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Your Email"
                        required="required"
                        data-validation-required-message="Please enter your email"
                        name="email"
                        value={userValues.email}
                        onChange={handleChange}
                      />
                      <p class="help-block text-danger">{loginErrors.email}</p>
                    </div>
                    <div class="control-group">
                      <input
                        type="text"
                        class="form-control"
                        id="subject"
                        placeholder="PhoneNumber"
                        required="required"
                        data-validation-required-message="Please enter your phonenumber"
                        name="phoneNumber"
                        value={userValues.phoneNumber}
                        onChange={handleChange}
                      />
                      <p class="help-block text-danger">
                        {loginErrors.phoneNumber}
                      </p>
                    </div>
                    <div class="control-group">
                      <textarea
                        class="form-control"
                        id="message"
                        placeholder="Message"
                        required="required"
                        data-validation-required-message="Please enter your message"
                        name="message"
                        value={userValues.message}
                        onChange={handleChange}
                      ></textarea>
                      <p class="help-block text-danger">
                        {loginErrors.message}
                      </p>
                    </div>
                    <div>
                      <button class="btn" type="submit" id="sendMessageButton">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <iframe
              width=""
              height="300"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Tirupati%20auto%20city%20,nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
