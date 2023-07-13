import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { LoginContext } from "../../../Context/LoginContext";
import { Link } from "react-router-dom";
import About from "./About";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "../Pages/Home.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ImLocation } from "react-icons/im";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
//import videoPlayer from "react-video-js-player";
import showroom from "../video/video1.mp4";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "90vh",
  backgroundRepeat: "no-repeat",
};

const slideImages = [
  {
    url: "images/Frontimg.jpg",
  },
  {
    url: "images/Homeimg2.jpg",
  },

  // {
  //   url: "images/Homeimg.jpg",

  // },
];

const Home = () => {
  const [productData, setproductData] = useState([]);
  const { loginData, setLoginData } = useContext(LoginContext);

  const getProductData = async () => {
    const result = await axios.get(
      loginData.URL + "/api/Addproduct/ProductgetbyCategoryId?CategoryId=1"
    );
    console.log(result.data);
    setproductData(result.data);
    if (loginData.SearchBar) {
      const filterProductData = result.data.filter((x) => {
        return `${x.productName.toLowerCase()}`.includes(
          loginData.SearchBar.toLowerCase()
        );
      });
      setproductData(filterProductData);
    } else {
      setproductData(result.data);
    }
  };

  useEffect(() => {
    getProductData();
  }, [loginData]);

  // contact api
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
    // console.log(loginErrors);
    if (Object.keys(loginErrors).length === 0 && isSubmit) {
      // console.log(userValues);
      postContactData();
    }
  }, [loginErrors, userValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const numberRegex =
      /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
    // Validate numbers
    // Returns true
    // numberRegex.test('Hey12122022x');

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

  

  document.addEventListener("DOMContentLoaded", function() {
    var video1;
    var btnPlay = document.getElementsByClassName("btn-play");
    for (var i = 0; i < btnPlay.length; i++) {
      btnPlay[i].addEventListener("click", function() {
        video1 = this.dataset.src;
      });
    }
    console.log( video1);
  
    var videoModal = document.getElementById("videoModal");
    var video = document.getElementById("video");
    videoModal.addEventListener("shown.bs.modal", function() {
      video.src =  video1 + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0";
    });
  
    videoModal.addEventListener("hide.bs.modal", function() {
      video.src =  video1;
    });
  });
  

  return (
    <>
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>

        {/* <h1 className="Featurespan">Feature Product</h1>

        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          spaceBetween={5}
          slidesPerView={4}
          navigation
        >
          {productData.map((data, index) => (
            <SwiperSlide key={index}>
              {" "}
              <div className="products">
                <div className="bike">
                
                  <Link to={`/SingleProduct/${data.id}`}>
                    <img
                      src={
                        loginData.URL +
                        "/staticfiles/Vehiclesimages/" +
                        data.image
                      }
                      className=""
                    />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        
        </Swiper> */}
        <section className="latest top">
          <div className="scontainer">
            <div className="font-head section-header text-center">
              <h2>Latest Popular Bike</h2>
            </div>
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              spaceBetween={30}
              slidesPerView={4}
              navigation
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
            >
              {/* <div className="natak"> */}
              {productData.map((data) => (
                <SwiperSlide>
                  <div className="contents grid top">
                    <div className="sbox">
                      <div className="bike">
                        <Link to={`/SingleProduct/${data.id}`}>
                          <img
                            src={
                              loginData.URL +
                              "/staticfiles/Vehiclesimages/" +
                              data.image
                            }
                            className=""
                          />
                        </Link>
                        {/* <div className="flex1">
                      <label>50%</label>
                      <i className="fas fa-heart"></i>
                    </div> */}
                      </div>

                      <div className="details">
                        <h4>{data.productName}</h4>
                        {/* <p>Fashion,twin disc</p> */}
                        <h3>
                          <span>Rs.{data.actualPrice}</span>
                        </h3>
                        <button className="homebtn">
                          <Link to={`/SingleProduct/${data.id}`}>
                            View details
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        {/* about section */}
        <About />

        {/* video section */}
        {/* <!-- Video Start --> */}
        {/* <div class="video wow fadeIn" data-wow-delay="0.1s"> */}
        <video width="500" height="300" autoPlay muted loop>
<source src={showroom} type="video1.mp4"></source>
</video>  
{/* </div> */}


        {/* <div class="video wow fadeIn" data-wow-delay="0.1s">
          <div class="container">
            <button
              type="button"
              class="btn-play"
              data-toggle="modal"
              data-src="video1.mp4"
              data-target="#videoModal"
            >
              <span></span>
            </button>
          </div>
        </div>

        <div
          class="modal fade"
          id="videoModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>

                <div class="embed-responsive embed-responsive-16by9">
                  <iframe
                    class="embed-responsive-item"
                    src="../video/video1.mp4"
                    // id="video"
                    // allowscriptaccess="always"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <!-- Video End --> */}



        

        {/* Contact */}
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
              width="1120"
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
    </>
  );
};

export default Home;
