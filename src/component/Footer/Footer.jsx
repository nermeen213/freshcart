import React from "react";

import paypal from "../../Assets/images/paypal (1).png";
import amazon from "../../Assets/images/paypal (5).png";
import master from "../../Assets/images/paypal (2).png";
import americanExpress from "../../Assets/images/paypal (4).png";
import googlePlay from "../../Assets/images/paypal (3).png";
import appStore from "../../Assets/images/App-Store-Logo.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-main-light mt-3 pb-2 pt-5">
        <div className="px-5">
          <div className="top-footer border-bottom pb-4">
            <h2>Get the FreshCart app</h2>
            <p>
              We will send you a link, open it in your phone to download the
              app.
            </p>
            <div className="row g-3 align-items-center">
              <div className="col-lg-10">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email .."
                />
              </div>
              <div className="col-lg-2">
                <button className="btn bg-main text-white w-100">
                  Share App Link
                </button>
              </div>
            </div>
          </div>
          <div className="main-footer border-bottom py-4">
            <div className="row">
              <div className="col-lg-6">
                <p className="d-inline-block pe-2">Payment Partners</p>
                <img src={amazon} width={60} alt="amazon payment" />
                <img
                  src={americanExpress}
                  width={60}
                  alt="americanExpress payment"
                />
                <img src={master} width={60} alt="master card payment" />
                <img src={paypal} width={60} alt="paypal payment" />
              </div>
              <div className="col-lg-6">
                <div className="d-flex flex-wrap justify-content-lg-end mt-lg-0 mt-3">
                  <p className="d-inline-block pe-2">
                    Get deliveries with FreshCart
                  </p>
                  <img src={appStore} width={90} height={30} alt="app store" />
                  <img
                    src={googlePlay}
                    width={100}
                    height={30}
                    alt="google play"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-center my-4">
            Copyright 2023 &copy; Dev/ by Nermeen Ahmed{" "}
            <i className="fa-solid fa-heart text-danger"></i> . All rights
            reserved
          </p>
        </div>
      </footer>
    </>
  );
}
