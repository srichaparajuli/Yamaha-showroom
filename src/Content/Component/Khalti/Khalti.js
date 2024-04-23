import React, { useEffect, useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

export default function Khalti(props) {
  let checkout = new KhaltiCheckout(config);

  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };

  const [shippingData, setShippingData] = useState();

  useEffect(() => {
    setShippingData(props.shippingData);
    localStorage.setItem("shippingDetails", JSON.stringify(props.shippingData));
  }, []);

  const handleClick = () => {
    checkout.show({ amount: shippingData.amount * 100 });
  };

  return (
    <div>
      <button onClick={handleClick} style={buttonStyles}>
        Pay Via Khalti
      </button>
    </div>
  );
}
