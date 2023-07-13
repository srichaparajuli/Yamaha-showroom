import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Pages/BookingHistory.css";
import { AiFillDelete } from "react-icons/ai";
import { IoInformationCircle } from "react-icons/io5";

import { HiUserCircle } from "react-icons/hi";
import { LoginContext } from "../../../Context/LoginContext";
import axios from "axios";

function BookingHistory() {
  const [userData, setuserData] = useState([]);
  const [userDetails, setuserDetails] = useState([]);
  const { loginData, setLoginData } = useContext(LoginContext);

  const getUserData = async () => {
    const result = await axios.get(
      loginData.URL +
        `/api/Booking/UserBookingPageget?UserId=${loginData.UserId}`
    );

    console.log(result.data);
    setuserData(result.data);
  };
  const getUserDetails = async () => {
    const result = await axios.get(
      loginData.URL +
        `/api/UserSignUp/GetUserDetails?UserId=${loginData.UserId}`
    );

    console.log(result.data);
    setuserDetails(result.data);
  };

  const deleteProductData = async (Id) => {
    const confirm = window.confirm("Do you want to Delete your data?");

    if (confirm) {
      const result = await axios.delete(
        `https://localhost:7166/api/Booking/UserBookingDelete?Id=${Id}`
      );
      console.log(result);

      if (result.data == 1) {
        alert("Delete Data Sucessfully");
        getUserData();
      }
    }
  };
  useEffect(() => {
    getUserData();
    getUserDetails();
  }, [loginData]);
  return (
    <div>
      <div className="Booking">
        <h2>Your Booking Details</h2>

        <div class="BookingH-top">
          <section class="table__body">
            <table>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>FullName</th>
                  <th>Address</th>
                  <th>Email-Address</th>
                  <th>PhoneNumber</th>
                  <th>Vehicles-Name</th>
                  <th>Booked-Days</th>
                  <th>PaymentType</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data, index) => (
                  <>
                    {data.bookStatus == 1 ? (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.fullName}</td>
                        <td>{data.address}</td>
                        <td>{data.email}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.productName}</td>
                        <td>{data.days}</td>

                        {/* <td>{data.bookStatus}</td> */}

                        <td>
                          <p class="status delivered">{data.paymentType}</p>
                        </td>
                        <td>{data.amount}</td>
                        <td>
                          <Link
                            class="delete"
                            title="Delete"
                            data-toggle="tooltip"
                            type="button"
                            className="deleteIcon"
                            value="Delete"
                            onClick={() => deleteProductData(data.id)}
                          >
                            <AiFillDelete />
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      <tr key={index} style={{ color: "red" }}>
                        <td>{index + 1}</td>
                        <td>{data.fullName}</td>
                        <td>{data.address}</td>
                        <td>{data.email}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.productName}</td>
                        <td>{data.days}</td>

                        {/* <td>{data.bookStatus}</td> */}

                        <td>
                          <p class="status delivered">{data.paymentType}</p>
                        </td>
                        <td>{data.amount}</td>
                        <td>
                          <Link
                            class="delete"
                            title="Delete"
                            data-toggle="tooltip"
                            type="button"
                            className="deleteIcon"
                            value="Delete"
                          >
                            <AiFillDelete />
                          </Link>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
