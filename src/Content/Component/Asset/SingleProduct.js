import React, { useState, useEffect, useContext } from "react";
import "../Pages/singleproduct.css";
import { LoginContext } from "../../../Context/LoginContext";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import Star from "./Star";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "bootstrap";
// import { Label } from "reactstrap";

function SingleProduct() {
  const [productData, setproductData] = useState([]);
  const [productMainImage, setproductMainImage] = useState([]);
  const [productImage, setproductImage] = useState([]);
  const [engineValues, setengineValues] = useState([]);
  const [dimenssionValues, setdimenssionValues] = useState([]);
  const [brakeValues, setbrakeValues] = useState([]);
  const { loginData, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const initialValues = {
    productId: id,
    userId: loginData.UserId,
    ratings: "",
  };
  const [rating, setRating] = useState(initialValues);
  const [getrating, setGetRating] = useState([]);

  const handleSubmitRate = () => {
    if (!rating.ratings) {
      alert("rating field is empty");
    } else {
      postRating();
      getRating();
    }
  };

  const handleTestRide = (e) => {
    e.preventDefault();
    if (loginData.UserId) {
      navigate("/TestRide");
    } 
    
    // else {
    //   toast.warning("Do login Before Testride");
    // }
  };
  const handleBooking = (e) => {
    e.preventDefault();

    if (loginData.UserId) {
      navigate(`/BookNow/${productData.id}`);
    } else {
      toast.warning("Do login Before Booking");
    }
  };

  const handleChangeRate = (e) => {
    const { name, value } = e.target;
    setRating({ ...rating, [name]: value });
  };

  const postRating = async () => {
    console.log(rating);
    const result = await axios.post(
      "https://localhost:7166/api/Rating/RatingInsert",
      rating
    );
    console.log(result);

    if (result.data == 1) {
      // toast.dark("Booking for TestRide has been Sent Successfully");
    }
  };

  const getRating = async (Id) => {
    const result = await axios.get(
      `https://localhost:7166/api/Rating/GetRatingByProductId?ProductId=${Id}`
    );
    //console.log(result.data);
    setGetRating(result.data);
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
    //console.log(result.data);
    setdimenssionValues(result.data);
  };

  const getEngineData = async (ProductId) => {
    const result = await axios.get(
      `https://localhost:7166/api/EngineDeatils/Engineget?ProductId=${ProductId}`
    );
    //console.log(result.data);
    setengineValues(result.data);
  };

  const getBrakeData = async (ProductId) => {
    const result = await axios.get(
      `https://localhost:7166/api/BrakesDetails/Brakesget?ProductId=${ProductId}`
    );
    // console.log(result.data);
    setbrakeValues(result.data);
  };

  useEffect(() => {
    getProductImage(id);
    //getProductMainImage(0);
    getDimenssionData(id);
    getEngineData(id);
    getBrakeData(id); 
    getProductDatabyId(id);
    getProductMainImage(0);
  }, [loginData]);

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
                      className=""
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

               {/* <span class="product-Rating"> 
                <Star stars={productData.rating} />
              </span>  */}

              <span class="product-price">
                Actual Price - Rs.{productData.actualPrice}
              </span>
              {/* <span class="product-price">
                Booking Price - ₨.{productData.bookingPrice}
              </span> */}

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

                {/* <button
                  type="button"
                  class="buy-now-btn"
                  onClick={handleBooking}
                >
               
                  Book Now
                </button> */}
              </div>
            </div>
          </div>

          <div class="Specification">
            <h1>Specification</h1>
            <div className="tab">
              <input type="radio" name="acc" id="acc1"></input>
              <label for="acc1">
                <h2>Engine & Transmission</h2>
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
                <h2>Dimension & Chassis</h2>
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
                <h2>Brakes ,Wheels and Suspension</h2>
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
    </div>
  );
}

export default SingleProduct;
