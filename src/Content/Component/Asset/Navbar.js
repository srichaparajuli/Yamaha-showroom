import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { ImMail } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { FcOvertime, FcCallback } from "react-icons/fc";

import { LoginContext } from "../../../Context/LoginContext";
import "../Pages/Navbar.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [navbar, setNavbar] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
  // const [logoutData, setLogoutData] = useState({});
  const [productData, setproductData] = useState([]);
  const [userData, setuserData] = useState([]);

  const handleSearchChange = (e) => {
    setLoginData({ ...loginData, SearchBar: e.target.value });
  };

  const getProductData = async () => {
    const result = await axios.get(
      loginData.URL + "/api/Notification/Notificationget"
    );

    console.log(result.data);
    setproductData(result.data);
  };

  useEffect(() => {
    getProductData();
    // getUserData();
  }, [loginData]);

  const navigate = useNavigate();

  const LogOut = () => {
    const confirm = window.confirm("are you sure? You want to Logout");
    if (confirm) {
      window.location.href = "/login";
      setLoginData("");
      localStorage.clear();
    }
  };
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // document.addEventListener("DOMContentLoaded", function(){
  //   window.addEventListener('scroll', function() {
  //       if (window.scrollY > 50) {
  //         document.getElementById('navbar').classList.add('fixed-top');

  //       } else {
  //         document.getElementById('navbar').classList.remove('fixed-top');
  //          // remove padding top from body
  //         document.body.style.paddingTop = '0';
  //       }
  //   });
  // });
  //   window.addEventListener ('scroll', function() {
  //     if (this.window.scrollY() > 90) {
  //         this.document.getElementById('.nav-bar').addClass('nav-sticky');
  //         this.window('.carousel, .page-header').css("margin-top", "73px");
  //     } else {
  //       document.getElementById('.nav-bar').removeClass('nav-sticky');
  //    ('.carousel, .page-header').css("margin-top", "0");
  //     }
  // });
  // window.addEventListener("scroll", function () {
  //   if (window.scrollTo > 90) {
  //     document.querySelector(".navbar").classList.add("nav-sticky");
  //     document
  //       .querySelectorAll(".carousel, .page-header")
  //       .forEach(function (element) {
  //         element.style.marginTop = "73px";
  //       });
  //   } else {
  //     document.querySelector(".navbar").classList.remove("nav-sticky");
  //     document
  //       .querySelectorAll(".carousel, .page-header")
  //       .forEach(function (element) {
  //         element.style.marginTop = "0";
  //       });
  //   }
  // });
  window.addEventListener("scroll", function () {
    var nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });


    // const hiddenElements = document.querySelectorAll(".hidden");
    // hiddenElements.forEach((el) => observer.observe(el));
  });
  return (
    <div>
      <ToastContainer />
      {/* <nav className={navbar ? "navbar fixed" : "fixed"}>
        <div className="navbar">
          <Link to="/" className="navbar-logo">
            <img
              src={"/images/YamahaLogo.png"}
              alt="YamahaLogo"
              className="Yamahalogo"
            />{" "}
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <FaBars />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="./About" className="nav-links">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="./Motorcycle" className="nav-links">
                MotorCycle
              </Link>
            </li>

            <li
              className="nav-item"
            >
              <Link to="/Scooter" className="nav-links">
                Scooter
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="./Contact"
                className="nav-links"

              >
                Contact Us
              </Link>
            </li>
          </ul>
          <ul className={click ? "nav-menu active" : "nav-men"}>
            <div className="search">
              <div class="search-container">
                <input
                  type="text"
                  placeholder="| Search here.."
                  onChange={handleSearchChange}
                />

                <a href="#">
                  <i className="icon">
                    <BiSearchAlt />
                  </i>
                </a>
              </div>
            </div>

            <li className="nav-item">
              <div class="notification">
                <a class="icon" href="#divOne">
                  <IoNotifications />
                </a>
              </div>
            </li>

            <div class="overlay" id="divOne">
              <div class="wrapper">
                <h2>Notification</h2>
                <a class="close" href="#">
                  &times;
                </a>

                <div
                  class="content-Notification"
                  style={{ overflowY: "scroll", color: "red" }}
                >
                  {productData.map((data, index) => (
                    <div class="container-Notification" key={index}>
                      <div class="Notifiction-div-right">
                        <span class="Noti-Header">
                          <b>{data.offerName}</b>
                        </span>
                        <p class="Notification-description">
                          {data.offerDescription}
                        </p>
                        <span class="Offer-start">
                          Offer Starts from:{data.startDate}
                        </span>{" "}
                        &
                        <span class="Offer-start">
                          End at:{data.expiryDate}{" "}
                        </span>
                      </div>
                      <div class="Notification-container">
                        <div>
                          <img
                            src={
                              loginData.URL +
                              "/staticfiles/NotificationImage/" +
                              data.image
                            }
                            className=""
                          />
                        
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <li className="nav-item">
              <div className="notification">
                <Link to="./BookingHistory" className="notification">
                  <BsPersonCircle />
                </Link>
              </div>
            </li>

            <li className="nav-item">
              {loginData.UserId ? (
                <Link className=" nav-links-mobile" onClick={LogOut}>
                  LogOut
                </Link>
              ) : (
                <Link to="./Login" className=" nav-links-mobile">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav> */}
      <div class="wrapper">
        {/* <!-- Top Bar Start --> */}
        <div class="top-bar">
          <div class="container-fluid">
            <div class="row align-items-center ">
              <div class="col-lg-4 col-md-120">
                <div class="logo">
                  <a href="index.html">
                    <img
                      src={"/images/YamahaLogo.png"}
                      alt="YamahaLogo"
                      className="Yamahalogo"
                    />{" "}
                    {/* <!-- <img src="img/logo.jpg" alt="Logo"> --> */}
                  </a>
                </div>
              </div>
              <div class="col-lg-8 col-md-7 d-none d-lg-block fw-bold">
                <div class="row ">
                  <div class="col-4">
                    <div class="top-bar-item">
                      <div class="top-bar-icon">
                        <i class="flaticon-calendar">
                          <FcOvertime />{" "}
                        </i>
                      </div>
                      <div class="top-bar-text">
                        <h3>Opening Hour</h3>
                        <p>Sun - Fri, 8:00am - 7:00pm</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="top-bar-item">
                      <div class="top-bar-icon">
                        <i class="flaticon-call">
                          <FcCallback />
                        </i>
                      </div>
                      <div class="top-bar-text">
                        <h3>Call Us</h3>
                        <p>025-584853</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="top-bar-item">
                      <div class="top-bar-icon">
                        <i class="flaticon-send-mail">
                          <ImMail />
                        </i>
                      </div>
                      <div class="top-bar-text">
                        <h3>Email Us</h3>
                        <p>Yamahaitahari@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Top Bar End -->

      <!-- Nav Bar Start --> */}
        <div class="nav-bar">
          <div class="container-fluid">
            <nav className="navbar  navbar-expand-lg bg-dark navbar-dark">
              <a href="/" class="navbar-brand">
                MENU
              </a>
              <button
                type="button"
                class="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div
                class="collapse navbar-collapse justify-content-center"
                  id="navbarCollapse"
              >
                <div class="navbar-nav">
                  <a href="/" class="nav-item nav-link active">
                    Home
                  </a>
                  <a href="./About" class="nav-item nav-link">
                    About us
                  </a>
                  <a href="./Motorcycle" class="nav-item nav-link">
                    MotorCycle
                  </a>
                  <a href="./Scooter" class="nav-item nav-link">
                    Scooter
                  </a>
                  <a href="./Contact" class="nav-item nav-link">
                    Contact us
                  </a>
                  {/* <div class="nav-item dropdown">
                    <a
                      href="#"
                      class="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages
                    </a>
                    <div class="dropdown-menu">
                      <a href="blog.html" class="dropdown-item">
                        Blog Page
                      </a>
                      <a href="single.html" class="dropdown-item">
                        Single Page
                      </a>
                    </div>
                  </div>
                  <a href="contact.html" class="nav-item nav-link">
                    Contact
                  </a> */}
                  <div className="search">
                    <div class="search-container">
                      <input
                        type="text"
                        placeholder="| Search here.."
                        onChange={handleSearchChange}
                      />

                      {/* <a href="#">
                  <i className="icon">
                    <BiSearchAlt />
                  </i>
                </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
