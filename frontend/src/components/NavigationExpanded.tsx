import React from "react";
import "./NavigationExpanded.scss";
import LanguagesCurrencyDialog from "./LanguagesCurrencyDialog";

const NavigationExpanded: React.FC = () => {
  function toggleNavigationExpanded() {
    const topNavBar = document.querySelector(".topNavBar");
    topNavBar?.classList.toggle("isHidden");

    const navigationExpanded = document.querySelector(".navigation-expanded");
    navigationExpanded?.classList.toggle("show");
  }

  return (
    <div className="navigation-expanded">
      <nav className="navigation-expanded-nav">
        <a href="/" className="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nav-all-icon"
            fill="none"
            viewBox="0 0 50 42"
            width="19"
            height="18"
          >
            <path d="M3.7 6.9h42.6c1.8 0 3.2-1.4 3.2-3.2 0-1.8-1.4-3.2-3.2-3.2H3.7C1.9.5.5 1.9.5 3.7c0 1.8 1.4 3.2 3.2 3.2Zm0 17.3h42.6c1.8 0 3.2-1.4 3.2-3.2 0-1.8-1.4-3.2-3.2-3.2H3.7C1.9 17.8.5 19.2.5 21c0 1.8 1.4 3.2 3.2 3.2Zm42.6 17.3c1.8 0 3.2-1.4 3.2-3.2 0-1.8-1.4-3.2-3.2-3.2H3.7c-1.8 0-3.2 1.4-3.2 3.2 0 1.8 1.4 3.2 3.2 3.2h42.6Z" />
          </svg>
          All
        </a>
        <a href="/" className="nav-item nav-highlighted">
          Sales
        </a>
        <a href="/" className="nav-item">
          Students
        </a>
        <a href="/" className="nav-item">
          Best Seller
        </a>
        <a href="/" className="nav-item">
          Clothing
        </a>
        <a href="/" className="nav-item">
          Bath
        </a>
        <a href="/" className="nav-item">
          Bedding
        </a>
        <a href="/" className="nav-item">
          Home Goods
        </a>
        <a href="/" className="nav-item">
          Books
        </a>
        <a href="/" className="nav-item">
          Plants
        </a>
        <a href="/" className="nav-item">
          Accessories
        </a>
      </nav>
      <span className="w-fit self-center">
        <LanguagesCurrencyDialog showLanguageText={true} />
      </span>
      <div className="close-menu-button" onClick={toggleNavigationExpanded}>
        <span className="meat"></span>
        <span className="meat"></span>
      </div>
    </div>
  );
};

export default NavigationExpanded;

export function closeNavigationExpanded() {
  const topNavBar = document.querySelector(".topNavBar");
  topNavBar?.classList.remove("isHidden");

  const navigationExpanded = document.querySelector(".navigation-expanded");
  navigationExpanded?.classList.remove("show");
}
