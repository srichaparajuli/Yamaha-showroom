import myKey from "./khaltikey";
import axios from "axios";
import { toast } from "react-toastify";

let config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "123766",
  productName: "Tirupati Auto City",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
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
            toast.success("Thank you for using KHALTI");
            localStorage.removeItem("shippingDetails");
          } else {
            toast.error("An error occur while Paying");
          }
        });
    },

    onError(error) {
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
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
