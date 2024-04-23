import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./Content/Component/Asset/Navbar";
import About from "./Content/Component/Asset/About";
import Home from "./Content/Component/Asset/Home";
import Scooter from "./Content/Component/Asset/Scooter";
import Contact from "./Content/Component/Asset/Contact";
import Login from "./Content/Component/Asset/Login";
import Footer from "./Content/Component/Asset/Footer";
import Register from "./Content/Component/Asset/Register";
import Motorcycle from "./Content/Component/Asset/Motorcycle";
import ForgetPassword from "./Content/Component/Asset/ForgetPassword";
import SingleProduct from "./Content/Component/Asset/SingleProduct";
import { LoginContext } from "./Context/LoginContext";
import TestRide from "./Content/Component/Asset/TestRide";
import BookNow from "./Content/Component/Asset/BookNow";
import BookingHistory from "./Content/Component/Asset/BookingHistory";

function App() {
  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("loginData"));
    if (items) {
      setLoginData(items);
    } else {
      const obj = {
        URL: "https://localhost:7166",
      };
      setLoginData(obj);
      localStorage.setItem("loginDetails", JSON.stringify(obj));
    }
  }, []);
  return (
    <div>
      
      <Router>
        <LoginContext.Provider value={{ loginData, setLoginData }}>
          <Navbar />
          <Routes>
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Motorcycle" element={<Motorcycle />} />
            <Route exact path="/Scooter" element={<Scooter />} />
            <Route exact path="/Contact" element={<Contact />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/ForgetPassword" element={<ForgetPassword />} />
            <Route
              exact
              path="/SingleProduct/:id"
              element={<SingleProduct />}
            />
            <Route exact path="/TestRide" element={<TestRide />} />
            <Route exact path="/BookNow/:id" element={<BookNow />} />
            <Route exact path="/BookingHistory" element={<BookingHistory />} />
          </Routes>

          <Footer />
        </LoginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
