import React from "react";
import "../Pages/About.css";
import "swiper/css/bundle";
import "aos/dist/aos.css";

function About() {
  let sections = document.querySelector("section");
  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      if (top >= offset && top < offset + height) {
        sec.classList.add("show-animate");
      } else {
        sec.classList.remove("show-animate");
      }
    });
  };
  return (
    <div>
      <section className="hidden" show-animate>
        <div className="AboutUs">
          <div data-aos="fade-down" class="page-header">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h2>About Us</h2>
                </div>
                <div class="col-12">
                  <a href="">Home</a>
                  <a href="">About Us</a>
                </div>
              </div>
            </div>
          </div>

          <div class="about wow fadeInUp" data-wow-delay="0.1s">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-5 col-md-6">
                  <div class="about-img">
                    <img src="./images/Aboutfirst.png" alt="Image" />
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
                      Phasellus nec pretium mi. Curabitur facilisis ornare velit
                      non vulputate. Aliquam metus tortor, auctor id gravida
                      condimentum, viverra quis sem.Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Phasellus nec pretium mi.
                      Curabitur facilisis ornare velit non vulputate. Aliquam
                      metus tortor, auctor id gravida condimentum, viverra quis
                      sem. Curabitur non nisl nec nisi scelerisque maximus.
                      Aenean consectetur convallis porttitor. Aliquam interdum
                      at lacus non blandit.
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="about wow fadeInUp" data-wow-delay="0.1s">
            <div data-aos="fade-up" data-aos-duration="3000" class="container">
              <div class="row align-items-center">
                <div class="col-lg-5 col-md-6">
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
                      Phasellus nec pretium mi. Curabitur facilisis ornare velit
                      non vulputate. Aliquam metus tortor, auctor id gravida
                      condimentum, viverra quis sem. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Phasellus nec pretium mi.
                      Curabitur facilisis ornare velit non vulputate. Aliquam
                      metus tortor, auctor id gravida condimentum, viverra quis
                      sem. Curabitur non nisl nec nisi scelerisque maximus.
                      Aenean consectetur convallis porttitor. Aliquam interdum
                      at lacus non blandit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-header text-center">
            {" "}
            <h1 className="">Awards & Recognition</h1>
          </div>
          <div class="wrappeaward ">
            <img src="./images/dad.jpg" className="dadimg" />
            <img src="./images/atstage.jpg" className="groupimg" />
            <img src="./images/best showroom.jpg" className="awardimg" />
            <img src="./images/groupawardimg.jpg" className="groupimg" />
            <img src="./images/momdad.jpg" className="" />
            <img src="./images/bishnu.jpg" className="" />
          </div>
        </div>

        <div class="service">
          `
          <div class="container">
            <div class="section-header text-center">
              <p>Our Services</p>
              <h4>We Provide Services</h4>
            </div>
            <div class="row">
              <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div class="service-item">
                  <div class="service-img">
                    <img src="./images/sales.jpg" alt="Image" />
                    <div class="service-overlay">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec pretium mi. Curabitur facilisis ornare
                        velit non vulputate. Aliquam metus tortor, auctor id
                        gravida condimentum, viverra quis sem.
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
              <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                <div class="service-item">
                  <div class="service-img">
                    <img src="./images/service-center.png" alt="Image" />
                    <div class="service-overlay">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec pretium mi. Curabitur facilisis ornare
                        velit non vulputate. Aliquam metus tortor, auctor id
                        gravida condimentum, viverra quis sem.
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

              <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                <div class="service-item">
                  <div class="service-img">
                    <img src="./images/exchnage.jpg" alt="Image" />
                    <div class="service-overlay">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec pretium mi. Curabitur facilisis ornare
                        velit non vulputate. Aliquam metus tortor, auctor id
                        gravida condimentum, viverra quis sem.
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
    </div>
  );
}

export default About;
