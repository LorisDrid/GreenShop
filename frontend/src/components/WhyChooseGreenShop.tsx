import React from "react";
import "./WhyChooseGreenShop.scss";
import Logo from "../assets/Logo";
import { useTranslation } from "react-i18next";

function WhyChooseGreenShop() {
  const greenCards = [
    {
      img: require("../assets/why-choose/recycled-items.jpg"),
      title: "greenCards.1.title",
      text: "greenCards.1.text",
      description: "greenCards.1.description",
    },
    {
      img: require("../assets/why-choose/tons-plastic.jpg"),
      title: "greenCards.2.title",
      text: "greenCards.2.text",
      description: "greenCards.2.description",
    },
    {
      img: require("../assets/why-choose/trees-planted.jpg"),
      title: "greenCards.3.title",
      text: "greenCards.3.text",
      description: "greenCards.3.description",
    },
    {
      img: require("../assets/why-choose/co2-saved.jpg"),
      title: "greenCards.4.title",
      text: "greenCards.4.text",
      description: "greenCards.4.description",
    },
  ];

  const { t } = useTranslation();

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
        <h1>{t("home.whyChoose")}</h1>
        <Logo color="white" textOnly={true} size={75} />
        <h1>?</h1>
      </span>
      <div className="green-card-container grid grid-cols-4 grid-rows-1 gap-6 w-full max-xl:grid-cols-2 max-xl:grid-rows-2 max-md:grid-rows-4 max-md:grid-cols-1">
        {greenCards.map((card, index) => (
          <div key={index} className="green-card flex items-center flex-col">
            <span className="relative">
              <img
                className="green-card-image"
                src={card.img}
                alt={t(card.text)}
              />
              <h3 className="green-card-title">{t(card.title)}</h3>
              <span className="green-card-logo">
                <Logo color="white" size={35} iconOnly={true} />
              </span>
            </span>
            <p className="green-card-text">{t(card.text)}</p>
            <p className="text-center">{t(card.description)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseGreenShop;
