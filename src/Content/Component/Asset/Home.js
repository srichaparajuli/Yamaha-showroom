import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { LoginContext } from "../../../Context/LoginContext";
import { Link } from "react-router-dom";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "../Pages/Home.css";
import "react-slideshow-image/dist/styles.css";
import { ImLocation } from "react-icons/im";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import showroom from "../video/showroomvideo.mp4";

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
];

const Home = () => {
  const [productData, setproductData] = useState([]);
  const { loginData } = useContext(LoginContext);

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

  document.addEventListener("DOMContentLoaded", function () {
    var video1;
    var btnPlay = document.getElementsByClassName("btn-play");
    for (var i = 0; i < btnPlay.length; i++) {
      btnPlay[i].addEventListener("click", function () {
        video1 = this.dataset.src;
      });
    }
    console.log(video1);

    var videoModal = document.getElementById("videoModal");
    var video = document.getElementById("video");
    videoModal.addEventListener("shown.bs.modal", function () {
      video.src = video1 + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0";
    });

    videoModal.addEventListener("hide.bs.modal", function () {
      video.src = video1;
    });
  });

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id="carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="./images/imagefront1.png" alt="Carousel Image" />
            <div class="carousel-caption"></div>
          </div>
          <div class="carousel-item ">
            <img src="./images/Imagefront.jpg" alt="Carousel Image" />
            <div class="carousel-caption"></div>
          </div>

          <div class="carousel-item">
            <img src="./images/Homeimg2.jpg" />
            <div class="carousel-caption"></div>
          </div>
        </div>

        <a
          class="carousel-control-prev"
          href="#carousel"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carousel"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <div className="slide-container">
        <section className="latest top">
          <div className="scontainer">
            <div className="font-head section-header text-center">
              <p>Latest Popular Bike</p>
            </div>
            <Swiper
              data-aos="zoom-in"
              data-aos-duration="1000"
              modules={[Navigation, Pagination, EffectCoverflow]}
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
              breakpoints={{
                0: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
              }}
            >
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
                      </div>

                      <div className="details">
                        <p>{data.productName}</p>
                        <span>Rs.{data.actualPrice}</span>
                      </div>
                      <button className="homebtn">
                        <Link to={`/SingleProduct/${data.id}`}>
                          <span>View details</span>
                        </Link>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="hidden" show-animate>
          <div className="AboutUs ">
            <div className="about wow fadeInUp" data-wow-delay="0.1s">
              <div className="container">
                <div
                  className="row align-items-center  "
                >
                  <div className="col-lg-6 col-md-6 ">
                    <div className="about-img">
                      <div className="showroom-video">
                        <video
                          src={showroom}
                          type="showroomvideo.mp4"
                          autoPlay
                          loop
                          muted
                        ></video>{" "}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg col-md-6 pl-5">
                    <div class="section-header ">
                      <h2 className=".text-[#030f27]">Welcome to Tirupati Auto City</h2>
                      <h3>16 Years Of Experience</h3>
                    </div>
                    <div class="about-text">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec pretium mi. Curabitur facilisis ornare
                        velit non vulputate. Aliquam metus tortor, auctor id
                        gravida condimentum, viverra quis sem.Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Phasellus nec
                        pretium mi. Curabitur facilisis ornare velit non
                        vulputate. Aliquam metus tortor, auctor id gravida
                        condimentum, viverra quis sem. Curabitur non nisl nec
                        nisi scelerisque maximus. Aenean consectetur convallis
                        porttitor. Aliquam interdum at lacus non blandit.
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="about wow fadeInUp mt-lg-5" data-wow-delay="0.1s">
              <div class="container">
                <div class="row align-items-center ">
                  <div class="col-lg-5 col-md-6 ">
                    <div class="about-img">
                      <img src="./images/Sanyog .jpg" alt="Image" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-4 ">
                    <div className="section-header text-left ">
                      <h2>Managing Director</h2>
                      <h3>Mr. Sanyog Parajuli</h3>
                    </div>
                    <div class="about-text">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec pretium mi. Curabitur facilisis ornare
                        velit non vulputate. Aliquam metus tortor, auctor id
                        gravida condimentum, viverra quis sem. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Phasellus nec
                        pretium mi. Curabitur facilisis ornare velit non
                        vulputate. Aliquam metus tortor, auctor id gravida
                        condimentum, viverra quis sem. Curabitur non nisl nec
                        nisi scelerisque maximus. Aenean consectetur convallis
                        porttitor. Aliquam interdum at lacus non blandit.
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

         
          </div>
          <div className="section-header text-center">
            {" "}
            <h1 className=" ">Awards & Recognition</h1>
          </div>
          <div className="wrappeaward ">
            <img src="./images/dad.jpg" className="dadimg" />
            <img src="./images/atstage.jpg" className="groupimg" />
            <img src="./images/best showroom.jpg" className="awardimg" />
            <img src="./images/groupawardimg - Copy.jpg" className="groupimg" />
            <img src="./images/momdad.jpg" className="" />
            <img src="./images/bishnu.jpg" className="" />
          </div>

          <div className="service">
            `
            <div class="container">
              <div className="section-headerr text-center">
                <p>Our Services</p>
                <h4>We provide the best services</h4>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 wow fadeInUp">
                  <div
                    className="service-item"
                   
                  >
                    <div class="service-img">
                      <img src="./images/sales.jpg" alt="Image" />
                      <div class="service-overlay">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec pretium mi. Curabitur facilisis
                          ornare velit non vulputate. Aliquam metus tortor,
                          auctor id gravida condimentum, viverra quis sem.
                        </p>
                      </div>
                    </div>
                    <div class="service-text">
                      <h3>Finance</h3>
                      <a
                        class="btn"
                        href="images/sales.jpg"
                        data-lightbox="service"
                      >
                        +
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  class="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <div
                    class="service-item"
                  
                  >
                    <div class="service-img">
                      <img src="./images/service-center.png" alt="Image" />
                      <div class="service-overlay">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec pretium mi. Curabitur facilisis
                          ornare velit non vulputate. Aliquam metus tortor,
                          auctor id gravida condimentum, viverra quis sem.
                        </p>
                      </div>
                    </div>
                    <div class="service-text">
                      <h3>Spare parts & Servicing</h3>
                      <a
                        class="btn"
                        href="img/service-2.jpg"
                        data-lightbox="service"
                      >
                        +
                      </a>
                    </div>
                  </div>
                </div>

                <div
                  class="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div
                    class="service-item"
                   
                  >
                    <div class="service-img">
                      <img src="./images/exchnage.jpg" alt="Image" />
                      <div class="service-overlay">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus nec pretium mi. Curabitur facilisis
                          ornare velit non vulputate. Aliquam metus tortor,
                          auctor id gravida condimentum, viverra quis sem.
                        </p>
                      </div>
                    </div>
                    <div class="service-text">
                      <h3>Exchange</h3>
                      <a
                        class="btn"
                        href="./images/service-center.png"
                        data-lightbox="service"
                      >
                        +
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
        <div
          className={`back-to-top-button ${isVisible ? "visible" : ""}`}
          onClick={scrollToTop}
        >
          &uarr;
        </div>
      </div>
    </>
  );
};

export default Home;
