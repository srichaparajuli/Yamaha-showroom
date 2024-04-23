import React from "react";
import "../Pages/footer.css";
import { BsFacebook } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTiktok } from "react-icons/fa";
function Footer() {
  return (
    <div>
      <div className="footer">
        <div class="footer-container">
          <div class="rows">
            <div class="footer-col">
              <h4> Get in Touch</h4>
              <ul>
                <div className="OfficeAddresss">
                  {" "}
                  <ImLocation />
                  Office Address
                </div>
                <label className="Address">Itahari-6, Sunsari,Nepal</label>

                <div className="OfficeAddresss">
                  {" "}
                  <FaPhoneSquareAlt /> Our Phone Number
                </div>
                <label className="Address">
                  <span>Showroom: </span>025-587053
                </label>

                <div className="OfficeAddresss">
                  {" "}
                  <MdEmail />
                  For General Enquiry
                </div>
                <label className="Address">Yamahaitahari@gmail.com</label>
              </ul>
            </div>

            <div class="footer-col">
              <h4>company</h4>

              <ul>
                <li>
                  <a href="/About">about us</a>
                </li>
                <li>
                  <a href="/Motorcycle">MotorCycle</a>
                </li>
                <li>
                  <a href="/Sccoter">Scooter</a>
                </li>
                <li>
                  <a href="/Contact">Contact</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>follow us</h4>
              <div class="social-links">
                <a
                  href="https://www.facebook.com/itahariyamaha"
                  className="socialmedia"
                  id="facebook"
                >
                  <BsFacebook size={35} />
                </a>

                <a
                  href="https://www.tiktok.com/@yamahaitahari?_t=8ZZQQk5ZdtS&_r=1"
                  className="socialmedia"
                  id="tiktok"
                >
                  {" "}
                  <FaTiktok size={35} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
