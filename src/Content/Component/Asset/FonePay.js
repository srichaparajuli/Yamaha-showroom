import React from "react";
import "../Pages/FonePay.css";
function FonePay() {
  return (
    <div>
      <div class="testcontainer">
        <div class="book">
          <div className="form-fonepay">
            <div class="containers">
              <div class="right">
                <form>
                  <p>Accepted Mobile Banking</p>
                  Account Number
                  <input
                    type="text"
                    name=""
                    placeholder="Enter Account number"
                  />
                  Account Name
                  <input type="text" name="" placeholder="Enter Account Name" />
                  <div id="zip">
                    <label>
                      Bank Name
                      <input type="text" name="" placeholder="Bank Name" />
                    </label>
                    <label>
                      Booking Amount
                      <input
                        type="text"
                        name=""
                        placeholder="Booking amount Rs.2000"
                      />
                    </label>
                  </div>
                </form>
                <button className="subt" role="button">
                  Proceed to Book a Vehicles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FonePay;
