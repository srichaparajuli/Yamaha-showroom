import React, { useState, useEffect, useContext } from "react";
import "../Pages/Motorcycle.css";
import axios from "axios";
import { LoginContext } from "../../../Context/LoginContext";
import { Link } from "react-router-dom";
import sortBy from "lodash/sortBy";

function Motorcycle() {
  const [productData, setproductData] = useState([]);
  const { loginData, setLoginData } = useContext(LoginContext);

  const getProductData = async () => {
    const result = await axios.get(
      loginData.URL + "/api/Addproduct/ProductgetbyCategoryId?CategoryId=1"
    );

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

  const handleChange = (e) => {
    if (e.target.value == 2) {
      setproductData((prevState) => sortBy(prevState, ["actualPrice"]));
    }

    if (e.target.value == 1) {
      setproductData((prevState) =>
        sortBy(prevState, ["actualPrice"]).reverse()
      );
    }
  };

  const getImage = async () => {
    const result = await axios.get(
      loginData.URL + "/api/ProductImage/Imageget?CategoryId=1"
    );
    getProductData();
    console.log(result.data);
    setproductData(result.data);
  };

  useEffect(() => {
    getProductData();
    getImage();
  }, [loginData]);

  return (
    <>
      <div>

{/* <header style="background-image:url (./images/motorcycle.jpg);">
   <h1>MotorCycle</h1>
</header> */}
        <div className="Motorcycle-header">
          <img src="./images/motorcycle.jpg" />
          <label>MotorCycle</label>
          <span>
            Don't limit yourself—have the courage to take on new challenges.
          </span>
        </div>
        <div class="custom-manage">
          <select name="category" onChange={handleChange}>
            <option value="0">Price Filtering</option>
            <option value="1">High-Low</option>
            <option value="2">Low-High</option>
          </select>
        </div>
        <div className="BikeTop">
          {productData.map((data, index) => (
            <div className="product" key={index}>
              <div className="bikes">
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
              <div className="namePrice">
                <h3>{data.productName} </h3>
                <span>Rs.{data.actualPrice}</span>
              </div>
              <div classname="book">
                <button className="bay">
                  <Link to={`/SingleProduct/${data.id}`}>Test Ride</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Motorcycle;
