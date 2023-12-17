import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { LoginContext } from "../../../Context/LoginContext";
import { Link } from "react-router-dom";
import About from "./About";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/free-mode";

// import "bootstrap/dist/css/bootstrap.min.css"
import { FreeMode } from "swiper";
import "../Pages/Home.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ImLocation } from "react-icons/im";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
//import videoPlayer from "react-video-js-player";
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
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  

  return (
    <>

  <div id="carousel" class="carousel slide" data-ride="carousel">
        {/* <ol class="carousel-indicators">
          <li data-target="#carousel" data-slide-to="0" class="active"></li>
          <li data-target="#carousel" data-slide-to="1"></li>
          <li data-target="#carousel" data-slide-to="2"></li>
        </ol> */}
        <div class="carousel-inner">
          <div class="carousel-item active">
         
         
            <img src="./images/Imagefront.jpg" alt="Carousel Image" />
            <div class="carousel-caption">
              {/* <p class="animated fadeInRight">We Are Professional</p>
              <h1 class="animated fadeInLeft">For Your Dream Project</h1> */}
           
            </div>
          </div>

          <div class="carousel-item">
           
            <img src="./images/Homeimg2.jpg"/>
            <div class="carousel-caption">
              {/* <p class="animated fadeInRight">Professional Builder</p>
              <h1 class="animated fadeInLeft">We Build Your Home</h1> */}
             
            </div>
          </div>

          <div class="carousel-item">
            <img src="./images/imagefront1.png" alt="Carousel Image" />
            <div class="carousel-caption">
              {/* <p class="animated fadeInRight">We Are Trusted</p>
              <h1 class="animated fadeInLeft">For Your Dream Home</h1> */}
             
            </div>
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
          <div 
  className="scontainer">
            <div className="font-head section-header text-center">
              <h2>Latest Popular Bike</h2>
            </div>
            <Swiper data-aos="zoom-out"
     data-aos-duration="2000"
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
             0:   {
              spaceBetween:30,
              slidesPerView:4,
                }
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
                        <h4>{data.productName}</h4>
                       
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
        <section   className="hidden" show-animate>
        <div className="AboutUs">
       
                <div class="about wow fadeInUp" data-wow-delay="0.1s">
        <div  class="container"  >
          <div class="row align-items-center" data-aos="fade-up"
     data-aos-duration="3000" >
            <div class="col-lg-5 col-md-6">
              <div class="about-img">
              <div className="showroom-video">
       
        <video 
src={showroom} type="showroomvideo.mp4" autoPlay loop muted>
</video>  
</div>
              </div>
            </div>
            <div class="col-lg-7 col-md-6">
              <div class="section-header text-left">
                <h2>Welcome to Tirupati auto City</h2>
                <h3>16 Years Experience</h3>
              </div>
              <div class="about-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                  vulputate. Aliquam metus tortor, auctor id gravida
                  condimentum, viverra quis sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                  vulputate. Aliquam metus tortor, auctor id gravida
                  condimentum, viverra quis sem. Curabitur non nisl nec nisi
                  scelerisque maximus. Aenean consectetur convallis porttitor.
                  Aliquam interdum at lacus non blandit.
                </p>
                <p>
                  
                </p>
             
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about wow fadeInUp" data-wow-delay="0.1s">
        <div  class="container" >
          <div class="row align-items-center" >
            <div class="col-lg-5 col-md-6" >
              <div class="about-img">
                <img src="./images/Sanyog .jpg" alt="Image" />
              </div>
            </div>
            <div class="col-lg-7 col-md-6">
              <div class="section-header text-left">
              
                <h2>Managing Director</h2>
                <h3>Mr. Sanyog Parajuli</h3>
              </div>
              <div class="about-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                  vulputate. Aliquam metus tortor, auctor id gravida
                  condimentum, viverra quis sem.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec pretium mi. Curabitur facilisis ornare velit non
                  vulputate. Aliquam metus tortor, auctor id gravida
                  condimentum, viverra quis sem. Curabitur non nisl nec nisi
                  scelerisque maximus. Aenean consectetur convallis porttitor.
                  Aliquam interdum at lacus non blandit.
                </p>
                <p>
                
                </p>
              
              </div>
            </div>
          </div>
        </div>
      </div>

          {/* award section */}
         
        </div>
        <div className="section-header text-center">
              {" "}
              <h1 className="">Awards & Recognition</h1>
            </div>
        <div class="wrappeaward ">
        <img src="./images/dad.jpg" className="dadimg" />
        <img src="./images/atstage.jpg" className="groupimg" />
        <img src="./images/best showroom.jpg" className="awardimg"/>
        <img
                      src="./images/groupawardimg.jpg"
                      className="groupimg"
                    />
                     <img src="./images/momdad.jpg" className="" />
        <img src="./images/bishnu.jpg" className="" />
        
    </div>
        

        <div  class="service">` 
                <div class="container">
                    <div class="section-header text-center">
                        <p>Our Services</p>
                        <h1>We Provide Services</h1>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 wow fadeInUp"  >
                            <div class="service-item" data-aos="flip-left" data-aos-duration="2000" data-aos-easing="ease-in-out"
 data-aos-anchor-placement="top-center">
  
                                <div class="service-img">
                                    <img src="./images/sales.jpg" alt="Image"/>
                                    <div class="service-overlay">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem.
                                        </p>
                                    </div>
                                </div>
                                <div class="service-text">
                                    <h3>Finance</h3>
                                    <a class="btn" href="images/sales.jpg" data-lightbox="service">+</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                            <div class="service-item" data-aos="flip-left" data-aos-duration="2000" data-aos-easing="ease-in-out"
 data-aos-anchor-placement="top-center">
                                <div class="service-img">
                                    <img src="./images/service-center.png" alt="Image"/>
                                    <div class="service-overlay">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem.
                                        </p>
                                    </div>
                                </div>
                                <div class="service-text">
                                    <h3>Spare parts & Servicing</h3>
                                    <a class="btn" href="img/service-2.jpg" data-lightbox="service">+</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="service-item" data-aos="flip-left" data-aos-duration="2000" data-aos-easing="ease-in-out"
data-aos-anchor-placement="top-center" >
                                <div class="service-img">
                                    <img src="./images/exchnage.jpg" alt="Image"/>
                                    <div class="service-overlay">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id gravida condimentum, viverra quis sem.
                                        </p>
                                    </div>
                                </div>
                                <div class="service-text">
                                    <h3>Exchange</h3>
                                    <a class="btn" href="./images/service-center.png" data-lightbox="service">+</a>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
           
      </section>


        {/* video section */}
        {/* <!-- Video Start --> */}
       {/* <div className="showroom-video">
        <video 
src={showroom} type="showroomvideo.mp4" autoPlay loop muted>
</video>  
</div> */}

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
        <div
      className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      &uarr; 
    </div>
      </div>
    </>
  );
};

export default Home;
