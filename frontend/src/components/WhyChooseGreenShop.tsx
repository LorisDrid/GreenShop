import React from "react";
import "./WhyChooseGreenShop.scss";
import Logo from "../assets/Logo";

function WhyChooseGreenShop() {
  const greenCards = [
    {
      img: require("../assets/why-choose/recycled-items.jpg"),
      title: "1 Million",
      text: "Recycled Items",
      description:
        "GreenShop has recycled and reintroduced over one million items into the market, contributing to waste reduction and promoting the circular economy.",
    },
    {
      img: require("../assets/why-choose/tons-plastic.jpg"),
      title: "8 Million",
      text: "Tons of Plastic",
      description:
        "Every year, over 8 million tons of plastic waste end up in our oceans, harming marine life and ecosystems.",
    },
    {
      img: require("../assets/why-choose/trees-planted.jpg"),
      title: "2 Million",
      text: "Trees Planted",
      description:
        "With every purchase, a portion of our profits goes towards planting trees, resulting in over 2 million trees planted globally.",
    },
    {
      img: require("../assets/why-choose/co2-saved.jpg"),
      title: "200 Tons",
      text: "Of CO2 Saved",
      description:
        "Thanks to our eco-friendly products, we have helped our customers save more than 200 tons of CO2 by reducing the carbon footprint of their purchases.",
    },
  ];

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
        <Logo color="white" textOnly={true} size={75} />
        <h1>?</h1>
      </span>
      <div className="green-card-container grid grid-cols-4">
        {greenCards.map((card, index) => (
          <div key={index} className="green-card flex items-center flex-col">
            <span className="relative">
              <img
                className="green-card-image"
                src={card.img}
                alt={card.text}
              />
              <h3 className="green-card-title">{card.title}</h3>
              <span className="green-card-logo">
                <Logo color="white" size={35} iconOnly={true} />
              </span>
            </span>
            <p className="green-card-text">{card.text}</p>
            <p className="text-center">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseGreenShop;
