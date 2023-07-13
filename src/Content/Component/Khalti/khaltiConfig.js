import myKey from "./khaltikey";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

var shippingData = localStorage.getItem("shippingDetails");

let config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "123766",
  productName: "Tirupati Auto City",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication

      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get(
          `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.secretKey}`
        )
        .then((response) => {
          alert("Thank you for generosity");
        })
        .catch((error) => {
          console.log(JSON.parse(localStorage.getItem("shippingDetails")));

          const result = axios.post(
            "https://localhost:7166/api/Booking/UserBooking",
            JSON.parse(localStorage.getItem("shippingDetails"))
          );

          if ((result.data = 1)) {
            // navigate("/Motorcycle");
            toast.success("Thank you for using KHALTI");
            localStorage.removeItem("shippingDetails");
          } else {
            toast.error("An error occur while Paying");
          }
        });
    },

    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
      //localStorage.removeItem("shippingDetails");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
