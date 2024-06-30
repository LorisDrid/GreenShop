import React from "react";
import "./WhyChooseGreenShop.scss";
import Logo from "../assets/Logo";

function WhyChooseGreenShop() {
  return (
    <section className="why-choose-section flex flex-col items-center justify-center">
      <span className="why-choose-title flex flex-row gap-1 items-center">
        <svg
          className="why-choose-piles"
          xmlns="http://www.w3.org/2000/svg"
          width="158"
          height="84"
        >
          <rect
            width="161"
            height="56"
            x="-5.75"
            y="36.17"
            rx="28"
            transform="rotate(-15 -5.75 36.17)"
          />
        </svg>
        <h1>Why Choose</h1>
        <Logo color="#29AC00FF" textOnly={true} size={75} />
        <h1>?</h1>
      </span>
      <div>
        <span>
          <img
            src={require("../assets/why-choose/recycled-items.jpg")}
            alt="Reycled Items"
          />
        </span>
      </div>
    </section>
  );
}

export default WhyChooseGreenShop;
