import React from "react";
import "./Footer.scss";
import Logo from "../assets/Logo";
import { TextField } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="newsletter">
        <span className="logo-newsletter">
          <Logo color="white" textOnly={false} iconOnly={false} size={60} />
        </span>
        <form className="newsletter-form flex flex-col gap-4">
          <h4>{t("footer.newsletter")}</h4>
          <p>{t("footer.newsletterText")}</p>
          <TextField.Root
            color="green"
            className="newsletter-input"
            placeholder={t("footer.yourEmail")}
            size="3"
          >
            <TextField.Slot></TextField.Slot>
            <TextField.Slot>
              <button className="newsletter-submit" type="submit">
                {t("footer.subscribe")}
              </button>
            </TextField.Slot>
          </TextField.Root>
        </form>
      </div>
      <footer>
        <div className="flex flex-row justify-between border-b border-gray-500 gap-2 flex-wrap">
          <div className="footer-column flex flex-col gap-9">
            <Logo color="black" iconOnly={false} textOnly={false} size={60} />
            <div className="flex flex-row gap-5">
              <img
                src={require("../assets/footer/certifiedB.png")}
                alt="Certified B Corporation"
              />
              <img
                src={require("../assets/footer/climateNeutral.png")}
                alt="Climate Neutral"
              />
              <img
                src={require("../assets/footer/forThePlanet.png")}
                alt="1% for the Planet"
              />
            </div>
            <div className="flex flex-row gap-3">
              <a href="#">
                <img
                  src={require("../assets/footer/whatsapp.png")}
                  alt="WhatsApp"
                />
              </a>
              <a href="#">
                <img
                  src={require("../assets/footer/instagram.png")}
                  alt="Instagram"
                />
              </a>
              <a href="#">
                <img
                  src={require("../assets/footer/facebook.png")}
                  alt="Facebook"
                />
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h3>{t("footer.aboutUs")}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">{t("footer.contactUs")}</a>
              </li>
              <li>
                <a href="#">{t("footer.faqs")}</a>
              </li>
              <li>
                <a href="#">{t("footer.impact")}</a>
              </li>
              <li>
                <a href="#">{t("footer.ourStory")}</a>
              </li>
              <li>
                <a href="#">{t("footer.blog")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t("footer.categories")}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">{t("footer.new")}</a>
              </li>
              <li>
                <a href="#">{t("footer.clothing")}</a>
              </li>
              <li>
                <a href="#">{t("footer.bathBedding")}</a>
              </li>
              <li>
                <a href="#">{t("footer.homeGoods")}</a>
              </li>
              <li>
                <a href="#">{t("footer.furniture")}</a>
              </li>
              <li>
                <a href="#">{t("footer.accessories")}</a>
              </li>
              <li>
                <a href="#">{t("footer.gift")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t("footer.support")}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">{t("footer.shipping")}</a>
              </li>
              <li>
                <a href="#">{t("footer.returns")}</a>
              </li>
              <li>
                <a href="#">{t("footer.privacyPolicy")}</a>
              </li>
              <li>
                <a href="#">{t("footer.termsOfUse")}</a>
              </li>
              <li>
                <a href="#">{t("footer.affiliates")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>{t("footer.newsletterHeader")}</h3>
            <p>{t("footer.newsletterTextMain")}</p>
            <br />
            <a href="#">{t("footer.subscribeLink")}</a>
          </div>
        </div>
        <div className="footer-copyright text-center">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
