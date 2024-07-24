import React from "react";
import "./NavigationExpanded.scss";
import LanguagesCurrencyDialog from "./LanguagesCurrencyDialog";
import {useTranslation} from "react-i18next";

const NavigationExpanded: React.FC = () => {
    const {t} = useTranslation();

  function toggleNavigationExpanded() {
    const topNavBar = document.querySelector(".topNavBar");
    topNavBar?.classList.toggle("isHidden");

    const navigationExpanded = document.querySelector(".navigation-expanded");
    navigationExpanded?.classList.toggle("show");
  }

  return (
    <div className="navigation-expanded">
      <nav className="navigation-expanded-nav">
          <a href="/frontend/public" className="nav-item">
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
              {t("header.all")}
        </a>
          <a href="/frontend/public" className="nav-item nav-highlighted">
              {t("header.sales")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.students")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.bestSellers")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.clothing")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.bath")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.bedding")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.home")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.books")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.plants")}
        </a>
          <a href="/frontend/public" className="nav-item">
              {t("header.accessories")}
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
