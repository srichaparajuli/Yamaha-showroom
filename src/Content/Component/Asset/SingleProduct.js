import React, { useState, useEffect, useContext } from "react";
import "../Pages/singleproduct.css";
import { LoginContext } from "../../../Context/LoginContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function SingleProduct() {
  const [productData, setproductData] = useState([]);
  const [productMainImage, setproductMainImage] = useState([]);
  const [productImage, setproductImage] = useState([]);
  const [engineValues, setengineValues] = useState([]);
  const [dimenssionValues, setdimenssionValues] = useState([]);
  const [brakeValues, setbrakeValues] = useState([]);
  const { loginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const handleTestRide = (e) => {
    e.preventDefault();
    if (loginData.UserId) {
      navigate("/TestRide");
    }
  };

  const getProductDatabyId = async (Id) => {
    const result = await axios.get(
      `https://localhost:7166/api/Addproduct/ProductgetbyId?Id=${Id}`
    );
    console.log(result.data[0]);
    setproductData(result.data[0]);
  };

  const getProductImage = async (Id) => {
    const result = await axios.get(
      `https://localhost:7166/api/ProductImage/Imageget?ProductId=${Id}`
    );
    setproductImage(result.data);
    const mainimg = result.data.filter((x) => {
      return x.sn == 1;
    });

    setproductMainImage(mainimg);
  };

  const getProductMainImage = async (sn) => {
    const mainimg = productImage.filter((x) => {
      if (sn === 0) {
        return x.sn == 1;
      }

      return x.sn == sn;
    });

    setproductMainImage(mainimg);
    console.log(mainimg);
  };

  const getDimenssionData = async (ProductId) => {
    const result = await axios.get(
      `https://localhost:7166/api/DimenssionDetails/Dimenssionget?ProductId=${ProductId}`
    );

    setdimenssionValues(result.data);
  };

  const getEngineData = async (ProductId) => {
    const result = await axios.get(
      `https://localhost:7166/api/EngineDeatils/Engineget?ProductId=${ProductId}`
    );

    setengineValues(result.data);
  };

  const getBrakeData = async (ProductId) => {
    const result = await axios.get(
      `https://localhost:7166/api/BrakesDetails/Brakesget?ProductId=${ProductId}`
    );

    setbrakeValues(result.data);
  };

  useEffect(() => {
    getProductImage(id);
    getDimenssionData(id);
    getEngineData(id);
    getBrakeData(id);
    getProductDatabyId(id);
    getProductMainImage(0);
  }, [loginData]);
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
    <div>
      <ToastContainer />
      <div class="main-wrapper">
        <div class="fzxcontainer">
          <div class="product-div">
            <div class="product-div-left">
              <div class="img-container">
                <div>
                  {productMainImage.map((data, index) => (
                    <img
                      src={
                        loginData.URL +
                        "/staticfiles/Vehiclesimages/" +
                        data.image
                      }
                    />
                  ))}
                </div>
              </div>

              <div class="hover-container">
                {productImage.map((data, index) => (
                  <div>
                    <img
                      src={
                        loginData.URL +
                        "/staticfiles/Vehiclesimages/" +
                        data.image
                      }
                      className=""
                      onClick={() => getProductMainImage(data.sn)}
                    />
                  </div>
                ))}
              </div>
              <div className="Ratesall"></div>
            </div>

            <div class="product-div-right">
              <span class="product-name">{productData.productName}</span>
              <span class="product-price">
                Actual Price - Rs.{productData.actualPrice}
              </span>
              <p class="product-description">
                {productData.productDescription}
              </p>
              <div class="btn-groups">
                <button
                  type="button"
                  class="add-cart-btn"
                  onClick={handleTestRide}
                >
                  <Link to={`/TestRide`}>Test Ride</Link>
                </button>
              </div>
            </div>
          </div>

          <div class="Specification">
            <h1>Specification</h1>
            <div className="tab">
              <input type="radio" name="acc" id="acc1"></input>
              <label for="acc1">
                <p>Engine & Transmission</p>
              </label>
              {engineValues.map((data, index) => (
                <div className="Engine" key={index}>
                  <div className="specform">
                    <div className="Engineform">
                      <span>EngineType: {data.engineType}</span>
                    </div>

                    <div className="Engineform">
                      <span>Displacement :{data.displacement}</span>
                    </div>
                  </div>
                  <div className="specform">
                    <div className="Engineform">
                      <span>Bore :{data.bore}</span>
                    </div>

                    <div className="Engineform">
                      <span>Stroke: {data.stroke}</span>
                    </div>
                  </div>

                  <div className="specform">
                    <div className="Engineform">
                      <span>Comparision Ratio: {data.comparisionRation}</span>
                    </div>

                    <div className="Engineform">
                      <span>NumberofGear: {data.numberofGear}</span>
                    </div>
                  </div>
                  <div className="specform">
                    <div className="Engineform">
                      <span>Clutch: {data.clutch}</span>
                    </div>

                    <div className="Engineform">
                      <span>FuelSystem :{data.fuelSystem}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="tab">
              <input type="radio" name="acc" id="acc2"></input>
              <label for="acc2">
                <p>Dimension & Chassis</p>
              </label>
              {dimenssionValues.map((data, index) => (
                <div className="Engine" key={index}>
                  <div className="specform">
                    <div className="Engineform">
                      <span>KerbWeight :{data.kerbWeight}</span>
                    </div>

                    <div className="Engineform">
                      <span>WheelBase:{data.wheelBase}</span>
                    </div>
                  </div>
                  <div className="specform">
                    <div className="Engineform">
                      <span>SeatHeight :{data.seatHeight}</span>
                    </div>

                    <div className="Engineform">
                      <span>GroundClearance :{data.groundClearance}</span>
                    </div>
                  </div>

                  <div className="specform">
                    <div className="Engineform">
                      <span>ChassisType :{data.chassisType}</span>
                    </div>
                    <div className="Engineform">
                      <span>OverallLength :{data.overallLength}</span>
                    </div>
                  </div>
                  <div className="specform">
                    <div className="Engineform">
                      <span>OverallHeight :{data.overallHeight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tab">
              <input type="radio" name="acc" id="acc3"></input>
              <label for="acc3">
                <p>Brakes ,Wheels and Suspension</p>
              </label>
              {brakeValues.map((data, index) => (
                <div className="Engine" key={index}>
                  <div className="specform">
                    <div className="Engineform">
                      <span>FrontBrakeType :{data.frontBrakeType}</span>
                    </div>

                    <div className="Engineform">
                      <span>RearBrakeType: {data.rearBrakeType}</span>
                    </div>
                  </div>
                  <div className="specform">
                    <div className="Engineform">
                      <span>FrontTyreSize: {data.frontTyreSize}</span>
                    </div>

                    <div className="Engineform">
                      <span>TyreType: {data.tyreType}</span>
                    </div>
                  </div>

                  <div className="specform">
                    <div className="Engineform">
                      <span>RearSuspension: {data.rearSuspension}</span>
                    </div>

                    <div className="Engineform">
                      <span>FrontBrakeSize: {data.frontBrakeSize}</span>
                    </div>
                  </div>
                  <div className="specform">
                    <div className="Engineform">
                      <span>RearBrakeSize: {data.rearBrakeSize}</span>
                    </div>
                    <div className="Engineform">
                      <span>RearTyreSize: {data.rearTyreSize}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`back-to-top-button ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        {" "}
      </div>
    </div>
  );
}

export default SingleProduct;
