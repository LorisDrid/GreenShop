import React from "react";
import "./Footer.scss";
import Logo from "../assets/Logo";
import { TextField } from "@radix-ui/themes";

const Footer: React.FC = () => {
  return (
    <>
      <div className="newsletter">
        <span className="logo-newsletter">
          <Logo color="white" textOnly={false} iconOnly={false} />
        </span>
        <form className="newsletter-form flex flex-col gap-4">
          <h4>Subscribe now and start making a difference !</h4>
          <p>
            Be the first to know about exclusive offers, eco-tips, and new
            arrivals!
          </p>
          <TextField.Root
            color="green"
            className="newsletter-input"
            placeholder="Your email"
            size="3"
          >
            <TextField.Slot></TextField.Slot>
            <TextField.Slot>
              <button className="newsletter-submit" type="submit">
                Subscribe
              </button>
            </TextField.Slot>
          </TextField.Root>
        </form>
      </div>
      <footer>
        <div className="flex flex-row justify-between border-b border-gray-500">
          <div className="footer-column flex flex-col gap-6">
            <Logo color="black" iconOnly={false} textOnly={false} />
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
            <h3>About Us</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">Contacts us</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Impact</a>
              </li>
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Categories</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">New</a>
              </li>
              <li>
                <a href="#">Clothing</a>
              </li>
              <li>
                <a href="#">Bath & Bedding</a>
              </li>
              <li>
                <a href="#">Home Goods</a>
              </li>
              <li>
                <a href="#">Furniture</a>
              </li>
              <li>
                <a href="#">Accessories</a>
              </li>
              <li>
                <a href="#">Gift</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Affiliates</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>
              Join our GreenShop community and be the first to know about our
              latest eco-friendly products, exclusive discounts, and tips.
            </p>
            <br />
            <a href="#">Subscribe</a>
          </div>
        </div>
        <div className="footer-copyright text-center">
          <p>© 2024 GreenShop, Inc. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
