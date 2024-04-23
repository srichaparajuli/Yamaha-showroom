import React, { useState, useContext, useEffect } from "react";
import { ImMail } from "react-icons/im";
import axios from "axios";
import { FcOvertime, FcCallback } from "react-icons/fc";
import { LoginContext } from "../../../Context/LoginContext";
import "../Pages/Navbar.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const { loginData, setLoginData } = useContext(LoginContext);
  const [setproductData] = useState([]);
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
  }, [loginData]);


  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);

  }, []); 


  const handlePhoneNumberClick = () => {
    window.location.href = 'tel:+977 9852048232';
  };
  return (
    <div>
      <ToastContainer />

      <div class="wrapper">
      
        <div class="top-bar">
          <div class="container-fluid">
            <div class="row align-items-center ">
              <div class="col-lg-4 col-md-120">
                <div class="logo">
                  <a href="Home.js">
                    <img
                      src={"/images/YamahaLogo.png"}
                      alt="YamahaLogo"
                      className="Yamahalogo"
                    />{" "}
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
                          <FcCallback onClick={handlePhoneNumberClick} />
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
     
        <div className={`nav-bar ${isScrolled ? 'hidden' : ''}`}>
          <div className="container-fluid">
            <nav className="navbar  navbar-expand-lg bg-dark navbar-dark">
              <a href="/" class="navbar-brand">
                Tirupati Auto City
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
                  <a href="/About" class="nav-item nav-link">
                    About us
                  </a>
                  <a href="/Motorcycle" class="nav-item nav-link">
                    MotorCycle
                  </a>
                  <a href="/Scooter" class="nav-item nav-link">
                    Scooter
                  </a>
                  <a href="/Contact" class="nav-item nav-link">
                    Contact us
                  </a>

                  <div className="search">
                    <div class="search-container">
                      <input
                        type="text"
                        placeholder=" Search Here.."
                        onChange={handleSearchChange}
                      />
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
