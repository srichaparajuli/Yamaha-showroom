import React from "react";
import Navbar from "./Navbar";
import { FaAward } from "react-icons/fa";
// import "./About.css";
import "../Pages/About.css";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

function About() {
  return (
    <div>
      <section className="hidden">
        <div className="AboutUs">
          <div className="aboutimg">
            <span className="Tachead">Tirupati Auto City</span>
          </div>
          <div className="AboutSecond">
            <div className="image-section">
              <img
                src="./images/Aboutfirst.png"
                alt="AwardImagesLogo"
                className="r15img"
              />
            </div>
            {/* <div class="contentsection-about"> */}
            <div className="content-about">
              <p>
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            {/* </div> */}
          </div>
          <span className="Tachead"> Sanyog Parajuli,MD</span>
          <div className="AboutSecond">
            <div className="image-section">
              <img src="./images/Sanyog .jpg" className="" />
            </div>
            <div className="content-about">
              <p>
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>

          {/* award section */}
          <div className="awardwhole">
            <div className="section-header text-center">
              {" "}
              <h1 className="">Award & Recognition</h1>
            </div>
            {/* <span className="awardspan">Award & Recognition</span> */}

            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              spaceBetween={0}
              slidesPerView={4}
              slideActiveClass={1}
              
              navigation
            >
              <SwiperSlide>
                <div className="products">
                  <div className="AwardImages">
                    <img src="./images/dad.jpg" className="dadimg" />
                    {/* <span className="">Award & Recognition</span> */}
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="products">
                  <div className="AwardImages">
                    <img src="./images/atstage.jpg" className="groupimg" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="products">
                  <div className="AwardImages">
                    <img
                      src="./images/best showroom.jpg"
                      className="awardimg"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="products">
                  <div className="AwardImages">
                    <img
                      src="./images/groupawardimg.jpg"
                      className="groupimg"
                    />
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="products">
                  <div className="AwardImages">
                    <img src="./images/momdad.jpg" className="" />
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="products">
                  <div className="AwardImages">
                    <img src="./images/bishnu.jpg" className="" />
                  </div>
                </div>
              </SwiperSlide> 
            </Swiper>
          </div>
        </div>

        <div class="service">` 
                <div class="container">
                    <div class="section-header text-center">
                        <p>Our Services</p>
                        <h1>We Provide Services</h1>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="service-item">
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
                            <div class="service-item">
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
                            <div class="service-item">
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
    </div>
  );
}

export default About;
